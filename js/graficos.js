$( document ).ready(function() {
	$('#area-x-plain').click(function () {
		console.log('1');
		var areax = $("#area-x").highcharts();
		areax.update({
			chart: {
				inverted: false,
				polar: false
			}
		});
	});

	$('#area-x-inverted').click(function () {
		var areax = $("#area-x").highcharts();
		areax.update({
			chart: {
				inverted: true,
				polar: false
			}
		});
	});

	$('#area-x-polar').click(function () {
		var areax = $("#area-x").highcharts();
		areax.update({
			chart: {
				inverted: false,
				polar: true
			}
		});
	});
	
	$('#area-y-plain').click(function () {
		var areay = $("#area-y").highcharts();
		areay.update({
			chart: {
				inverted: false,
				polar: false
			}
		});
	});

	$('#area-y-inverted').click(function () {
		var areay = $("#area-y").highcharts();
		areay.update({
			chart: {
				inverted: true,
				polar: false
			}
		});
	});

	$('#area-y-polar').click(function () {
		var areay = $("#area-y").highcharts();
		areay.update({
			chart: {
				inverted: false,
				polar: true
			}
		});
	});
});