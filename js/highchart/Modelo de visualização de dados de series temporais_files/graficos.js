$( document ).ready(function() {

	$('#area-conjunto-x1-coluna').click(function () {
		var areax = $("#area-conjunto-x1").highcharts();
		areax.update({
			chart: {
				type: 'column',
				inverted: true,
				polar: false
			}
		});
	});

	$('#area-conjunto-x1-polar').click(function () {
		var areax = $("#area-conjunto-x1").highcharts();
		areax.update({
			chart: {
				type: '',
				inverted: false,
				polar: true
			}
		});
	});	
	
	$('#area-conjunto-x1-plot').click(function () {
		var areax = $("#area-conjunto-x1").highcharts();
		areax.update({
			chart: {
				type: 'scatter',
				inverted: true,
				polar: false
			}
		});
	});
	
	$('#area-conjunto-x1-area').click(function () {
		var areax = $("#area-conjunto-x1").highcharts();
		areax.update({
			chart: {
				type: 'area',
				inverted: true,
				polar: false
			}
		});
	});
	
	$('#area-conjunto-x1-linha').click(function () {
		var areax = $("#area-conjunto-x1").highcharts();
		areax.update({
			chart: {
				type: 'line',
				inverted: true,
				polar: false
			}
		});
	});

	$('#area-conjunto-x1-pizza').click(function () {
		var areax = $("#area-conjunto-x1").highcharts();
		areax.update({
			chart: {
				type: 'pie',
				inverted: true,
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
				inverted: true,
				polar: false
			}
		});
	});

	$('#area-conjunto-y1-polar').click(function () {
		var areay = $("#area-conjunto-y1").highcharts();
		areay.update({
			chart: {
				type: '',
				inverted: false,
				polar: true
			}
		});
	});	
	
	$('#area-conjunto-y1-plot').click(function () {
		var areax = $("#area-conjunto-y1").highcharts();
		areax.update({
			chart: {
				type: 'scatter',
				inverted: true,
				polar: false
			}
		});
	});
	
	$('#area-conjunto-y1-area').click(function () {
		var areax = $("#area-conjunto-y1").highcharts();
		areax.update({
			chart: {
				type: 'area',
				inverted: true,
				polar: false
			}
		});
	});
	
	$('#area-conjunto-y1-linha').click(function () {
		var areax = $("#area-conjunto-y1").highcharts();
		areax.update({
			chart: {
				type: 'line',
				inverted: true,
				polar: false
			}
		});
	});

	$('#area-conjunto-y1-pizza').click(function () {
		var areax = $("#area-conjunto-y1").highcharts();
		areax.update({
			chart: {
				type: 'pie',
				inverted: true,
				polar: false
			}
		});
	});

});