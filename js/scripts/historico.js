var listaMeses = [];
var valoresMeses = [];

function carregarHistorico() {
    
    var listaObjetos = buscaDadosHistorico();

    var historico = {
       
        title: {
			text: ''
		},
		subtitle: {
			text: ''
		},
        chart: {
            renderTo: 'historico',
            type: 'line',
            zoomType: 'x'
        },
        tooltip: {
            shared: true,
            crosshairs: true,
            dateTimeLabelFormats : {
                day:"%b %e"
            }
            ,
            formatter: function () {
                var nf = new Intl.NumberFormat();
                var s = '<b>'+ this.x +'</b>';
                var ano2017 = 0;

                $.each(this.points, function(i, point) {
                    s += '<br/><span style="color:' + point.color + '">\u25CF</span> ' + point.series.name + ': <b>' + nf.format(point.y) + '</b>';

                    if (point.series.name == "2017") {
                        ano2017 = point.y;
                    }

                    if (point.series.name == "2017 Sarima Prediction") {
                        var anoAtual = point.y;
                        var resultado = Math.abs((anoAtual - ano2017) / ano2017) * 100;
                        s += '<br/><span style="color:' + point.color + '">\u25CF</span> Error Sarima Prediction: <b>' + Math.round(resultado * 100) / 100 + '%';
                        s += '<br/><span style="color:' + point.color + '">\u25CF</span> MAE: <b>' + nf.format(listaObjetos[7].mae)+'</b><br/>' +
                                '<span style="color:' + point.color + '">\u25CF</span> MSE: <b>'+nf.format(listaObjetos[7].mse)+'</b><br/>' +
                                '<span style="color:' + point.color + '">\u25CF</span> RMSE: <b>'+nf.format(listaObjetos[7].rmse)+'</b>'; 
                    }

                    if (point.series.name == "2017 Holt Prediction") {
                        var anoAtual = point.y;
                        var resultado = Math.abs((anoAtual - ano2017) / ano2017) * 100;
                        s += '<br/><span style="color:' + point.color + '">\u25CF</span> Error Holt Prediction: <b>' + Math.round(resultado * 100) / 100 + '%';
                        s += '<br/><span style="color:' + point.color + '">\u25CF</span> MAE: <b>' + nf.format(listaObjetos[8].mae)+'</b><br/>' +
                                '<span style="color:' + point.color + '">\u25CF</span> MSE: <b>'+ nf.format(listaObjetos[8].mse)+'</b><br/>' +
                                '<span style="color:' + point.color + '">\u25CF</span> RMSE: <b>'+ nf.format(listaObjetos[8].rmse)+'</b>';
                    }

                    if (point.series.name == "2017 AR Prediction") {
                        var anoAtual = point.y;
                        var resultado = Math.abs((anoAtual - ano2017) / ano2017) * 100;
                        s += '<br/><span style="color:' + point.color + '">\u25CF</span> Error AR Prediction: <b>' + Math.round(resultado * 100) / 100 + '%';
                        s += '<br/><span style="color:' + point.color + '">\u25CF</span> MAE: <b>' + nf.format(listaObjetos[9].mae)+'</b><br/>' +
                             '<span style="color:' + point.color + '">\u25CF</span> MSE: <b>'+nf.format(listaObjetos[9].mse)+'</b><br/>' +
                             '<span style="color:' + point.color + '">\u25CF</span> RMSE: <b>'+nf.format(listaObjetos[9].rmse)+'</b>';
                    }
                });

                return s;
			}
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Set', 'Oct', 'Nov', 'Dec'],
            plotBands: [{
                            color: '#F0F0F0',
                            from: -10,
                            to: 0.5
                        },
                        {
                            color: '#F0F0F0',
                            from: 1.5,
                            to: 2.5
                        },
                        {
                            color: '#F0F0F0',
                            from: 3.5,
                            to: 4.5
                        },
                        {
                            color: '#F0F0F0',
                            from: 5.5,
                            to: 6.5
                        },
                        {
                            color: '#F0F0F0',
                            from: 7.5,
                            to: 8.5
                        },
                        {
                            color: '#F0F0F0',
                            from: 9.5,
                            to: 10.5
                        }],
		},
        series: listaObjetos,
        exporting: {
            enabled: false
        },
        credits: {
            enabled: false
        },
		responsive: {
			rules: [{
				condition: {
					maxWidth: "100%",
					maxHeight: "100%"
				}
			}]
		}
		
    };
    
    chart_historico = new Highcharts.Chart(historico);

}

function buscaDadosHistorico(){

    var dadosNomesArquivos = "";
   
    $.ajax({
        url: "busca_arquivos.php?nome_arquivo="+lugar_selecionado,
        success: function (nomesArquivos) {
            dadosNomesArquivos = carregarDados(nomesArquivos);
        },
        async: false
    });

    console.log("dadosNomesArquivos", dadosNomesArquivos);
	
    return dadosNomesArquivos;
}

function carregarDados(nomesArquivos){
    var energia = $("#energia").val();
    var arquivos = eval(nomesArquivos);
    var retornoFinal =[];
    //var jan = 0, fev = 0, mar = 0, abr = 0, mai = 0, jun = 0, jul = 0, ago = 0, set = 0, out = 0, nov = 0, dez = 0;
	var janMedia = [], fevMedia = [], marMedia = [], abrMedia = [], maiMedia = [], junMedia = [], 
		julMedia = [], agoMedia = [], setMedia = [], outMedia = [], novMedia = [], dezMedia = [];
    var totalArquivos = arquivos.length;

	var x = [];
	var y = [];
    var contador = 1;
    var proximoAnoPrevisao = 0;

    for(i=0; i<totalArquivos; i++){
        var nome = arquivos[i];
        var anoDoArquivo = nome.substring(0,4);
        
        var jan = 0, fev = 0, mar = 0, abr = 0, mai = 0, jun = 0, jul = 0, ago = 0, set = 0, out = 0, nov = 0, dez = 0;
        proximoAnoPrevisao = parseInt(anoDoArquivo);
        
        x.push(contador++);

        $.ajax({
            url: "datasets/"+nome,
            success: function (dadosJson) {
                $.each(dadosJson, function (chave, val) {

                    if (chave == 0){
                        return;
                    }

                    var dataFormato = val[0].split('-');

                    if (selecaoPorGrupo == true) {
                        var grupo = $("#grupo").val();
						var valor = 0;

						for(j=0; j<=val[2].length; j++){
							if (grupo == ELETRICIDADE_TEXTO && verificaGrupoPorEnergia(j) == ELETRICIDADE){
								valor = valor + val[2][j];
							}
							else if (grupo == GAS_TEXTO && verificaGrupoPorEnergia(j) == GAS){
								valor = valor + val[2][j];
							}
						}
                    }
                    else {
                        if (energia == "Média") {
                            var contadorTotal = 0;
                            for(var z=0; z<=val[2].length-1; z++){
                                contadorTotal += parseInt(val[2][z]);
                            }
                
                            valor = contadorTotal / val[2].length;
                        }
                        else{
                            valor = val[2][energia-1];
                        }
                    }

                    switch (dataFormato[1]) {
                        case "01":
                            jan += parseInt(valor);
                            break;
                        case "02":
                            fev += parseInt(valor);
                            break;
                        case "03":
                            mar += parseInt(valor);
                            break;
                        case "04":
                            abr += parseInt(valor);
                            break;
                        case "05":
                            mai += parseInt(valor);
                            break;
                        case "06":
                            jun += parseInt(valor);
                            break;
                        case "07":
                            jul += parseInt(valor);
                            break;
                        case "08":
                            ago += parseInt(valor);
                            break;
                        case "09":
                            set += parseInt(valor);
                            break;
                        case "10":
                            out += parseInt(valor);
                            break;
                        case "11":
                            nov += parseInt(valor);
                            break;
                        case "12":
                            dez += parseInt(valor);
                    }
                });

                var objeto = {};
                objeto.name = anoDoArquivo;
				objeto.data = [jan, fev, mar, abr, mai, jun, jul, ago, set, out, nov, dez];
				//jan = 0, fev = 0, mar = 0, abr = 0, mai = 0, jun = 0, jul = 0, ago = 0, set = 0, out = 0, nov = 0, dez = 0;
                retornoFinal.push(objeto);

				janMedia.push(jan);
				fevMedia.push(fev);
				marMedia.push(mar);
				abrMedia.push(abr);
				maiMedia.push(mai);
				junMedia.push(jun);
				julMedia.push(jul);
				agoMedia.push(ago);
				setMedia.push(set);
				outMedia.push(out);
				novMedia.push(nov);
                dezMedia.push(dez);
                
                for(a=1; a<=12; a++){
                    var mes = a;
                    if (mes < 10) {
                        mes = "0" + mes;
                    }
                    listaMeses.push(anoDoArquivo + "-" + mes)
                }

                valoresMeses.push(jan);
                valoresMeses.push(fev);
                valoresMeses.push(mar);
                valoresMeses.push(abr);
                valoresMeses.push(mai);
                valoresMeses.push(jun);
                valoresMeses.push(jul);
                valoresMeses.push(ago);
				valoresMeses.push(set);
				valoresMeses.push(out);
				valoresMeses.push(nov);
                valoresMeses.push(dez);

            },
            async: false
        });
   }

    var comboEnergia = $("#energia").val() == "-" ? true : false;
    var comboGrupo = $("#grupo").val() == "-" ? true : false;
    var realizaPredicao = true;
    var anoInicio = $("#ano option:first").val() + "-01-01";
    var anoFim = parseInt($("#ano option:last").val()) + 1 + "-01";

    if (comboEnergia == true && comboGrupo == true) {
        realizaPredicao = false
    }

    if (realizaPredicao == true) {

        $.ajax({
            url: "http://localhost:5000/predicoes/?valores="+valoresMeses+"&meses="+listaMeses+"&anoInicio="+anoInicio+"&anoFim="+anoFim,
            success: function (dadosJson) {
                var objetoSarimaPredicao = {};
                objetoSarimaPredicao.name = parseInt(proximoAnoPrevisao) + " Sarima Prediction";
                objetoSarimaPredicao.data = dadosJson.sa_predict;
                objetoSarimaPredicao.rmse = dadosJson.sa_rmse;
                objetoSarimaPredicao.mse = dadosJson.sa_mse;
                objetoSarimaPredicao.mae = dadosJson.sa_mae;
                retornoFinal.push(objetoSarimaPredicao)

                var objetoHoltPredicao = {};
                objetoHoltPredicao.name = parseInt(proximoAnoPrevisao) + " Holt Prediction";
                objetoHoltPredicao.data = dadosJson.hw_predict;
                objetoHoltPredicao.rmse = dadosJson.hw_rmse;
                objetoHoltPredicao.mse = dadosJson.hw_mse;
                objetoHoltPredicao.mae = dadosJson.hw_mae;
                retornoFinal.push(objetoHoltPredicao)

                var objetoArPredicao = {};
                objetoArPredicao.name = parseInt(proximoAnoPrevisao) + " AR Prediction";
                objetoArPredicao.data = dadosJson.ar_predict;
                objetoArPredicao.rmse = dadosJson.ar_rmse;
                objetoArPredicao.mse = dadosJson.ar_mse;
                objetoArPredicao.mae = dadosJson.ar_mae;
                retornoFinal.push(objetoArPredicao)

                var objetoSarima = {};
                objetoSarima.name = parseInt(proximoAnoPrevisao+1) + " Sarima Prediction";
                objetoSarima.data = dadosJson.sa;
                retornoFinal.push(objetoSarima)

                var objetoHolt = {};
                objetoHolt.name = parseInt(proximoAnoPrevisao+1) + " Holt Prediction";
                objetoHolt.data = dadosJson.hw;
                retornoFinal.push(objetoHolt)

                var objetoAr = {};
                objetoAr.name = parseInt(proximoAnoPrevisao+1) + " AR Prediction";
                objetoAr.data = dadosJson.ar;
                retornoFinal.push(objetoAr)
            },
            async: false
        });

    }

    valoresMeses = []
    listaMeses = []
    
    return retornoFinal;
}

function regressao(x, lista, totalArquivos){
	var m = somatorio(produto(x,lista)) - somatorio(x) * somatorio(lista) / x.length;
	m /= somatorio(quadrados(x)) - somatorio(x)*somatorio(x) / x.length;
	var b = media(lista) - m * media(x);

	var j = (m * (totalArquivos + 1) + b);
	return j;
}

function produto(x, y) {
	var ret = [];
	for ( var i = 0 ; i < x.length ; i++ )
		ret.push(x[i] * y[i]);
	return ret;
}

function quadrados(x) {
	var ret = [];
	for ( var i = 0 ; i < x.length ; i++ )
		ret.push(x[i] * x[i]);
	return ret;
}

function somatorio(x) {
	var ret = 0;
	for ( var i = 0 ; i < x.length ; i++ )
		ret += x[i];
	return ret;
}

function media(x) {
	return somatorio(x) / x.length; 
}
