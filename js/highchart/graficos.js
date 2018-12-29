$( document ).ready(function() {
	
	$('#area-x-plain').click(function () {
		var areax = $("#area-x").highcharts();
		areax.update({
			chart: {
				type: 'column',
				inverted: false,
				polar: false
			}
		});
	});

	$('#area-x-inverted').click(function () {
		var areax = $("#area-x").highcharts();
		areax.update({
			chart: {
				type: 'bar',
				inverted: true,
				polar: false
			}
		});
	});
	
	$('#area-x-polar').click(function () {
		var areax = $("#area-x").highcharts();
		areax.update({
			chart: {
				type: '',
				inverted: false,
				polar: true
			}
		});
	});

	$('#area-x-plot').click(function () {
		var areax = $("#area-x").highcharts();
		areax.update({
			chart: {
				type: 'scatter',
				inverted: false,
				polar: false
			}
		});
	});
	
	$('#area-x-area').click(function () {
		var areax = $("#area-x").highcharts();
		areax.update({
			chart: {
				type: 'area',
				inverted: false,
				polar: false
			}
		});
	});
	
	$('#area-x-linha').click(function () {
		var areax = $("#area-x").highcharts();
		areax.update({
			chart: {
				type: 'line',
				inverted: false,
				polar: false
			}
		});
	});

//---------------------------------------------------------------------------------------------------------------------------------------		
		
	$('#area-y-plain').click(function () {
		var areay = $("#area-y").highcharts();
		areay.update({
			chart: {
				type: 'column',
				inverted: false,
				polar: false
			}
		});
	});

	$('#area-y-inverted').click(function () {
		var areay = $("#area-y").highcharts();
		areay.update({
			chart: {
				type: 'bar',
				inverted: true,
				polar: false
			}
		});
	});

	$('#area-y-polar').click(function () {
		var areay = $("#area-y").highcharts();
		areay.update({
			chart: {
				type: '',
				inverted: false,
				polar: true
			}
		});
	});
	
	$('#area-y-plot').click(function () {
		var areax = $("#area-y").highcharts();
		areax.update({
			chart: {
				type: 'scatter',
				inverted: false,
				polar: false
			}
		});
	});
	
	$('#area-y-area').click(function () {
		var areax = $("#area-y").highcharts();
		areax.update({
			chart: {
				type: 'area',
				inverted: false,
				polar: false
			}
		});
	});
	
	$('#area-y-linha').click(function () {
		var areax = $("#area-y").highcharts();
		areax.update({
			chart: {
				type: 'line',
				inverted: false,
				polar: false
			}
		});
	});
	
//---------------------------------------------------------------------------------------------------------------------------------------

	$('#area-conjunto-x1-plain').click(function () {
		var areax = $("#area-conjunto-x1").highcharts();
		areax.update({
			chart: {
				type: 'column',
				inverted: false,
				polar: false
			}
		});
	});

	$('#area-conjunto-x1-inverted').click(function () {
		var areax = $("#area-conjunto-x1").highcharts();
		areax.update({
			chart: {
				type: 'bar',
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
				inverted: false,
				polar: false
			}
		});
	});
	
	$('#area-conjunto-x1-area').click(function () {
		var areax = $("#area-conjunto-x1").highcharts();
		areax.update({
			chart: {
				type: 'area',
				inverted: false,
				polar: false
			}
		});
	});
	
	$('#area-conjunto-x1-linha').click(function () {
		var areax = $("#area-conjunto-x1").highcharts();
		areax.update({
			chart: {
				type: 'line',
				inverted: false,
				polar: false
			}
		});
	});
	
//---------------------------------------------------------------------------------------------------------------------------------------	
	
	$('#area-conjunto-y1-plain').click(function () {
		var areay = $("#area-conjunto-y1").highcharts();
		areay.update({
			chart: {
				type: 'column',
				inverted: false,
				polar: false
			}
		});
	});

	$('#area-conjunto-y1-inverted').click(function () {
		var areay = $("#area-conjunto-y1").highcharts();
		areay.update({
			chart: {
				type: 'bar',
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
				inverted: false,
				polar: false
			}
		});
	});
	
	$('#area-conjunto-y1-area').click(function () {
		var areax = $("#area-conjunto-y1").highcharts();
		areax.update({
			chart: {
				type: 'area',
				inverted: false,
				polar: false
			}
		});
	});
	
	$('#area-conjunto-y1-linha').click(function () {
		var areax = $("#area-conjunto-y1").highcharts();
		areax.update({
			chart: {
				type: 'line',
				inverted: false,
				polar: false
			}
		});
	});

});