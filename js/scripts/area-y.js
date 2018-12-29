function abreGraficoHoras(grafico, pontos, pontosMinimos, pontosMaximos, pontosMediana, pontosMedios, valorDesvioPadrao, valorVariancia, valorErroPadrao){
	
	console.log("pontos Y", pontos)

	$("#" + grafico).show();
	$("#botoes-" + grafico).show();
	
	var horas = {
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
			categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fry', 'Sat', 'Sun'],
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

				var text = '<b>' + this.y + ' Consumption<br>';

				if (this.series.name == "Consumption") {
					text += '<b>'+ valorVariancia + ' Variance<br>';
					text += '<b>'+ valorDesvioPadrao + ' Std. deviation<br>';
					text += '<b>'+ valorErroPadrao + ' Std. Error<br>';
				}

				return text;
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
		series: [
			{
				name: "Consumption",
				data:  pontos,
				color: "#008000",
				marker: {
					symbol: 'circle',
					radius: 6,
				}
			},
			{
				name: "Min.",
				data:  pontosMinimos,
				color: "#3060cf",
				marker: {
					symbol: 'triangle-down',
					radius: 6
				}
			},
			{
				name: "AVG",
				data:  pontosMedios,
				color: "#ffd700",
				marker: {
					symbol: 'diamond',
					radius: 6
				}
			},
			{
				name: "Median",
				data:  pontosMediana,
				color: "#FD6A02",
				marker: {
					symbol: 'diamond',
					radius: 6
				}
			},
			{
				name: "Max.",
				data:  pontosMaximos,
				color: "#d1473a",
				marker: {
					symbol: 'triangle',
					radius: 6
				}
			}
		],
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