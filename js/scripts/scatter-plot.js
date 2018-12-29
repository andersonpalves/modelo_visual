Highcharts.chart('scatter-plot', {
	chart: {
        type: 'scatter',
        zoomType: 'xy'
    },
    title: {
        text: 'Média de consumo energético por horas'
    },
    xAxis: {
        title: {
            enabled: true,
            text: 'Horário da semana'
        },
        startOnTick: true,
        endOnTick: true,
        showLastLabel: true,
		categories: heatmapcolor.xAxis[0].categories
    },
    yAxis: {
        title: {
            text: 'Voltagem consumida'
        }
    },
    legend: {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'top',
        x: 100,
        y: 70,
        floating: true,
        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
        borderWidth: 1
    },
    plotOptions: {
        scatter: {
            marker: {
                radius: 5,
                states: {
                    hover: {
                        enabled: true,
                        lineColor: 'rgb(100,100,100)'
                    }
                }
            },
            states: {
                hover: {
                    marker: {
                        enabled: false
                    }
                }
            },
            tooltip: {
                headerFormat: '<b>{series.name}</b><br>',
                pointFormat: '{point.x} cm, {point.y} kg'
            }
        }
    },
    series: [{
        name: 'Female',
        color: 'rgba(223, 83, 83, .5)',
        data: [
		  [0, 10],
		  [1, 20],
		  [2, 30],
		]

    }]
});