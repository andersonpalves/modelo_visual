var boxplot = Highcharts.chart('container', {

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