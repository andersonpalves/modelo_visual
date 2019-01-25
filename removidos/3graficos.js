$('#graficos').bind('mousemove touchmove touchstart', function (e) {
    var chart,
        point,
        i,
        event;

    for (i = 0; i < Highcharts.charts.length; i = i + 1) {
        chart = Highcharts.charts[i];
        event = chart.pointer.normalize(e.originalEvent); // Find coordinates within the chart
        point = chart.series[0].searchPoint(event, true); // Get the hovered point

        if (point) {
            point.highlight(e);
        }
    }
});

Highcharts.Pointer.prototype.reset = function () {
    return undefined;
};

Highcharts.Point.prototype.highlight = function (event) {
    this.onMouseOver(); // Show the hover marker
    this.series.chart.tooltip.refresh(this); // Show the tooltip
    this.series.chart.xAxis[0].drawCrosshair(event, this); // Show the crosshair
};

function syncExtremes(e) {
    var thisChart = this.chart;

    if (e.trigger !== 'syncExtremes') { // Prevent feedback loop
        Highcharts.each(Highcharts.charts, function (chart) {
            if (chart !== thisChart) {
                if (chart.xAxis[0].setExtremes) { // It is null while updating
                    chart.xAxis[0].setExtremes(e.min, e.max, undefined, false, { trigger: 'syncExtremes' });
                }
            }
        });
    }
}
	
$.getJSON("js/scripts/data.json", function (activity) {
    $.each(activity.datasets, function (i, dataset) {

        // Add X values
        dataset.data = Highcharts.map(dataset.data, function (val, j) {
            return [activity.xData[j], val];
        });

        $('<div class="chart">')
            .appendTo('#graficos')
            .highcharts({
                chart: {
                    marginLeft: 40, // Keep all charts left aligned
                    spacingTop: 20,
                    spacingBottom: 20
                },
                title: {
                    text: dataset.name,
                    align: 'left',
                    margin: 0,
                    x: 30
                },
                credits: {
                    enabled: false
                },
                legend: {
                    enabled: false
                },
                xAxis: {
                    crosshair: true,
                    events: {
                        setExtremes: syncExtremes
                    },
                    labels: {
                        format: '{value} km'
                    }
                },
                yAxis: {
                    title: {
                        text: null
                    }
                },
                tooltip: {
                    positioner: function () {
                        return {
                            x: this.chart.chartWidth - this.label.width, // right aligned
                            y: 10 // align to title
                        };
                    },
                    borderWidth: 0,
                    backgroundColor: 'none',
                    pointFormat: '{point.y}',
                    headerFormat: '',
                    shadow: false,
                    style: {
                        fontSize: '18px'
                    },
                    valueDecimals: dataset.valueDecimals
                },
                series: [{
                    data: dataset.data,
                    name: dataset.name,
                    type: dataset.type,
                    color: Highcharts.getOptions().colors[i],
                    fillOpacity: 0.3,
                    tooltip: {
                        valueSuffix: ' ' + dataset.unit
                    }
                }],
				navigation: {
					buttonOptions: {
						enabled: false
					}
				},
				credits: {
					enabled: false
				}
            });
    });
});

//Set default configuration
var highchartsOptions = Highcharts.setOptions({
  lang: {
		loading: 'Aguarde...',
		months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
		weekdays: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
		shortMonths: ['Jan', 'Feb', 'Mar', 'Abr', 'Maio', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
		exportButtonTitle: "Exportar",
		printButtonTitle: "Imprimir",
		rangeSelectorFrom: "De",
		rangeSelectorTo: "Até",
		rangeSelectorZoom: "Periodo",
		downloadPNG: 'Download imagem PNG',
		downloadJPEG: 'Download imagem JPEG',
		downloadPDF: 'Download documento PDF',
		downloadSVG: 'Download imagem SVG',
		resetZoom: "Reset",
		resetZoomTitle: "Reset",
		thousandsSep: ".",
		decimalPoint: ','
  }
});