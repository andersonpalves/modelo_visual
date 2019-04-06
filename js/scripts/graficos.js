$( document ).ready(function() {

	$('#area-conjunto-x1-coluna').click(function () {
		var areax = $("#area-conjunto-x1").highcharts();
		areax.update({
			chart: {
				type: 'column',
				polar: false
			}
		});
	});

	$('#area-conjunto-x1-polar').click(function () {
		var areax = $("#area-conjunto-x1").highcharts();
		areax.update({
			chart: {
				type: '',
				polar: true
			}
		});
	});	
	
	$('#area-conjunto-x1-plot').click(function () {
		var areax = $("#area-conjunto-x1").highcharts();
		areax.update({
			chart: {
				type: 'scatter',
				polar: false
			}
		});
	});
	
	$('#area-conjunto-x1-area').click(function () {
		var areax = $("#area-conjunto-x1").highcharts();
		areax.update({
			chart: {
				type: 'area',
				polar: false
			}
		});
	});
	
	$('#area-conjunto-x1-linha').click(function () {
		var areax = $("#area-conjunto-x1").highcharts();
		areax.update({
			chart: {
				type: 'line',
				polar: false
			}
		});
	});

	$('#area-conjunto-x1-pizza').click(function () {
		var areax = $("#area-conjunto-x1").highcharts();
		areax.update({
			chart: {
				type: 'pie',
				polar: false
			}
		});
	});
	
//---------------------------------------------------------------------------------------------------------------------------------------	
	
	$('#area-conjunto-y1-coluna').click(function () {
		var areay = $("#area-conjunto-y1").highcharts();
		areay.update({
			chart: {
				type: 'column',
				polar: false
			}
		});
	});

	$('#area-conjunto-y1-polar').click(function () {
		var areay = $("#area-conjunto-y1").highcharts();
		areay.update({
			chart: {
				type: '',
				polar: true
			}
		});
	});	
	
	$('#area-conjunto-y1-plot').click(function () {
		var areax = $("#area-conjunto-y1").highcharts();
		areax.update({
			chart: {
				type: 'scatter',
				polar: false
			}
		});
	});
	
	$('#area-conjunto-y1-area').click(function () {
		var areax = $("#area-conjunto-y1").highcharts();
		areax.update({
			chart: {
				type: 'area',
				polar: false
			}
		});
	});
	
	$('#area-conjunto-y1-linha').click(function () {
		var areax = $("#area-conjunto-y1").highcharts();

		var boxplot = Highcharts.chart('area-conjunto-y1', {

			chart: {
				type: 'boxplot'
			},
		
			title: {
				text: 'Highcharts Box Plot Example'
			},
		
			legend: {
				enabled: false
			},
		
			xAxis: {
				categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fry', 'Sat', 'Sun'],
				title: {
					text: 'Experiment No.'
				}
			},
		
			yAxis: {
				title: {
					text: 'Observations'
				}
			},
		
			series: [{
				name: 'Observations',
				data: [
					[760, 801, 848, 895, 965],
					[733, 853, 939, 980, 1080],
					[714, 762, 817, 870, 918],
					[724, 802, 806, 871, 950],
					[834, 836, 864, 882, 910],
					[834, 836, 864, 882, 910],
					[834, 836, 864, 882, 910]
				],
				tooltip: {
				   // series: q, low: 834, q1: 836, median: 864, q3: 882, …}
					headerFormat: '<em>Experiment No {point.key}</em><br/>',
					pointFormat: '{point.low}, {point.q1}, {point.median}, {point.q3}, {point.high} '
				}
			}]
		
		});
		chart_horas = new Highcharts.Chart(boxplot);
	});

	$('#area-conjunto-y1-pizza').click(function () {
		var areax = $("#area-conjunto-y1").highcharts();
		areax.update({
			chart: {
				type: 'pie',
				polar: false
			}
		});
	});

});