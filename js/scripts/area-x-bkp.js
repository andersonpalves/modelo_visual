function abreGraficoDias(grafico, pontos, pontosMinimos, pontosMedios, pontosMaximos, dia){
	
	$("#" + grafico).show();
	$("#botoes-" + grafico).show();

	var dias = {
		chart: {
			renderTo: 'area-conjunto-x1',
			type: 'area',
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
		xAxis: {
			labels: {
				format: '{value}h' //:00
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
		yAxis: {
			title: {
				text: 'Consumption'
			}
		},
		tooltip: {
			formatter: function () {
				return '<b>'+this.x +':00h ' + this.y + ' Consumption';
			}
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
				name: "Min",
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
				name: "Max",
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