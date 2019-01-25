function abreAreaX(pontos, dia){
	console.log('22');
	$("#area-x").show();
	$("#botoes-area-x").show();
	
	var areax = Highcharts.chart('area-x', {
		chart: {
			type: 'area', //areaspline
			inverted: false
		},
		title: {
			text: 'Consumo energético no mesmo horário na semana'
		},
		legend: {
			layout: 'vertical',
			align: 'left',
			verticalAlign: 'top',
			x: 100,
			y: 100,
			floating: true,
			borderWidth: 1,
			backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
		},
		xAxis: {
			categories: heatmapcolor.xAxis.categories
		},
		yAxis: {
			title: {
				text: 'Voltagem'
			}
		},
		tooltip: {
			shared: true,
			valueSuffix: ' Volts'
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
			name: dia,
			data: pontos,
			color: '#DC143C'
		}]
	});
}