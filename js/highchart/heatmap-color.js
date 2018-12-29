var heatmapcolor = Highcharts.chart('heatmap-color', {

	chart: {
		type: 'heatmap',
	},
	title: {
		text: 'Consumo energético por dias na semana'
	},
	yAxis: {
		categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
		reversed: true,
		title: null
	},
	xAxis: {
		categories: ['0a', '1a', '2am', '3a', '4a', '5a', '6a', '7a', '8a', '9a', '10a', '11a', '12p', '13p', '14p', '15p', '16p', '17p', '18p', '19p', '20p', '21p', '22p', '23p'],
		opposite: true
	},
	colorAxis: {
		min: 0,
		minColor: '#FFFFFF',
		maxColor: Highcharts.getOptions().colors[2]
	},
	series: [{
		cursor: 'pointer',
		name: 'Consumo energético por dias na semana',
		borderWidth: 1,
		borderColor: '#008000',
		dataLabels: {
			enabled: true,
			color: '#000000'
		},
		keys: ['x', 'y', 'value', 'valores'],
		data: [
				[ 0 , 0 , 74 , [ 16 , 129 , 77 ]],
				[ 0 , 1 , 56 , [ 35 , 8 , 126 ]],
				[ 0 , 2 , 121 , [ 133 , 99 , 132 ]],
				[ 0 , 3 , 60 , [ 47 , 46 , 87 ]],
				[ 0 , 4 , 76 , [ 90 , 2 , 137 ]],
				[ 0 , 5 , 98 , [ 131 , 52 , 111 ]],
				[ 0 , 6 , 90 , [ 79 , 75 , 116 ]],
				[ 1 , 0 , 67 , [ 24 , 150 , 27 ]],
				[ 1 , 1 , 77 , [ 132 , 6 , 92 ]],
				[ 1 , 2 , 81 , [ 88 , 123 , 32 ]],
				[ 1 , 3 , 87 , [ 35 , 103 , 122 ]],
				[ 1 , 4 , 71 , [ 85 , 114 , 14 ]],
				[ 1 , 5 , 106 , [ 150 , 58 , 109 ]],
				[ 1 , 6 , 71 , [ 112 , 37 , 63 ]],
				[ 2 , 0 , 80 , [ 135 , 94 , 12 ]],
				[ 2 , 1 , 47 , [ 63 , 2 , 75 ]],
				[ 2 , 2 , 101 , [ 55 , 115 , 132 ]],
				[ 2 , 3 , 116 , [ 109 , 103 , 136 ]],
				[ 2 , 4 , 24 , [ 32 , 15 , 26 ]],
				[ 2 , 5 , 36 , [ 20 , 60 , 27 ]],
				[ 2 , 6 , 42 , [ 10 , 32 , 84 ]],
				[ 3 , 0 , 107 , [ 125 , 113 , 82 ]],
				[ 3 , 1 , 52 , [ 19 , 97 , 40 ]],
				[ 3 , 2 , 77 , [ 31 , 137 , 62 ]],
				[ 3 , 3 , 51 , [ 23 , 16 , 113 ]],
				[ 3 , 4 , 82 , [ 39 , 84 , 122 ]],
				[ 3 , 5 , 58 , [ 29 , 58 , 88 ]],
				[ 3 , 6 , 43 , [ 16 , 34 , 79 ]],
				[ 4 , 0 , 87 , [ 95 , 85 , 82 ]],
				[ 4 , 1 , 62 , [ 63 , 13 , 111 ]],
				[ 4 , 2 , 61 , [ 100 , 20 , 64 ]],
				[ 4 , 3 , 81 , [ 36 , 141 , 65 ]],
				[ 4 , 4 , 83 , [ 116 , 87 , 45 ]],
				[ 4 , 5 , 92 , [ 146 , 49 , 82 ]],
				[ 4 , 6 , 75 , [ 44 , 115 , 67 ]],
				[ 5 , 0 , 49 , [ 86 , 34 , 27 ]],
				[ 5 , 1 , 103 , [ 135 , 137 , 37 ]],
				[ 5 , 2 , 46 , [ 5 , 31 , 101 ]],
				[ 5 , 3 , 63 , [ 113 , 68 , 7 ]],
				[ 5 , 4 , 105 , [ 97 , 125 , 93 ]],
				[ 5 , 5 , 73 , [ 145 , 53 , 22 ]],
				[ 5 , 6 , 109 , [ 120 , 98 , 108 ]],
				[ 6 , 0 , 47 , [ 79 , 4 , 58 ]],
				[ 6 , 1 , 53 , [ 33 , 8 , 117 ]],
				[ 6 , 2 , 60 , [ 24 , 146 , 11 ]],
				[ 6 , 3 , 73 , [ 110 , 81 , 27 ]],
				[ 6 , 4 , 81 , [ 90 , 84 , 70 ]],
				[ 6 , 5 , 31 , [ 71 , 21 , 2 ]],
				[ 6 , 6 , 113 , [ 131 , 133 , 75 ]],
				[ 7 , 0 , 86 , [ 85 , 46 , 127 ]],
				[ 7 , 1 , 79 , [ 111 , 43 , 82 ]],
				[ 7 , 2 , 91 , [ 47 , 130 , 95 ]],
				[ 7 , 3 , 115 , [ 142 , 115 , 87 ]],
				[ 7 , 4 , 99 , [ 129 , 56 , 111 ]],
				[ 7 , 5 , 62 , [ 117 , 2 , 68 ]],
				[ 7 , 6 , 49 , [ 121 , 21 , 5 ]],
				[ 8 , 0 , 56 , [ 69 , 39 , 59 ]],
				[ 8 , 1 , 100 , [ 39 , 140 , 120 ]],
				[ 8 , 2 , 84 , [ 66 , 54 , 133 ]],
				[ 8 , 3 , 67 , [ 94 , 76 , 32 ]],
				[ 8 , 4 , 46 , [ 88 , 29 , 21 ]],
				[ 8 , 5 , 77 , [ 44 , 45 , 143 ]],
				[ 8 , 6 , 86 , [ 38 , 90 , 129 ]],
				[ 9 , 0 , 93 , [ 133 , 43 , 102 ]],
				[ 9 , 1 , 119 , [ 117 , 144 , 95 ]],
				[ 9 , 2 , 60 , [ 53 , 47 , 79 ]],
				[ 9 , 3 , 52 , [ 23 , 95 , 39 ]],
				[ 9 , 4 , 37 , [ 14 , 58 , 39 ]],
				[ 9 , 5 , 124 , [ 130 , 147 , 94 ]],
				[ 9 , 6 , 80 , [ 127 , 107 , 7 ]],
				[ 10 , 0 , 89 , [ 117 , 110 , 41 ]],
				[ 10 , 1 , 59 , [ 74 , 99 , 3 ]],
				[ 10 , 2 , 67 , [ 76 , 92 , 34 ]],
				[ 10 , 3 , 83 , [ 83 , 94 , 71 ]],
				[ 10 , 4 , 53 , [ 89 , 54 , 15 ]],
				[ 10 , 5 , 93 , [ 139 , 93 , 47 ]],
				[ 10 , 6 , 62 , [ 86 , 24 , 76 ]],
				[ 11 , 0 , 70 , [ 42 , 114 , 54 ]],
				[ 11 , 1 , 66 , [ 3 , 83 , 113 ]],
				[ 11 , 2 , 46 , [ 82 , 36 , 20 ]],
				[ 11 , 3 , 63 , [ 96 , 51 , 41 ]],
				[ 11 , 4 , 99 , [ 94 , 90 , 112 ]],
				[ 11 , 5 , 71 , [ 72 , 84 , 57 ]],
				[ 11 , 6 , 70 , [ 122 , 6 , 81 ]],
				[ 12 , 0 , 54 , [ 63 , 25 , 75 ]],
				[ 12 , 1 , 81 , [ 103 , 34 , 106 ]],
				[ 12 , 2 , 30 , [ 40 , 16 , 33 ]],
				[ 12 , 3 , 107 , [ 131 , 52 , 138 ]],
				[ 12 , 4 , 54 , [ 22 , 58 , 83 ]],
				[ 12 , 5 , 72 , [ 145 , 29 , 41 ]],
				[ 12 , 6 , 83 , [ 107 , 50 , 93 ]],
				[ 13 , 0 , 95 , [ 59 , 102 , 123 ]],
				[ 13 , 1 , 64 , [ 149 , 29 , 14 ]],
				[ 13 , 2 , 59 , [ 33 , 14 , 129 ]],
				[ 13 , 3 , 103 , [ 139 , 102 , 69 ]],
				[ 13 , 4 , 93 , [ 103 , 45 , 130 ]],
				[ 13 , 5 , 67 , [ 40 , 135 , 26 ]],
				[ 13 , 6 , 86 , [ 71 , 51 , 135 ]],
				[ 14 , 0 , 98 , [ 129 , 149 , 15 ]],
				[ 14 , 1 , 92 , [ 121 , 106 , 49 ]],
				[ 14 , 2 , 88 , [ 38 , 120 , 105 ]],
				[ 14 , 3 , 135 , [ 119 , 146 , 141 ]],
				[ 14 , 4 , 60 , [ 77 , 62 , 41 ]],
				[ 14 , 5 , 53 , [ 68 , 41 , 50 ]],
				[ 14 , 6 , 76 , [ 103 , 106 , 20 ]],
				[ 15 , 0 , 58 , [ 93 , 77 , 4 ]],
				[ 15 , 1 , 105 , [ 113 , 95 , 107 ]],
				[ 15 , 2 , 133 , [ 142 , 148 , 109 ]],
				[ 15 , 3 , 59 , [ 42 , 111 , 24 ]],
				[ 15 , 4 , 52 , [ 62 , 18 , 75 ]],
				[ 15 , 5 , 87 , [ 83 , 125 , 52 ]],
				[ 15 , 6 , 67 , [ 62 , 71 , 67 ]],
				[ 16 , 0 , 52 , [ 93 , 28 , 34 ]],
				[ 16 , 1 , 105 , [ 129 , 132 , 55 ]],
				[ 16 , 2 , 63 , [ 98 , 79 , 13 ]],
				[ 16 , 3 , 78 , [ 67 , 46 , 120 ]],
				[ 16 , 4 , 81 , [ 98 , 48 , 97 ]],
				[ 16 , 5 , 67 , [ 113 , 38 , 49 ]],
				[ 16 , 6 , 87 , [ 108 , 76 , 77 ]],
				[ 17 , 0 , 36 , [ 25 , 50 , 33 ]],
				[ 17 , 1 , 50 , [ 19 , 88 , 44 ]],
				[ 17 , 2 , 110 , [ 125 , 69 , 136 ]],
				[ 17 , 3 , 91 , [ 121 , 89 , 64 ]],
				[ 17 , 4 , 64 , [ 122 , 61 , 9 ]],
				[ 17 , 5 , 73 , [ 12 , 80 , 127 ]],
				[ 17 , 6 , 103 , [ 116 , 138 , 56 ]],
				[ 18 , 0 , 94 , [ 143 , 132 , 6 ]],
				[ 18 , 1 , 52 , [ 87 , 22 , 46 ]],
				[ 18 , 2 , 69 , [ 52 , 17 , 138 ]],
				[ 18 , 3 , 49 , [ 108 , 13 , 27 ]],
				[ 18 , 4 , 113 , [ 125 , 114 , 100 ]],
				[ 18 , 5 , 49 , [ 72 , 50 , 26 ]],
				[ 18 , 6 , 50 , [ 120 , 19 , 12 ]],
				[ 19 , 0 , 93 , [ 34 , 119 , 125 ]],
				[ 19 , 1 , 107 , [ 118 , 123 , 80 ]],
				[ 19 , 2 , 46 , [ 26 , 71 , 42 ]],
				[ 19 , 3 , 92 , [ 81 , 55 , 140 ]],
				[ 19 , 4 , 46 , [ 28 , 74 , 37 ]],
				[ 19 , 5 , 96 , [ 93 , 131 , 63 ]],
				[ 19 , 6 , 52 , [ 19 , 133 , 4 ]],
				[ 20 , 0 , 54 , [ 38 , 7 , 116 ]],
				[ 20 , 1 , 70 , [ 108 , 2 , 99 ]],
				[ 20 , 2 , 26 , [ 21 , 1 , 56 ]],
				[ 20 , 3 , 68 , [ 93 , 41 , 70 ]],
				[ 20 , 4 , 94 , [ 127 , 51 , 104 ]],
				[ 20 , 5 , 74 , [ 51 , 36 , 136 ]],
				[ 20 , 6 , 75 , [ 99 , 38 , 88 ]],
				[ 21 , 0 , 83 , [ 84 , 35 , 129 ]],
				[ 21 , 1 , 77 , [ 124 , 92 , 15 ]],
				[ 21 , 2 , 110 , [ 67 , 141 , 122 ]],
				[ 21 , 3 , 78 , [ 8 , 131 , 95 ]],
				[ 21 , 4 , 135 , [ 128 , 140 , 138 ]],
				[ 21 , 5 , 103 , [ 105 , 143 , 61 ]],
				[ 21 , 6 , 92 , [ 38 , 110 , 128 ]],
				[ 22 , 0 , 118 , [ 121 , 118 , 114 ]],
				[ 22 , 1 , 96 , [ 81 , 149 , 59 ]],
				[ 22 , 2 , 107 , [ 37 , 150 , 133 ]],
				[ 22 , 3 , 44 , [ 57 , 10 , 64 ]],
				[ 22 , 4 , 77 , [ 98 , 122 , 11 ]],
				[ 22 , 5 , 51 , [ 80 , 49 , 24 ]],
				[ 22 , 6 , 18 , [ 5 , 26 , 23 ]],
				[ 23 , 0 , 72 , [ 56 , 84 , 77 ]],
				[ 23 , 1 , 55 , [ 61 , 86 , 17 ]],
				[ 23 , 2 , 85 , [ 143 , 32 , 81 ]],
				[ 23 , 3 , 71 , [ 61 , 16 , 136 ]],
				[ 23 , 4 , 110 , [ 96 , 149 , 85 ]],
				[ 23 , 5 , 29 , [ 1 , 23 , 64 ]],
				[ 23 , 6 , 110 , [ 143 , 68 , 119 ]]
		],
	  }],
	plotOptions: {
		series: {
			events: {
				click: function (e) {
					abreGraficos(e.point, e);
				}
			}
		}
	},	
	tooltip: {
		formatter: function () {
			return '<b>' + this.series.xAxis.categories[this.point.x] + ' - '+ this.series.yAxis.categories[this.point.y] + '</b><br><b>' + this.point.value + 'v - ' +this.point.x + ' - ' + this.point.y + ' - Conjunto = ' + this.point.options.valores;
		}
	},
	credits: {
		enabled: false
	},
});

$("#area-x").hide();
$("#botoes-area-x").hide();
$("#area-y").hide();
$("#botoes-area-y").hide();

$("#area-x").hide();
$("#botoes-area-x").hide();
$("#area-y").hide();
$("#area-conjunto-x1").hide();
$("#area-conjunto-y1").hide();
$("#botoes-area-conjunto-x1").hide();
$("#botoes-area-conjunto-y1").hide();

function abreGraficos(ponto, e){

	var dia = diaDaSemana(ponto.y);
	var hora = horaDaSemana(ponto.x);
	var arrayValoresX = [], arrayValoresY = [], total = heatmapcolor.series[0].valueData.length;
	var conjuntoValoresX1 = [], conjuntoValoresX2 = [], conjuntoValoresX3 = [], conjuntoValoresX4 = [], conjuntoValoresX5 = [];
	var conjuntoValoresY1 = [], conjuntoValoresY2 = [], conjuntoValoresY3 = [], conjuntoValoresY4 = [], conjuntoValoresY5 = [];
	var mediaX = 0;
	var mediaY = 0;
	var cor1 = '#008000', cor2 = '#0094C2', cor3 = '#B55E90';

	for(var i=0; i<=23; i++){
		arrayValoresX.push(heatmapcolor.series[0].valueData[ponto.y + (7 * i)]);
		mediaX = mediaX + heatmapcolor.series[0].valueData[ponto.y + (7 * i)];

		conjuntoValoresX1.push(heatmapcolor.series[0].options.data[ponto.y + (7 * i)][3][0]);
		conjuntoValoresX2.push(heatmapcolor.series[0].options.data[ponto.y + (7 * i)][3][1]);
		conjuntoValoresX3.push(heatmapcolor.series[0].options.data[ponto.y + (7 * i)][3][2]);
		conjuntoValoresX4.push(heatmapcolor.series[0].options.data[ponto.y + (7 * i)][3][3]);
		conjuntoValoresX5.push(heatmapcolor.series[0].options.data[ponto.y + (7 * i)][3][4]);
	}

	for(var j=0; j<=6; j++){
		arrayValoresY.push(heatmapcolor.series[0].valueData[(ponto.x * 7) + j]);
		mediaY = mediaY + heatmapcolor.series[0].valueData[(ponto.x * 7) + j];
		
		conjuntoValoresY1.push(heatmapcolor.series[0].options.data[(ponto.x * 7) + j][3][0]);
		conjuntoValoresY2.push(heatmapcolor.series[0].options.data[(ponto.x * 7) + j][3][1]);
		conjuntoValoresY3.push(heatmapcolor.series[0].options.data[(ponto.x * 7) + j][3][2]);
		conjuntoValoresY4.push(heatmapcolor.series[0].options.data[(ponto.x * 7) + j][3][3]);
		conjuntoValoresY5.push(heatmapcolor.series[0].options.data[(ponto.x * 7) + j][3][4]);
	}

	abreAreaX("area-x", arrayValoresX, dia, cor1);
	abreAreaY("area-y", arrayValoresY, hora, cor1);
	
	abreAreaX("area-conjunto-x1", conjuntoValoresX1, dia, cor2);
	abreAreaY("area-conjunto-y1", conjuntoValoresY1, hora, cor3);

}

function diaDaSemana(ponto){
	return heatmapcolor.yAxis[0].categories[ponto];
}

function horaDaSemana(ponto){
	return heatmapcolor.xAxis[0].categories[ponto];
}
