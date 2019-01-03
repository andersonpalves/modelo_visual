var lista_global = [];
var lista_datas = [];
var lista_heatmap = [];
var lista_dados = [];
var lista_dias = [];
var lista_series_historico = [];
var lista_conteudo_dense = [];
var chart_heatmap_large, chart_heatmap_color, chart_dias, chart_horas, app, chart_relogio_tarde, chart_historico, chart_historico_geral;
var chart_heatmap_large_init;
var semana_selecionada, lugar_selecionado;
var heatmap_large;
var maxDenseDisplay = 0;
var selecaoPorGrupo = false;
var valoresEletricidade = [0, 1, 2, 3, 4, 5];
var valoresGas = [6, 7, 8, 9];
var ELETRICIDADE = 1;
var GAS = 2;
var ELETRICIDADE_TEXTO = "Eletricidade";
var GAS_TEXTO = "Gas";
var dados_dense_estado_inicial = []
$(function () {
	$('#rangeValuesDense').change(function() { 
		abreDados($("#ano").val(), $("#lugar").val());
		$('#heatmapMaximo').html("<b>" + parseInt($('#rangeValuesDense').val()) + "<b>");

		var dados = chart_heatmap_large.series[0].data;
		var valorRange = parseInt($('#rangeValuesDense').val());
		var filteredData = dados.map(function(item) {
			var valorFiltrado = null;
			if (item.value >= valorRange){
				valorFiltrado = item.value;
			}

			return [item.x, item.y, valorFiltrado];
		});
		

		heatmap_large.series[0].data = filteredData;
		chart_heatmap_large = new Highcharts.Chart(heatmap_large);
	});

	$("#lugar").change(function() {
		$("#grupo").val('-');
		$("#energia").val('-');
		selecaoPorGrupo = false;
		abreDadosJson();
	});
	
	$("#ano").change(function() {
		$("#grupo").val('-');
		$("#energia").val('-');
		selecaoPorGrupo = false;
		abreDadosJson();
	});
	
	$("#energia").change(function() {
		$("#grupo").val('-');
		selecaoPorGrupo = false;
		abreDadosJson();
	});

	$("#grupo").change(function() {
		$("#energia").val('-');
		selecaoPorGrupo = true;
		abreDadosJson();
	});
	
	abreDados($("#ano").val(), $("#lugar").val());
});

function abreDadosJson(){
	
	if ($("#lugar").val() == "teste") {
		$("#ano").val(2016);
	}

	abreDados($("#ano").val(), $("#lugar").val());
}

function verificaGrupoPorEnergia(valor) {
	var retorno = 0;
	
	if (valoresEletricidade.indexOf(valor) > -1) {
		retorno = ELETRICIDADE;
	}
	else if (valoresGas.indexOf(valor) > -1) {
		retorno = GAS;
	}

	return retorno;
}

function ajustarTextos(){
	$("#denseTexto").html("Annual / Monthly View");
	$("#heatmapTexto").html("Weekly View");
	$("#diasHorasTexto").html("Days / Hours View");
	$("#relogioTexto").html("Clock View");
	$("#heatmapHistoricoGeralTexto").html("All energy sources - <b>Year selected<b>: " + $("#ano").val());
}

function abreDados(ano, lugar){
	$(".botoes-graficos").hide();
	ajustarTextos();
	
	var anoProximo = parseInt(1) + parseInt(ano);
	heatmap_large = {
			chart: {
				renderTo: 'ht_large',
				type: 'heatmap',
				zoomType: 'xy',
				margin: [60, 10, 80, 50],
				style:{
					cursor:'crosshair' //zoom-in'
				},
				height: 360,
				marginTop: 0
			},

			boost: {
				useGPUTranslations: true
			},

			title: {
				text: ''
			},
			subtitle: {
				text: ''
			},

			xAxis: {
				type: 'datetime',
				min: Date.UTC(ano, 0, 1),
				max: Date.UTC(anoProximo, 0, 1),
				useUTC: true,
				labels: {
					align: 'left',
					x: 5,
					y: 14/*,
					format: '{value:%B}' // long month */
				},
				title: {
					text: 'Day'
				}
			},

			yAxis: {
				title: {
					text: null
				},
				labels: {
					format: '{value}h' //:00
				},
				minPadding: 0,
				maxPadding: 0,
				startOnTick: false,
				endOnTick: false,
				tickPositions: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
				tickWidth: 1,
				min: 0,
				max: 23,
				reversed: true,
				title: {
					text: 'Schedule',
					margin: 3
				},
			},

			colorAxis: {
				stops: [
					[0, '#3060cf'],
					[0.5, '#fffbbc'],
					[0.9, '#c4463a'],
					[1, '#c4463a']
				],
				min: 0,
				startOnTick: false,
				endOnTick: false,
				labels: {
					format: '{value}'
				}
			},

			series: [{
				boostThreshold: 100,
				borderWidth: 0,
				nullColor: '#EFEFEF',
				colsize: 24 * 36e5, // one day
				tooltip: {
					headerFormat: null,
					pointFormat: '<b>{point.x:%e %b, %Y} {point.y}:00h: {point.value} Consumption</b>'
				},
				turboThreshold: Number.MAX_VALUE
			}],

			plotOptions: {
				series: {
					events: {
						click: function (e) {
							var retorno = getWeekNumber(new Date(parseInt(e.point.x)));
							var lista_itens = [];
							semana_selecionada = retorno[1];

							$.post( "datas_semanais.php", { ano: retorno[0], semana: retorno[1] }, function( data ) {
								lista_dias=[];

								$.each(data, function (key, val) {
									lista_dias.push(val);
									lista_heatmap.push(getLoadDatas(val));
								});

								for(var i=0; i<=6; i++){
									for(var j=0; j<=23; j++){
										var item = [];
										var valor = 0;

										if (typeof lista_heatmap[i][j] === 'undefined') {
											valor = null
										}
										else {
											valor = lista_heatmap[i][j][2];
										}

										if (valor != null) {
											valor = parseInt(valor);
										}

										item.push(i, j, valor);
										lista_itens.push(item);
									}
								}

								if(chart_heatmap_large.chartWidth == "1300"){
									$("#panel-fullscreen-dense-display").click();
								}
								
								carregaHeatmap(heatmapcolor, lista_itens, maxDenseDisplay);

								lista_heatmap=[];
								chart_heatmap_color = new Highcharts.Chart(heatmapcolor);
							}, "json");

							$("#heatmap-color-semana").show();
							$("#heatmap-color").show();
							
							carregaGraficoDias(null);
							chart_dias = new Highcharts.Chart(dias);
							
							carregaGraficoHoras(null);
							chart_horas = new Highcharts.Chart(horas);
							
							carregaRelogioManha();
							chart_horas = new Highcharts.Chart(relogio_manha);
							
							carregaRelogioTarde();
							chart_horas = new Highcharts.Chart(relogio_tarde);
						}
					}
				}
			},

			navigation: {
				buttonOptions: {
					enabled: false
				}
			},

			credits: {
				enabled: false
			},
			
			responsive: {
				rules: [{
					condition: {
						maxWidth: "100%"
					}
				}]
			}
		};

		var file = ano+"_"+lugar+".json";
		lugar_selecionado = lugar;

		$.getJSON(file, function(data){
			maxDenseDisplay = 0;
			
			lista_datas = [];
			dados_heat = [];
			lista_global = []
			
			$.each(data, function (key, val) {
				if (key != 0) {
					if (selecaoPorGrupo == true) {
						var grupo = $("#grupo").val();
						var valorAgrupado = 0;

						for(j=0; j<=val[2].length; j++){
							if (grupo == ELETRICIDADE_TEXTO && verificaGrupoPorEnergia(j) == ELETRICIDADE){
								valorAgrupado = valorAgrupado + val[2][j];
							}
							else if (grupo == GAS_TEXTO && verificaGrupoPorEnergia(j) == GAS){
								valorAgrupado = valorAgrupado + val[2][j];
							}
						}

						if (valorAgrupado > maxDenseDisplay){
							maxDenseDisplay = valorAgrupado;
						}
						
						var dataFormato = val[0].split('-');
						var dataUTC = Date.UTC(dataFormato[0],dataFormato[1]-1,dataFormato[2]);
						var dataBR  = dataFormato[0]+"-"+dataFormato[1]+"-"+dataFormato[2];
						var dado = [dataBR,val[1],valorAgrupado];
						lista_datas.push(dado);
					
						var elemento = [dataUTC ,val[1],parseInt(valorAgrupado)];
						lista_global.push(elemento);
					}
					else {
						var dataFormato = val[0].split('-');
						var energia = $("#energia").val();
						var valor = 0;

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
	
						if (valor > maxDenseDisplay){
							maxDenseDisplay = valor;
						}
						
						var dataUTC = Date.UTC(dataFormato[0],dataFormato[1]-1,dataFormato[2]);
						var dataBR  = dataFormato[0]+"-"+dataFormato[1]+"-"+dataFormato[2];
						var dado = [dataBR,val[1],valor];
						lista_datas.push(dado);
					
						var elemento = [dataUTC ,val[1],parseInt(valor)];
						lista_global.push(elemento);
					}

				}
				else {
					// primeira linha
					if ($("#lugar").val() == "teste") {
						if ($('#energia option').size() < 20){
							$('#energia').empty();
								
							if (null == $("#energia").val()){
								$('#energia').empty();
								$('#energia').append($("<option></option>").attr("value","Média").text("Average")); 

								for(var i=1; i<=val.length; i++){
									$('#energia').append($("<option></option>").attr("value",i).text(val[i-1])); 
								}

							}
						}
					}
					else{
						if ($('#energia option').size() > 20){
							$('#energia').empty();
						}
						
						if (null == $("#energia").val()){
							$('#energia').append($("<option>-</option>").attr("value","-").text("-")); 
							$('#energia').append($("<option></option>").attr("value","Média").text("Average")); 
							$('#energia').val('Média');

							for(var i=1; i<=val.length; i++){
								$('#energia').append($("<option></option>").attr("value",i).text(val[i-1])); 
							}

						}
					}
				}
			});
			
			var valorEnergia = $('#energia option:selected').text();
			var valorGrupo   = $('#grupo option:selected').text();
			var textoHtml 	 = "";

			if (valorEnergia == "-" && valorGrupo == "-") {
				textoHtml = "";
				tracoHtml = "";
			}
			else if (valorEnergia != "-") {
				textoHtml = "Energy selected: <b>" + valorEnergia + "</b>";
				tracoHtml = "- ";
			}
			else if (valorGrupo != "-") {
				textoHtml = "Group selected: <b>" + valorGrupo + "</b>";
				tracoHtml = "- ";
			}

			$("#denseTexto").html("Annual / Monthly View " + tracoHtml + textoHtml + " - Max consumption: <b>" + parseInt(maxDenseDisplay) + "</br>");
			$("#heatmapHistoricoTexto").html("Monthly History " + tracoHtml + textoHtml);
			//$('#heatmapMaximo').html("<b>" + parseInt(maxDenseDisplay) + "</b>");
			$('#rangeValuesDense').attr('max', parseInt(maxDenseDisplay));

			chart_heatmap_color = new Highcharts.Chart(heatmapcolor);
			
			carregaGraficoDias(null);
			chart_dias = new Highcharts.Chart(dias);
			
			carregaGraficoHoras(null);
			chart_horas = new Highcharts.Chart(horas);
			
			carregaRelogioManha();
			chart_horas = new Highcharts.Chart(relogio_manha);
			
			carregaRelogioTarde();
			chart_horas = new Highcharts.Chart(relogio_tarde);
			
			heatmap_large.series[0].data = lista_global;
			heatmap_large.colorAxis.max = maxDenseDisplay;

			chart_heatmap_large = new Highcharts.Chart(heatmap_large);
			
			carregarHistorico();
			carregarHistoricoGeral(file);
		});
}

function carregaHeatmap(heatmapcolor, lista_itens, maxDenseDisplay){
	
	heatmapcolor.series[0].data=lista_itens;
	heatmapcolor.colorAxis.max = parseInt(maxDenseDisplay);
	heatmapcolor.xAxis.categories = ['Monday<br><b>' + formatarData(lista_dias[0]), 
									 'Tuesday<br><b>' + formatarData(lista_dias[1]),  
									 'Wednesday<br><b>' + formatarData(lista_dias[2]),  
									 'Thursday<br><b>' + formatarData(lista_dias[3]),  
									 'Friday<br><b>' + formatarData(lista_dias[4]),  
									 'Saturday<br><b>' + formatarData(lista_dias[5]),  
									 'Sunday<br><b>' + formatarData(lista_dias[6])];
									 
	dataInicioSemana = formatarData(lista_dias[0]);
	dataFimSemana = formatarData(lista_dias[6]);
	
	$("#heatmapTexto").html("Weekly View - Week selected: <b>" + semana_selecionada + "</b> - Start: <b>" + dataInicioSemana + "</b> - End: <b>" + dataFimSemana + "</b>");

	var arrayValorMedioLinha1 = [], arrayValorMedioLinha2 = [], arrayValorMedioLinha3 = [], arrayValorMedioLinha4 = [], arrayValorMedioLinha5 = [], arrayValorMedioLinha6= [], arrayValorMedioLinha7 = [];
	var arrayValorMedioLinhaX1 = [], arrayValorMedioLinhaX2 = [], arrayValorMedioLinhaX3 = [], arrayValorMedioLinhaX4 = [], arrayValorMedioLinhaX5 = [], arrayValorMedioLinhaX6= [], arrayValorMedioLinhaX7 = [], arrayValorMedioLinhaX8 = [], arrayValorMedioLinhaX9 = [], arrayValorMedioLinhaX10 = [], arrayValorMedioLinhaX11 = [], arrayValorMedioLinhaX12 = [], arrayValorMedioLinhaX13 = [], arrayValorMedioLinhaX14 = [], arrayValorMedioLinhaX15 = [], arrayValorMedioLinhaX16 = [], arrayValorMedioLinhaX17 = [], arrayValorMedioLinhaX18 = [], arrayValorMedioLinhaX19 = [], arrayValorMedioLinhaX20 = [], arrayValorMedioLinhaX21 = [], arrayValorMedioLinhaX22 = [], arrayValorMedioLinhaX23 = [], arrayValorMedioLinhaX24 = [];
	var mediaX = 0, mediaY = 0;
	var minimoL1 = 0, minimoL2 = 0, minimoL3 = 0, minimoL4 = 0, minimoL5 = 0, minimoL6 = 0, minimoL7 = 0;
	var maximoL1 = 0, maximoL2 = 0, maximoL3 = 0, maximoL4 = 0, maximoL5 = 0, maximoL6 = 0, maximoL7 = 0;
	var mediaL1 = 0, mediaL2 = 0, mediaL3 = 0, mediaL4 = 0, mediaL5 = 0, mediaL6 = 0, mediaL7 = 0;
	var contador = 0, contandorX = 0;

	for(var l=0; l<=6; l++){
		if(l == 0){
			for(var z=0; z<=23; z++){
				arrayValorMedioLinha1.push(heatmapcolor.series[0].data[z+24*l][2]);
			}
		}
		else if(l == 1){
			for(var z=0; z<=23; z++){
				arrayValorMedioLinha2.push(heatmapcolor.series[0].data[z+24*l][2]);
			}
		}
		else if(l == 2){
			for(var z=0; z<=23; z++){
				arrayValorMedioLinha3.push(heatmapcolor.series[0].data[z+24*l][2]);
			}
		}
		else if(l == 3){
			for(var z=0; z<=23; z++){
				arrayValorMedioLinha4.push(heatmapcolor.series[0].data[z+24*l][2]);
			}
		}
		else if(l == 4){
			for(var z=0; z<=23; z++){
				arrayValorMedioLinha5.push(heatmapcolor.series[0].data[z+24*l][2]);
			}
		}
		else if(l == 5){
			for(var z=0; z<=23; z++){
				arrayValorMedioLinha6.push(heatmapcolor.series[0].data[z+24*l][2]);
			}
		}
		else if(l == 6){
			for(var z=0; z<=23; z++){
				arrayValorMedioLinha7.push(heatmapcolor.series[0].data[z+24*l][2]);
			}
		}

		arrayValorMedioLinhaX1.push(heatmapcolor.series[0].data[l*24][2]);
		arrayValorMedioLinhaX2.push(heatmapcolor.series[0].data[l*24+1][2]);
		arrayValorMedioLinhaX3.push(heatmapcolor.series[0].data[l*24+2][2]);
		arrayValorMedioLinhaX4.push(heatmapcolor.series[0].data[l*24+3][2]);
		arrayValorMedioLinhaX5.push(heatmapcolor.series[0].data[l*24+4][2]);
		arrayValorMedioLinhaX6.push(heatmapcolor.series[0].data[l*24+5][2]);      
		arrayValorMedioLinhaX7.push(heatmapcolor.series[0].data[l*24+6][2]);
		arrayValorMedioLinhaX8.push(heatmapcolor.series[0].data[l*24+7][2]);
		arrayValorMedioLinhaX9.push(heatmapcolor.series[0].data[l*24+8][2]);
		arrayValorMedioLinhaX10.push(heatmapcolor.series[0].data[l*24+9][2]);
		arrayValorMedioLinhaX11.push(heatmapcolor.series[0].data[l*24+10][2]);
		arrayValorMedioLinhaX12.push(heatmapcolor.series[0].data[l*24+11][2]);
		arrayValorMedioLinhaX13.push(heatmapcolor.series[0].data[l*24+12][2]);
		arrayValorMedioLinhaX14.push(heatmapcolor.series[0].data[l*24+13][2]);
		arrayValorMedioLinhaX15.push(heatmapcolor.series[0].data[l*24+14][2]);
		arrayValorMedioLinhaX16.push(heatmapcolor.series[0].data[l*24+15][2]);
		arrayValorMedioLinhaX17.push(heatmapcolor.series[0].data[l*24+16][2]);
		arrayValorMedioLinhaX18.push(heatmapcolor.series[0].data[l*24+17][2]);
		arrayValorMedioLinhaX19.push(heatmapcolor.series[0].data[l*24+18][2]);
		arrayValorMedioLinhaX20.push(heatmapcolor.series[0].data[l*24+19][2]);
		arrayValorMedioLinhaX21.push(heatmapcolor.series[0].data[l*24+20][2]);
		arrayValorMedioLinhaX22.push(heatmapcolor.series[0].data[l*24+21][2]);
		arrayValorMedioLinhaX23.push(heatmapcolor.series[0].data[l*24+22][2]);
		arrayValorMedioLinhaX24.push(heatmapcolor.series[0].data[l*24+23][2]);
	}

	minimoL1 = Math.min(...arrayValorMedioLinha1);
	maximoL1 = Math.max(...arrayValorMedioLinha1);
	minimoL2 = Math.min(...arrayValorMedioLinha2);
	maximoL2 = Math.max(...arrayValorMedioLinha2);
	minimoL3 = Math.min(...arrayValorMedioLinha3);
	maximoL3 = Math.max(...arrayValorMedioLinha3);
	minimoL4 = Math.min(...arrayValorMedioLinha4);
	maximoL4 = Math.max(...arrayValorMedioLinha4);
	minimoL5 = Math.min(...arrayValorMedioLinha5);
	maximoL5 = Math.max(...arrayValorMedioLinha5);
	minimoL6 = Math.min(...arrayValorMedioLinha6);
	maximoL6 = Math.max(...arrayValorMedioLinha6);
	minimoL7 = Math.min(...arrayValorMedioLinha7);
	maximoL7 = Math.max(...arrayValorMedioLinha7);
	
	posicaoMinimoL1 = arrayValorMedioLinha1.indexOf(minimoL1);
	posicaoMinimoL2 = arrayValorMedioLinha2.indexOf(minimoL2);
	posicaoMinimoL3 = arrayValorMedioLinha3.indexOf(minimoL3);
	posicaoMinimoL4 = arrayValorMedioLinha4.indexOf(minimoL4);
	posicaoMinimoL5 = arrayValorMedioLinha5.indexOf(minimoL5);
	posicaoMinimoL6 = arrayValorMedioLinha6.indexOf(minimoL6);
	posicaoMinimoL7 = arrayValorMedioLinha7.indexOf(minimoL7);
	
	posicaoMaximoL1 = arrayValorMedioLinha1.indexOf(maximoL1);
	posicaoMaximoL2 = arrayValorMedioLinha2.indexOf(maximoL2);
	posicaoMaximoL3 = arrayValorMedioLinha3.indexOf(maximoL3);
	posicaoMaximoL4 = arrayValorMedioLinha4.indexOf(maximoL4);
	posicaoMaximoL5 = arrayValorMedioLinha5.indexOf(maximoL5);
	posicaoMaximoL6 = arrayValorMedioLinha6.indexOf(maximoL6);
	posicaoMaximoL7 = arrayValorMedioLinha7.indexOf(maximoL7);
	
	heatmapcolor.series[1].data=[
									[0.1, posicaoMinimoL1],[1.1,posicaoMinimoL2],[2.1,posicaoMinimoL3],
									[3.1,posicaoMinimoL4],[4.1,posicaoMinimoL5],[5.1,posicaoMinimoL6],
									[5.8,posicaoMinimoL7]
								];

	heatmapcolor.series[2].data=[
									[0.1, posicaoMaximoL1],[1.1,posicaoMaximoL2],[2.1,posicaoMaximoL3],
									[3.1,posicaoMaximoL4],[4.1,posicaoMaximoL5],[5.1,posicaoMaximoL6],
									[5.8,posicaoMaximoL7]
								];

	minimoX1 = Math.min(...arrayValorMedioLinhaX1);
	maximoX1 = Math.max(...arrayValorMedioLinhaX1);
	minimoX2 = Math.min(...arrayValorMedioLinhaX2);
	maximoX2 = Math.max(...arrayValorMedioLinhaX2);
	minimoX3 = Math.min(...arrayValorMedioLinhaX3);
	maximoX3 = Math.max(...arrayValorMedioLinhaX3);
	minimoX4 = Math.min(...arrayValorMedioLinhaX4);
	maximoX4 = Math.max(...arrayValorMedioLinhaX4);
	minimoX5 = Math.min(...arrayValorMedioLinhaX5);
	maximoX5 = Math.max(...arrayValorMedioLinhaX5);
	minimoX6 = Math.min(...arrayValorMedioLinhaX6);
	maximoX6 = Math.max(...arrayValorMedioLinhaX6);
	minimoX7 = Math.min(...arrayValorMedioLinhaX7);
	maximoX7 = Math.max(...arrayValorMedioLinhaX7);
	minimoX8 = Math.min(...arrayValorMedioLinhaX8);
	maximoX8 = Math.max(...arrayValorMedioLinhaX8);
	minimoX9 = Math.min(...arrayValorMedioLinhaX9);
	maximoX9 = Math.max(...arrayValorMedioLinhaX9);
	minimoX10 = Math.min(...arrayValorMedioLinhaX10);
	maximoX10 = Math.max(...arrayValorMedioLinhaX10);
	minimoX11 = Math.min(...arrayValorMedioLinhaX11);
	maximoX11 = Math.max(...arrayValorMedioLinhaX11);
	minimoX12 = Math.min(...arrayValorMedioLinhaX12);
	maximoX12 = Math.max(...arrayValorMedioLinhaX12);
	minimoX13 = Math.min(...arrayValorMedioLinhaX13);
	maximoX13 = Math.max(...arrayValorMedioLinhaX13);
	minimoX14 = Math.min(...arrayValorMedioLinhaX14);
	maximoX14 = Math.max(...arrayValorMedioLinhaX14);
	minimoX15 = Math.min(...arrayValorMedioLinhaX15);
	maximoX15 = Math.max(...arrayValorMedioLinhaX15);
	minimoX16 = Math.min(...arrayValorMedioLinhaX16);
	maximoX16 = Math.max(...arrayValorMedioLinhaX16);
	minimoX17 = Math.min(...arrayValorMedioLinhaX17);
	maximoX17 = Math.max(...arrayValorMedioLinhaX17);
	minimoX18 = Math.min(...arrayValorMedioLinhaX18);
	maximoX18 = Math.max(...arrayValorMedioLinhaX18);
	minimoX19 = Math.min(...arrayValorMedioLinhaX19);
	maximoX19 = Math.max(...arrayValorMedioLinhaX19);
	minimoX20 = Math.min(...arrayValorMedioLinhaX20);
	maximoX20 = Math.max(...arrayValorMedioLinhaX20);
	minimoX21 = Math.min(...arrayValorMedioLinhaX21);
	maximoX21 = Math.max(...arrayValorMedioLinhaX21);
	minimoX22 = Math.min(...arrayValorMedioLinhaX22);
	maximoX22 = Math.max(...arrayValorMedioLinhaX22);
	minimoX23 = Math.min(...arrayValorMedioLinhaX23);
	maximoX23 = Math.max(...arrayValorMedioLinhaX23);
	minimoX24 = Math.min(...arrayValorMedioLinhaX24);
	maximoX24 = Math.max(...arrayValorMedioLinhaX24);

	posicaoMinimoX1 = ajustePosicaoHeatmapSerie3(arrayValorMedioLinhaX1.indexOf(minimoX1));
	posicaoMinimoX2 = ajustePosicaoHeatmapSerie3(arrayValorMedioLinhaX2.indexOf(minimoX2));
	posicaoMinimoX3 = ajustePosicaoHeatmapSerie3(arrayValorMedioLinhaX3.indexOf(minimoX3));
	posicaoMinimoX4 = ajustePosicaoHeatmapSerie3(arrayValorMedioLinhaX4.indexOf(minimoX4));
	posicaoMinimoX5 = ajustePosicaoHeatmapSerie3(arrayValorMedioLinhaX5.indexOf(minimoX5));
	posicaoMinimoX6 = ajustePosicaoHeatmapSerie3(arrayValorMedioLinhaX6.indexOf(minimoX6));
	posicaoMinimoX7 = ajustePosicaoHeatmapSerie3(arrayValorMedioLinhaX7.indexOf(minimoX7));
	posicaoMinimoX8 = ajustePosicaoHeatmapSerie3(arrayValorMedioLinhaX8.indexOf(minimoX8));
	posicaoMinimoX9 = ajustePosicaoHeatmapSerie3(arrayValorMedioLinhaX9.indexOf(minimoX9));
	posicaoMinimoX10 = ajustePosicaoHeatmapSerie3(arrayValorMedioLinhaX10.indexOf(minimoX10));
	posicaoMinimoX11 = ajustePosicaoHeatmapSerie3(arrayValorMedioLinhaX11.indexOf(minimoX11));
	posicaoMinimoX12 = ajustePosicaoHeatmapSerie3(arrayValorMedioLinhaX12.indexOf(minimoX12));
	posicaoMinimoX13 = ajustePosicaoHeatmapSerie3(arrayValorMedioLinhaX13.indexOf(minimoX13));
	posicaoMinimoX14 = ajustePosicaoHeatmapSerie3(arrayValorMedioLinhaX14.indexOf(minimoX14));
	posicaoMinimoX15 = ajustePosicaoHeatmapSerie3(arrayValorMedioLinhaX15.indexOf(minimoX15));
	posicaoMinimoX16 = ajustePosicaoHeatmapSerie3(arrayValorMedioLinhaX16.indexOf(minimoX16));
	posicaoMinimoX17 = ajustePosicaoHeatmapSerie3(arrayValorMedioLinhaX17.indexOf(minimoX17));
	posicaoMinimoX18 = ajustePosicaoHeatmapSerie3(arrayValorMedioLinhaX18.indexOf(minimoX18));
	posicaoMinimoX19 = ajustePosicaoHeatmapSerie3(arrayValorMedioLinhaX19.indexOf(minimoX19));
	posicaoMinimoX20 = ajustePosicaoHeatmapSerie3(arrayValorMedioLinhaX20.indexOf(minimoX20));
	posicaoMinimoX21 = ajustePosicaoHeatmapSerie3(arrayValorMedioLinhaX21.indexOf(minimoX21));
	posicaoMinimoX22 = ajustePosicaoHeatmapSerie3(arrayValorMedioLinhaX22.indexOf(minimoX22));
	posicaoMinimoX23 = ajustePosicaoHeatmapSerie3(arrayValorMedioLinhaX23.indexOf(minimoX23));
	posicaoMinimoX24 = ajustePosicaoHeatmapSerie3(arrayValorMedioLinhaX24.indexOf(minimoX24));
	
	posicaoMaximoX1 = ajustePosicaoHeatmapSerie4(arrayValorMedioLinhaX1.indexOf(maximoX1));
	posicaoMaximoX2 = ajustePosicaoHeatmapSerie4(arrayValorMedioLinhaX2.indexOf(maximoX2));
	posicaoMaximoX3 = ajustePosicaoHeatmapSerie4(arrayValorMedioLinhaX3.indexOf(maximoX3));
	posicaoMaximoX4 = ajustePosicaoHeatmapSerie4(arrayValorMedioLinhaX4.indexOf(maximoX4));
	posicaoMaximoX5 = ajustePosicaoHeatmapSerie4(arrayValorMedioLinhaX5.indexOf(maximoX5));
	posicaoMaximoX6 = ajustePosicaoHeatmapSerie4(arrayValorMedioLinhaX6.indexOf(maximoX6));
	posicaoMaximoX7 = ajustePosicaoHeatmapSerie4(arrayValorMedioLinhaX7.indexOf(maximoX7));
	posicaoMaximoX8 = ajustePosicaoHeatmapSerie4(arrayValorMedioLinhaX8.indexOf(maximoX8));
	posicaoMaximoX9 = ajustePosicaoHeatmapSerie4(arrayValorMedioLinhaX9.indexOf(maximoX9));
	posicaoMaximoX10 = ajustePosicaoHeatmapSerie4(arrayValorMedioLinhaX10.indexOf(maximoX10));
	posicaoMaximoX11 = ajustePosicaoHeatmapSerie4(arrayValorMedioLinhaX11.indexOf(maximoX11));
	posicaoMaximoX12 = ajustePosicaoHeatmapSerie4(arrayValorMedioLinhaX12.indexOf(maximoX12));
	posicaoMaximoX13 = ajustePosicaoHeatmapSerie4(arrayValorMedioLinhaX13.indexOf(maximoX13));
	posicaoMaximoX14 = ajustePosicaoHeatmapSerie4(arrayValorMedioLinhaX14.indexOf(maximoX14));
	posicaoMaximoX15 = ajustePosicaoHeatmapSerie4(arrayValorMedioLinhaX15.indexOf(maximoX15));
	posicaoMaximoX16 = ajustePosicaoHeatmapSerie4(arrayValorMedioLinhaX16.indexOf(maximoX16));
	posicaoMaximoX17 = ajustePosicaoHeatmapSerie4(arrayValorMedioLinhaX17.indexOf(maximoX17));
	posicaoMaximoX18 = ajustePosicaoHeatmapSerie4(arrayValorMedioLinhaX18.indexOf(maximoX18));
	posicaoMaximoX19 = ajustePosicaoHeatmapSerie4(arrayValorMedioLinhaX19.indexOf(maximoX19));
	posicaoMaximoX20 = ajustePosicaoHeatmapSerie4(arrayValorMedioLinhaX20.indexOf(maximoX20));
	posicaoMaximoX21 = ajustePosicaoHeatmapSerie4(arrayValorMedioLinhaX21.indexOf(maximoX21));
	posicaoMaximoX22 = ajustePosicaoHeatmapSerie4(arrayValorMedioLinhaX22.indexOf(maximoX22));
	posicaoMaximoX23 = ajustePosicaoHeatmapSerie4(arrayValorMedioLinhaX23.indexOf(maximoX23));
	posicaoMaximoX24 = ajustePosicaoHeatmapSerie4(arrayValorMedioLinhaX24.indexOf(maximoX24));

	heatmapcolor.series[3].data=[
								[posicaoMinimoX1,0],[posicaoMinimoX2,1],[posicaoMinimoX3,2],[posicaoMinimoX4,3],
								[posicaoMinimoX5,4],[posicaoMinimoX6,5],[posicaoMinimoX7,6],[posicaoMinimoX8,7],
								[posicaoMinimoX9,8],[posicaoMinimoX10,9],[posicaoMinimoX11,10],[posicaoMinimoX12,11],
								[posicaoMinimoX13,12],[posicaoMinimoX14,13],[posicaoMinimoX15,14],[posicaoMinimoX16,15],
								[posicaoMinimoX17,16],[posicaoMinimoX18,17],[posicaoMinimoX19,18],[posicaoMinimoX20,19],
								[posicaoMinimoX21,20],[posicaoMinimoX22,21],[posicaoMinimoX23,22],[posicaoMinimoX24,23],
								];


	heatmapcolor.series[4].data=[
								[posicaoMaximoX1,0],[posicaoMaximoX2,1],[posicaoMaximoX3,2],[posicaoMaximoX4,3],
								[posicaoMaximoX5,4],[posicaoMaximoX6,5],[posicaoMaximoX7,6],[posicaoMaximoX8,7],
								[posicaoMaximoX9,8],[posicaoMaximoX10,9],[posicaoMaximoX11,10],[posicaoMaximoX12,11],
								[posicaoMaximoX13,12],[posicaoMaximoX14,13],[posicaoMaximoX15,14],[posicaoMaximoX16,15],
								[posicaoMaximoX17,16],[posicaoMaximoX18,17],[posicaoMaximoX19,18],[posicaoMaximoX20,19],
								[posicaoMaximoX21,20],[posicaoMaximoX22,21],[posicaoMaximoX23,22],[posicaoMaximoX24,23],
								];
}

function carregaGraficoDias(valores){
	dias = {
		chart: {
			renderTo: 'area-conjunto-x1',
			type: 'line',
			inverted: true
		},
		title: {
			text: ''
		},
		subtitle: {
			text: ''
		},
		legend: {
			layout: 'vertical',
			align: 'left',
			verticalAlign: 'top',
			x: 0,
			y: 25,
			floating: true,
			borderWidth: 1,
			backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
		},
		yAxis: {
			labels: {
				format: '{value}h', //:00
				rotation: -60
			},
			title: {
				text: 'Schedule'
			},
			minPadding: 0,
			maxPadding: 0,
			startOnTick: false,
			endOnTick: false,
			tickPositions: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
			tickWidth: 1,
			min: 0,
			max: 23
		},
		xAxis: {
			title: {
				text: 'Consumption'
			}
		},
		tooltip: {
			shared: true
		},
		credits: {
			enabled: false
		},
		plotOptions: {
			areaspline: {
				fillOpacity: 0.5
			},
			series: {
                allowPointSelect: true
            }
		},
		series: [{
			name: "Consumption",
			data: []
		}],
		navigation: {
			buttonOptions: {
				enabled: false
			}
		},
		responsive: {
			rules: [{
				condition: {
					maxWidth: "100%",
					maxHeight: "100%"
				}
			}]
		},
		legend: {
			text:null
		}
	};
}

function carregaGraficoHoras(){
	horas = {
		chart: {
			renderTo: 'area-conjunto-y1',
			type: 'line'
		},
		title: {
			text: ''
		},
		subtitle: {
			text: ''
		},
		legend: {
			layout: 'vertical',
			align: 'left',
			verticalAlign: 'top',
			x: 0,
			y: 25,
			floating: true,
			borderWidth: 1,
			backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
		},
		xAxis: {
			categories: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
			title: {
				text: 'Schedule'
			},
		},
		yAxis: {
			title: {
				text: 'Consumption'
			}
		},
		tooltip: {
			formatter: function () {
				return 'Consumption <b>' + this.y + '</b>';
			}
		},
		credits: {
			enabled: false
		},
		plotOptions: {
			areaspline: {
				fillOpacity: 0.5
			}
		},
		series: [{
			name: "Consumption",
			data:  [null, null, null, null, null, null, null]
		}],
		navigation: {
			buttonOptions: {
				enabled: false
			}
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
		},
		legend: {
			text:null
		}
	};
}

function carregaRelogioManha(){
	relogio_manha = {
		chart: {
			renderTo: 'relogio-manha',
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			type: 'pie'
		},
		title: {
			text: null
		},
		subtitle:{
			text: "<b>Consumption between 0 and 11 hours</b>" 
		},
		tooltip: {
            pointFormat: '{series.value}<b>{point.value} consumption</b>'
        },
        plotOptions: {
            pie: {
				startAngle: -14,
				allowPointSelect: true,
				cursor: 'pointer',
				borderWidth: 0.3,
				borderColor: '#000000',
				dataLabels: {
					enabled: true,
					//format: '<b>{point.value}</b>',
					distance: -50,
					filter: {
						operator: '>',
						value: 4
					}
				},
				size: '75%',
                cursor: 'pointer',
                data: [null,null,null,null,null,null,null,null,null,null,null]
            }
        },
        series: [{
            type: 'pie',
            dataLabels: {
                verticalAlign: 'top',
                enabled: true,
                color: '#000000',
                connectorWidth: 1,
                distance: -30,
                connectorColor: '#000000',
                formatter: function () {
                    return this.point.value; //texto dentro da celula
                }
            }
        }, {
            type: 'pie',
            dataLabels: {
                enabled: true,
                color: '#000000',
                connectorWidth: 1,
                distance: 30,
                connectorColor: '#000000',
                formatter: function () {
					var texto = this.point.name;
                    return '<b>' + texto.replace("hours", "<br>Hours");
                }
            }
        }],
        exporting: {
            enabled: false
        },
        credits: {
            enabled: false
        }
	}
}

function carregaRelogioTarde(){
	relogio_tarde = {
		chart: {
			renderTo: 'relogio-tarde',
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			type: 'pie'
		},
		title: {
			text: null
		},
		subtitle:{
			text: "<b>Consumption between 12 and 23 hours</b>" 
		},
		tooltip: {
            pointFormat: '{series.value}<b>{point.value} consumption</b>'
        },
        plotOptions: {
            pie: {
				startAngle: -14,
				allowPointSelect: true,
				cursor: 'pointer',
				borderWidth: 0.3,
				borderColor: '#000000',
				dataLabels: {
					enabled: true,
					//format: '<b>{point.value}</b>',
					distance: -50,
					filter: {
						operator: '>',
						value: 4
					}
				},
				size: '75%',
                cursor: 'pointer',
                data: [null,null,null,null,null,null,null,null,null,null,null]
            }
        },
        series: [{
            type: 'pie',
            dataLabels: {
                verticalAlign: 'top',
                enabled: true,
                color: '#000000',
                connectorWidth: 1,
                distance: -30,
                connectorColor: '#000000',
                formatter: function () {
                    return this.point.value; //texto dentro da celula
                }
            }
        }, {
            type: 'pie',
            dataLabels: {
                enabled: true,
                color: '#000000',
                connectorWidth: 1,
                distance: 30,
                connectorColor: '#000000',
                formatter: function () {
					var texto = this.point.name;
                    return '<b>' + texto.replace("horas", "<br>horas");
                }
            }
        }],
        exporting: {
            enabled: false
        },
        credits: {
            enabled: false
        }
	}
}

function getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    // Return array of year and week number
    return [d.getUTCFullYear(), weekNo];
}

function getLoadDatas(code) {
	
	return lista_datas.filter(
		function(lista_datas){
			if (lista_datas[0] == code){
				return lista_datas;
			}	
		}
	);
}

function getEstadoInicial(data, hora) {
	
	return dados_dense_estado_inicial.filter(
		function(valores){
			if (valores[0] == data && valores[1] == hora){
				console.log("getEstadoInicial", dados_dense_estado_inicial[2]);
				return dados_dense_estado_inicial[2];
			}	
		}
	);
}

function formatarData(data){
	var split = data.split("-");
	return split[2]+"/"+split[1]+"/"+split[0];
}

function formatarDataEn(data){
	var split = data.split("/");
	var dia = split[0];
	var mes = split[1];
	
	/*if (mes < 10) {
		mes = "0" + mes;
	}
	
	if (dia < 10) {
		dia = "0" + dia;
	}*/
	
	return split[2]+"-"+mes+"-"+dia;
}

function ajustePosicaoHeatmapSerie3(valor){
	if (parseInt(valor) == 6){
		valor -= 0.3;
	}
	else {
		valor += 0.3;
	}
	
	return valor;
}

function ajustePosicaoHeatmapSerie4(valor){
	if (parseInt(valor) == 6){
		valor -= 0.2;
	}
	else {
		valor += 0.2;
	}
	
	return valor;
}

function retornaDiaDaSemana(diaUTC) {
    var weekday = [];
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    return weekday[diaUTC];
}

function retornaTotalDiasPorMes(mes, ano){
	switch (mes) {
		case "01":
			return 31;
			break;	
		case "02":
			return 28;
			break;	
		case "03":
			return 31;
			break;
		case "04":
			return 30;
			break;
		case "05":
			return 31;
			break;
		case "06":
			return 30;
			break;
		case "07":
			return 31;
			break;
		case "08":
			return 30;
			break;
		case "09":
			return 31;
			break;
		case "10":
			return 31;
			break;
		case "11":
			return 30;
			break;
		case "12":
			return 31;
			break;
	}
}

function retornaInicioPorMes(mes, ano){
	var lista = [];
	switch (mes) {
		case "01":
			lista.push(0,30);
			return lista;
			break;	
		case "02":
			lista.push(31,58);
			return lista;
			break;	
		case "03":
			lista.push(59,89);
			return lista;
		case "04":
			lista.push(90,119);
			return lista;
		case "05":
			lista.push(120,150);
			return lista;
		case "06":
			lista.push(151,180);
			return lista;
			break;
		case "07":
			lista.push(181,211);
			return lista;
			break;
		case "08":
			lista.push(212,242);
			return lista;
			break;
		case "09":
			lista.push(243,272);
			return lista;
			break;
		case "10":
			lista.push(273,303);
			return lista;
		case "11":
			lista.push(304,333);
			return lista;
			break;
		case "12":
			lista.push(334,364);
			return lista;
			break;
	}
}

function evitaUndefined(lista, diaDaSemana, hora){
	if (typeof lista[diaDaSemana] === 'undefined') {
		lista[diaDaSemana] = [];
	}
	
	if (typeof lista[diaDaSemana][hora] === 'undefined') {
		lista[diaDaSemana][hora] = [];
	}
	
	return lista;
}

function mediana(values){
	values.sort(function(a,b){
		return a-b;
	});
	var half = Math.floor(values.length / 2);
  
	if (values.length % 2)
		return values[half];
	else
		return (values[half - 1] + values[half]) / 2.0;
}

function moda(numbers) {
    // as result can be bimodal or multi-modal,
    // the returned result is provided as an array
    // mode of [3, 5, 4, 4, 1, 1, 2, 3] = [1, 3, 4]
    var modes = [], count = [], i, number, maxIndex = 0;
 
    for (i = 0; i < numbers.length; i += 1) {
        number = numbers[i];
        count[number] = (count[number] || 0) + 1;
        if (count[number] > maxIndex) {
            maxIndex = count[number];
        }
    }
 
    for (i in count)
        if (count.hasOwnProperty(i)) {
            if (count[i] === maxIndex) {
                modes.push(Number(i));
            }
        }
 
    return modes;
}

function retornaSoma(array){
	return array.reduce(function(a,b){
		return a + b
	  }, 0);
}

function retornaMedia(array) {
	return array.reduce((a,b) => a + b, 0) / array.length;
}

function retornaVariancia(array) {
	var media = retornaMedia(array);
	var valor = retornaMedia(array.map(function(num) {
		return Math.pow(num - media, 2);
	}));
	return valor;
}

function retornaDesvioPadrao(array) {
	return Math.sqrt(retornaVariancia(array));
}

function retornaMediaGeometrica(lista){
	return Math.pow(lista.reduce( (a,b) => a * b ), 1/lista.length);
}

function round(valor){
	var str = valor.toFixed(2); 
	var number = Number(str);
	return number;
}

function retornaMediaHarmonica(lista){
	var resultado = 0;

	for(i=0; i<lista.length; i++){
		resultado = resultado + (1 / lista[i]);
	}

	return lista.length / resultado;
}

function retornaErroPadrao(lista, desvioPadrao){
	var tamanhoAmostra = lista.length;
	var raizQuadrada = Math.sqrt(tamanhoAmostra);
	return desvioPadrao / raizQuadrada;
}

function verificaAnoBissexto(ano){
    return ((ano % 4 == 0) && (ano % 100 != 0)) || (ano % 400 == 0);
}