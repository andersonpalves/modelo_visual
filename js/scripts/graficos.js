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
		areax.update({
			chart: {
				type: 'line',
				polar: false
			}
		});
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