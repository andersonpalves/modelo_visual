function abreGraficoHoras(grafico, pontos, hora, cor, semana_selecionada){
	
	$("#" + grafico).show();
	$("#botoes-" + grafico).show();
	
	var horas = {
		chart: {
			renderTo: 'area-conjunto-y1',
			type: 'line',
			inverted: true
		},
		/*title: {
			text: 'Consumo das <b>' + hora + '</b> horas durante a semana <b>' + semana_selecionada
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
			categories: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
			title: {
				text: 'Horário'
			},
		},
		yAxis: {
			title: {
				text: 'Consumo'
			}
		},
		/*tooltip: {
			headerFormat: null,
			pointFormat: '{series.value}<b>{point.value} consumo</b>'
		},*/
		tooltip: {
			formatter: function () {
				return 'Consumo <b>' + this.y + '</b>';
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
			name: "Consumo",
			data: pontos,
			color: cor
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
	
	chart_horas = new Highcharts.Chart(horas);
}