
var heatmapcolor = {
	chart: {
		renderTo: 'heatmap-color',
		type: 'heatmap',
		height: 360,
		marginTop: 0
	},
	title: {
		text: ''
	},
	subtitle: {
		text: ''
	},
	yAxis: {
		labels: {
			format: '{value}h'//:00
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
			text: 'Horário'
		},
	},
	xAxis: {
		categories: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
		opposite: false,
		labels: {
            rotation: 0
        },
		title: {
			text: 'Consumo'
		}
	},
	colorAxis: {
		stops: [
			[0, '#3060cf'],
			[0.5, '#fffbbc'],
			[0.9, '#c4463a'],
			[1, '#c4463a']
		],
		min: 0,
		max:  parseInt(maxDenseDisplay)
	},
	legend: {
		align: 'center',
		layout: 'horizontal',
		verticalAlign: 'bottom',
		borderWidth: 1,
		width: '100%',
		floating: false,
		x: -35,
		enabled: true,
		itemStyle: {
			textAlign: 'right',
		}
	},
	series: [{
				cursor: 'pointer',
				name: 'Consumo energético por dias na semana',
				borderWidth: 0.5,
				borderColor: '#000',
				keys: ['x', 'y', 'value'],
				data: [],
				dataLabels: {
					enabled: false,
					color: 'black',
					style: {
						fontWeight: 'bold',
						fontSize: '10px'
					}
				}
			},
			{
				type: 'scatter',
				name: 'Menor<br>Consumo<br>Diário',
				color: '#FF1493',
				data: [],
				marker: {
					symbol: 'triangle-down',
					lineWidth: 0, //changed
					radius: 6,
					lineColor: '#FF1493',
					fillColor: '#FF1493' //white
				},
				visible: false,
			},
			{
				type: 'scatter',
				name: 'Maior<br>Consumo<br>Horas',
				color: '#006400',
				data: [],
				marker: {
					symbol: 'triangle',
					lineWidth: 0,
					radius: 6,
					lineColor: '#006400',
					fillColor: '#006400' //white
				},
				visible: false,
			},
			{
				type: 'scatter',
				name: 'Menor<br>Consumo<br>Horas',
				color: 'brown',
				data: [],
				lineWidth: 0,
				marker: {
					symbol: 'triangle-down',
					lineWidth: 0,
					radius: 6,
					lineColor: 'brown',
					fillColor: 'brown',
				},
				visible: false,
			},
			{
				type: 'scatter',
				name: 'Maior<br>Consumo<br>Horas',
				color: '#2F4F4F',
				data: [],
				lineWidth: 0,
				marker: {
					symbol: 'triangle',
					lineWidth: 0,
					radius: 6,
					lineColor: '#2F4F4F',
					fillColor: 'black',
					
				},
				visible: false
			}],
	plotOptions: {
		series: {
			events: {
				click: function (e) {
					
					var data = e.point.series.xAxis.categories[e.point.options.x];
					
					if(chart_heatmap_color.chartWidth == "1300"){
						$("#panel-fullscreen-heatmap").click();
					}

					abreGraficos(e.point, e, semana_selecionada, data);					
					
					$('#graficos').show();
					$(".grupo").show();
				}
			}
		}
	},	
	tooltip: {
		formatter: function () {
			var valor = this.series.xAxis.categories[this.point.x];

			if (typeof valor == "undefined") {
				var ponto = String(this.point.x);
				var valor_ponto = ponto.substring(0, 1);
				return '<b>' + this.series.xAxis.categories[valor_ponto] + ', '+ this.point.y + ':00 horas </b>';
			}
			else {
				return '<b>' + this.series.xAxis.categories[this.point.x] + ', '+ this.point.y + ':00 horas - ' + this.point.value + ' Valor</b>';
			}
		},
		followPointer: true
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
}

function abreGraficos(ponto, e, semana_selecionada, data){

	var arrayValoresX = [], arrayValoresY = [], arrayPieManha = [], arrayPieTarde = [];
	var conjuntoValoresX1 = [], conjuntoValoresX2 = [], conjuntoValoresX3 = [], conjuntoValoresX4 = [], conjuntoValoresX5 = [];
	var conjuntoValoresY1 = [], conjuntoValoresY2 = [], conjuntoValoresY3 = [], conjuntoValoresY4 = [], conjuntoValoresY5 = [];
	var cor1 = '#008000', cor2 = '#0094C2', cor3 = '#B55E90';
	var mediaX= 0, mediaY = 0, total = ponto.x * 24;

	for(var i=0; i<=6; i++){
		var objeto = { 
				"name": i + ":00 horas",
				"y" : parseInt(heatmapcolor.series[0].data[(24 * i) + ponto.y][2])
			}
		arrayValoresY.push(objeto);
	}

	for(var z=0; z<=23; z++){
		var objeto = { 
			"name": z + ":00 horas",
			"y" : parseInt(heatmapcolor.series[0].data[z+total][2])
		}
		arrayValoresX.push(objeto);
	}
	
	// Valores para o relogio
	for(var x=0; x<=23; x++){
		var valor = parseInt(heatmapcolor.series[0].data[x+total][2]);
		var objeto = { 
				"name": x + "h",
				"y" : 12.5,
				"value" : valor,
				"color": selecionaCorDaFatia(valor)
			}
		
		if(x <= 11){
			arrayPieManha.push(objeto);
		}
		else{
			arrayPieTarde.push(objeto);
		}
	}

	//var dia = formatarData(lista_dias[ponto.x]);
	var hora = ponto.y;
    var res = data.split("<br><b>", 2);
	var dia_semana =  res[0];
	var dia =  res[1];
	
	$("#diasHorasTexto").html("Dias / Horas  - Dia selecionado: <b>" + dia +" </b> - <b>" + dia_semana + " </b> - Hora selecionada: <b>" + hora + "</b> Horas");
	
	abreGraficoDias("area-conjunto-x1", arrayValoresX, dia, cor2);
	abreGraficoHoras("area-conjunto-y1", arrayValoresY, hora, cor1, semana_selecionada);
	abreRelogioManha(arrayPieManha, dia, dia_semana);
	abreRelogioTarde(arrayPieTarde, dia, dia_semana);

}

function selecionaCorDaFatia(valor){
	var total = parseInt(maxDenseDisplay)
	var calculo = (100 * valor) / total;
	valor = parseInt(calculo);
	
	var corRgb;
	
	if ((valor >= 0 ) && (valor <= 10 )) {
		corRgb = "#3060cf";
	}
	else if ((valor >= 11 ) && (valor <= 20 )) {
		corRgb = "#8cb2fe";
	}
	else if ((valor >= 21 ) && (valor <= 30 )) {
		corRgb = "#839ec7";
	}
	else if ((valor >= 31 ) && (valor <= 40 )) {
		corRgb = "#dff0f7";
	}
	else if ((valor >= 41 ) && (valor <= 50 )) {
		corRgb = "#fcf2b6"; 
	}
	else if ((valor >= 51 ) && (valor <= 60 )) {
		corRgb = "#f0ce9c";
	}
	else if ((valor >= 61 ) && (valor <= 70 )) {
		corRgb = "#e2a17b";
	}
	else if ((valor >= 71 ) && (valor <= 80 )) {
		corRgb = "#d4785e";
	}
	else if ((valor >= 81 ) && (valor <= 90 )) {
		corRgb = "#c54b3d";
	}
	else if ((valor >= 91 ) && (valor <= 100 )) {
		corRgb = "#d1473a";
	}
	return corRgb;
}