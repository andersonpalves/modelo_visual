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

from math import sqrt

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

	ano_fim = ano_fim_parameter[0:4]
	ano_passado_metricas = int(ano_fim) - 1
	ano_mes_metricas = str(ano_passado_metricas) + "-01"
	tamanho_lista = len(meses_array)
	qtde_meses_predicao = tamanho_lista - 12
	
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

	#SARIMA
	mod = sm.tsa.statespace.SARIMAX(data, order=(1, 0, 1), seasonal_order=(3, 0, 1, 12))
	results = mod.fit()

	start = datetime.datetime.strptime(ano_fim_parameter, "%Y-%m")
	date_list = [start + relativedelta(months=x) for x in range(0,12)]
	future = pd.DataFrame(index=date_list, columns= df.columns)
	df = pd.concat([df, future])

	df['sarima'] = results.predict(start = tamanho_lista, end = tamanho_lista + 11, dynamic= True).astype(int)
	output = df['sarima'].unique()
	dados_sarima = output[~np.isnan(output)].tolist()

	##Sarima métricas
	valores_anteriores = valores[0:qtde_meses_predicao]
	valores_ano_seguinte = valores[qtde_meses_predicao:]
	tamanho_predicao = len(valores_anteriores)

	mod = sm.tsa.statespace.SARIMAX(valores_anteriores, order=(1, 0, 1), seasonal_order=(3, 0, 1, 12))
	resultado = mod.fit()
	start = datetime.datetime.strptime(ano_mes_metricas, "%Y-%m")
	date_list = [start + relativedelta(months=x) for x in range(0,12)]
	future = pd.DataFrame(index=date_list, columns= df.columns)
	df = pd.concat([df, future])

	dados_predicao_sarima = []
	dados_predicao_sarima = resultado.predict(start = tamanho_predicao, end = tamanho_predicao + 11, dynamic= True).astype(int)
	dados_predicao_sarima = dados_predicao_sarima.tolist()

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

	#Holt Winter métricas
	mod = ExponentialSmoothing(valores_anteriores, seasonal_periods=12 ,trend='add', seasonal='add')
	resultado = mod.fit()
	start = datetime.datetime.strptime(ano_mes_metricas, "%Y-%m")
	date_list = [start + relativedelta(months=x) for x in range(0,12)]
	future = pd.DataFrame(index=date_list, columns= df.columns)
	df = pd.concat([df, future])

	dados_predicao_hw = []
	dados_predicao_hw = resultado.predict(start = tamanho_predicao, end = tamanho_predicao + 11).astype(int)
	dados_predicao_hw = dados_predicao_hw.tolist()

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

	#AR métricas
	mod = AR(valores_anteriores)
	resultado = mod.fit()
	start = datetime.datetime.strptime(ano_mes_metricas, "%Y-%m")
	date_list = [start + relativedelta(months=x) for x in range(0,12)]
	future = pd.DataFrame(index=date_list, columns= df.columns)
	df = pd.concat([df, future])

	dados_predicao_ar = []
	dados_predicao_ar = resultado.predict(start = tamanho_predicao, end = tamanho_predicao + 11, dynamic= True).astype(int)
	dados_predicao_ar = dados_predicao_ar.tolist()

	return jsonify(
		sa_predict = dados_predicao_sarima,
        sa = dados_sarima,
		hw_predict = dados_predicao_hw,
		hw = dados_holt,
		ar_predict = dados_predicao_ar,
		ar = dados_ar
    )

if __name__ == "__main__":
	app.run()