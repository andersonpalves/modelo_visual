function abreGraficoDias(grafico, pontos, dia, cor){

	$("#" + grafico).show();
	$("#botoes-" + grafico).show();

	var dias = {
		chart: {
			renderTo: 'area-conjunto-x1',
			type: 'area',
			inverted: true
		},
		/*title: {
			text: 'Consumo no dia <b>' + dia
		},
		subtitle:{
			text: 'Energia selecionada: <b>' + $('#energia option:selected').text() + '</b> - Consumo máximo: <b>' +  parseInt(maxDenseDisplay)
		},*/
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
			labels: {
				format: '{value}h' //:00
			},
			title: {
				text: 'Horário'
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
		yAxis: {
			title: {
				text: 'Consumo'
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
			name: "Consumo",
			data:  pontos,
			color: cor
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
	pontos = [];
	
	chart_dias = new Highcharts.Chart(dias);
}