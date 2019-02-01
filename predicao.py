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
		
	sa_mse = mean_squared_error(valores_ano_seguinte, dados_predicao)
	sa_mae = mean_absolute_error(valores_ano_seguinte, dados_predicao)

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
	mod = ExponentialSmoothing(valores_anteriores, seasonal_periods=12 ,trend='add', seasonal='add')
	resultado = mod.fit()
	start = datetime.datetime.strptime("2017-01", "%Y-%m")
	date_list = [start + relativedelta(months=x) for x in range(0,12)]
	future = pd.DataFrame(index=date_list, columns= df.columns)
	df = pd.concat([df, future])

	dados_predicao = []
	dados_predicao = resultado.predict(start = tamanho_predicao, end = tamanho_predicao + 11).astype(int)
	dados_predicao = dados_predicao.tolist()
		
	hw_mse = mean_squared_error(valores_ano_seguinte, dados_predicao)
	hw_mae = mean_absolute_error(valores_ano_seguinte, dados_predicao)

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
	mod = AR(valores_anteriores)
	resultado = mod.fit()
	start = datetime.datetime.strptime("2017-01", "%Y-%m")
	date_list = [start + relativedelta(months=x) for x in range(0,12)]
	future = pd.DataFrame(index=date_list, columns= df.columns)
	df = pd.concat([df, future])

	dados_predicao = []
	dados_predicao = resultado.predict(start = tamanho_predicao, end = tamanho_predicao + 11, dynamic= True).astype(int)
	dados_predicao = dados_predicao.tolist()
		
	ar_mse = mean_squared_error(valores_ano_seguinte, dados_predicao)
	ar_mae = mean_absolute_error(valores_ano_seguinte, dados_predicao)

	pi = 3.1415926
	precision = 4
	print( "{:.{}f}".format( pi, precision ) )

	sa_mse = sa_mse / 1000000
	sa_mse = "{:.{}f}".format(sa_mse, 2)
	sa_mae = sa_mae / 1000000
	sa_mae = "{:.{}f}".format(sa_mae, 2)

	hw_mse = hw_mse / 1000000
	hw_mse = "{:.{}f}".format(hw_mse, 2)
	hw_mae = hw_mae / 1000000
	hw_mae = "{:.{}f}".format(hw_mae, 2)

	ar_mse = ar_mse / 1000000
	ar_mse = "{:.{}f}".format(ar_mse, 2)
	ar_mae = ar_mae / 1000000
	ar_mae = "{:.{}f}".format(ar_mae, 2)

	return jsonify(
        sa = dados_sarima,
		sa_mse = sa_mse,
		sa_mae = sa_mae,
		hw = dados_holt,
		hw_mse = hw_mse,
		hw_mae = hw_mae,
		ar = dados_ar,
		ar_mse = ar_mse,
		ar_mae = ar_mae
    )

if __name__ == "__main__":
	app.run()