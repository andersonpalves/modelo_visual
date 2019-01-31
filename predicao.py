import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import datetime
from dateutil.relativedelta import relativedelta
import seaborn as sns
import statsmodels.api as sm  
from statsmodels.tsa.stattools import acf  
from statsmodels.tsa.stattools import pacf
from statsmodels.tsa.seasonal import seasonal_decompose

from statsmodels.tsa.arima_model import ARIMA
from statsmodels.tsa.ar_model import AR
from statsmodels.tsa.arima_model import ARMA
from statsmodels.tsa.statespace.sarimax import SARIMAX
from statsmodels.tsa.vector_ar.var_model import VAR
from statsmodels.tsa.statespace.varmax import VARMAX
from statsmodels.tsa.holtwinters import SimpleExpSmoothing
from statsmodels.tsa.holtwinters import ExponentialSmoothing

from flask import Flask
from flask import jsonify
from flask import request
from flask_cors import CORS

from sklearn.metrics import mean_squared_error
from sklearn.metrics import mean_absolute_error

app = Flask(__name__)
CORS(app)

@app.route('/predicoes/', methods=['GET'])
def login():
	meses_parameter = request.args.get('meses')
	valores_parameter = request.args.get('valores')
	ano_inicio_parameter = request.args.get('anoInicio')
	ano_fim_parameter = request.args.get('anoFim')
	meses_array = meses_parameter.split(',')
	valores_array = valores_parameter.split(',')

	tamanho_lista = len(meses_array)

	valores = []
	for valor in valores_array:
		novo_valor = int(valor)
		valores.append(novo_valor)

	df = pd.DataFrame()
	df.insert(loc=0,column='index',value=meses_array)
	df.insert(loc=1,column='values',value=valores)

	start = datetime.datetime.strptime(ano_inicio_parameter, "%Y-%m-%d")
	date_list = [start + relativedelta(months=x) for x in range(0,tamanho_lista)]
	df['index'] = date_list

	df.set_index(['index'], inplace=True)
	df.columns= ['dados']

	data = df.dados

	#mod = AR(data)
	#mod = ARMA(data)
	#mod = ARMA(data, order=(0, 1))
	#mod =  ARIMA(data, order=(6, 1, 0))

	#SARIMA
	#mod = sm.tsa.statespace.SARIMAX(data, trend='n', order=(1, 0, 1), seasonal_order=(1, 1, 1, 12)) novo
	#mod = sm.tsa.statespace.SARIMAX(data, trend='n', order=(5, 1, 0), seasonal_order=(0, 0, 0, 12)) antigo
	#mod = sm.tsa.statespace.SARIMAX(data, order=(1, 0, 1), seasonal_order=(3, 0, 1, 12))
	mod = sm.tsa.statespace.SARIMAX(data, order=(1, 0, 1), seasonal_order=(3, 0, 1, 12))
	results = mod.fit()

	start = datetime.datetime.strptime(ano_fim_parameter, "%Y-%m")
	date_list = [start + relativedelta(months=x) for x in range(0,12)]
	future = pd.DataFrame(index=date_list, columns= df.columns)
	df = pd.concat([df, future])

	df['sarima'] = results.predict(start = tamanho_lista, end = tamanho_lista + 11, dynamic= True).astype(int)
	output = df['sarima'].unique()
	dados_sarima = output[~np.isnan(output)].tolist()

	##SARIMAX METRICAS
	valores_anteriores = valores[0:72]
	valores_ano_seguinte = valores[72:]
	tamanho_predicao = len(valores_anteriores)

	mod = sm.tsa.statespace.SARIMAX(valores_anteriores, order=(1, 0, 1), seasonal_order=(3, 0, 1, 12))
	resultado = mod.fit()
	start = datetime.datetime.strptime("2017-01", "%Y-%m")
	date_list = [start + relativedelta(months=x) for x in range(0,12)]
	future = pd.DataFrame(index=date_list, columns= df.columns)
	df = pd.concat([df, future])

	dados_predicao = []
	dados_predicao = resultado.predict(start = tamanho_predicao, end = tamanho_predicao + 11, dynamic= True).astype(int)
	dados_predicao = dados_predicao.tolist()
		
	error_mean_squared_error = mean_squared_error(valores_ano_seguinte, dados_predicao)
	print('Sarima mean_squared_error', error_mean_squared_error)

	error_mean_absolute_error = mean_absolute_error(valores_ano_seguinte, dados_predicao)
	print('Sarima mean_absolute_error', error_mean_absolute_error)

	#Holt Winter
	mod = ExponentialSmoothing(data, seasonal_periods=12 ,trend='add', seasonal='add')
	results = mod.fit()

	start = datetime.datetime.strptime(ano_fim_parameter, "%Y-%m")
	date_list = [start + relativedelta(months=x) for x in range(0,12)]
	future = pd.DataFrame(index=date_list, columns= df.columns)
	df = pd.concat([df, future])

	df['holtwinter'] = results.predict(start = tamanho_lista, end = tamanho_lista + 11).astype(int)
	output = df['holtwinter'].unique()
	dados_holt = output[~np.isnan(output)].tolist()

	#Holt Winter Metricas
	valores_anteriores = valores[0:72]
	valores_ano_seguinte = valores[72:]
	tamanho_predicao = len(valores_anteriores)

	mod = ExponentialSmoothing(valores_anteriores, seasonal_periods=12 ,trend='add', seasonal='add')
	resultado = mod.fit()
	start = datetime.datetime.strptime("2017-01", "%Y-%m")
	date_list = [start + relativedelta(months=x) for x in range(0,12)]
	future = pd.DataFrame(index=date_list, columns= df.columns)
	df = pd.concat([df, future])

	dados_predicao = []
	dados_predicao = resultado.predict(start = tamanho_predicao, end = tamanho_predicao + 11).astype(int)
	dados_predicao = dados_predicao.tolist()
		
	error_mean_squared_error = mean_squared_error(valores_ano_seguinte, dados_predicao)
	print('Holt Winter mean_squared_error', error_mean_squared_error)

	error_mean_absolute_error = mean_absolute_error(valores_ano_seguinte, dados_predicao)
	print('Holt Winter mean_absolute_error', error_mean_absolute_error)

	#AR
	mod = AR(data)
	results = mod.fit()

	start = datetime.datetime.strptime(ano_fim_parameter, "%Y-%m")
	date_list = [start + relativedelta(months=x) for x in range(0,12)]
	future = pd.DataFrame(index=date_list, columns= df.columns)
	df = pd.concat([df, future])

	df['ar'] = results.predict(start = tamanho_lista, end = tamanho_lista + 11, dynamic=True).astype(int)
	output = df['ar'].unique()
	dados_ar = output[~np.isnan(output)].tolist()

	#AR Metricas
	valores_anteriores = valores[0:72]
	valores_ano_seguinte = valores[72:]
	tamanho_predicao = len(valores_anteriores)

	mod = AR(valores_anteriores)
	resultado = mod.fit()
	start = datetime.datetime.strptime("2017-01", "%Y-%m")
	date_list = [start + relativedelta(months=x) for x in range(0,12)]
	future = pd.DataFrame(index=date_list, columns= df.columns)
	df = pd.concat([df, future])

	dados_predicao = []
	dados_predicao = resultado.predict(start = tamanho_predicao, end = tamanho_predicao + 11, dynamic= True).astype(int)
	dados_predicao = dados_predicao.tolist()
		
	error_mean_squared_error = mean_squared_error(valores_ano_seguinte, dados_predicao)
	print('AR mean_squared_error', error_mean_squared_error)

	error_mean_absolute_error = mean_absolute_error(valores_ano_seguinte, dados_predicao)
	print('AR mean_absolute_error', error_mean_absolute_error)

	return jsonify(
        sarima = dados_sarima,
		holt = dados_holt,
		ar = dados_ar
    )

if __name__ == "__main__":
	app.run()