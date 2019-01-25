function abreAreaY(pontos, hora){
	$("#area-y").show();
	$("#botoes-area-y").show();
	
	var areax = Highcharts.chart('area-y', {
		chart: {
			type: 'area',
			inverted: true
		},
		title: {
			text: 's'
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
			categories: heatmapcolor.yAxis[0].categories
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
			name: hora,
			data: pontos,
			color: '#DC143C'
		}]
	});
}