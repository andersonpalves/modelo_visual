var heatmapcolor = Highcharts.chart('heatmap-color', {
	chart: {
		type: 'heatmap',
	},
	title: {
		text: 'Energy consumption per day in the week'
	},
	yAxis: {
		categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
		reversed: true,
		title: null
	},
	xAxis: {
		categories: ['0a', '1a', '2am', '3a', '4a', '5a', '6a', '7a', '8a', '9a', '10a', '11a', '12p', '13p', '14p', '15p', '16p', '17p', '18p', '19p', '20p', '21p', '22p', '23p'],
		opposite: true,
	},
	colorAxis: {
		min: 0,
		minColor: '#FFFFFF',
		maxColor: Highcharts.getOptions().colors[8]
	},
	series: [{
		name: 'Energy consumption per day in the week',
		borderWidth: 1,
		borderColor: '#DC143C',
		dataLabels: {
			enabled: true,
			color: '#000000'
		},
		data: [
		  [0, 0, 10],
		  [0, 1, 19],
		  [0, 2, 8],
		  [0, 3, 24],
		  [0, 4, 67],
		  [0, 5, 24],
		  [0, 6, 67],
		  [1, 0, 92],
		  [1, 1, 58],
		  [1, 2, 78],
		  [1, 3, 117],
		  [1, 4, 48],
		  [1, 5, 24],
		  [1, 6, 67],
		  [2, 0, 35],
		  [2, 1, 15],
		  [2, 2, 123],
		  [2, 3, 64],
		  [2, 4, 52],
		  [2, 5, 123],
		  [2, 6, 64],
		  [3, 0, 72],
		  [3, 1, 132],
		  [3, 2, 114],
		  [3, 3, 19],
		  [3, 4, 16],
		  [3, 5, 114],
		  [3, 6, 19],
		  [4, 0, 38],
		  [4, 1, 5],
		  [4, 2, 8],
		  [4, 3, 117],
		  [4, 4, 115],
		  [4, 5, 117],
		  [4, 6, 115],
		  [5, 0, 88],
		  [5, 1, 32],
		  [5, 2, 12],
		  [5, 3, 6],
		  [5, 4, 120],
		  [5, 5, 88],
		  [5, 6, 32],
		  [6, 0, 13],
		  [6, 1, 44],
		  [6, 2, 88],
		  [6, 3, 98],
		  [6, 4, 96],
		  [6, 5, 88],
		  [6, 6, 98],
		  [7, 0, 31],
		  [7, 1, 1],
		  [7, 2, 82],
		  [7, 3, 32],
		  [7, 4, 30],
		  [7, 5, 82],
		  [7, 6, 32],
		  [8, 0, 85],
		  [8, 1, 97],
		  [8, 2, 123],
		  [8, 3, 64],
		  [8, 4, 84],
		  [8, 5, 97],
		  [8, 6, 123],
		  [9, 0, 47],
		  [9, 1, 114],
		  [9, 2, 31],
		  [9, 3, 48],
		  [9, 4, 91],
		  [9, 5, 31],
		  [9, 6, 48],
		  [10, 0, 85],
		  [10, 1, 97],
		  [10, 2, 123],
		  [10, 3, 64],
		  [10, 4, 84],
		  [10, 5, 97],
		  [10, 6, 123],
		  [11, 0, 47],
		  [11, 1, 114],
		  [11, 2, 31],
		  [11, 3, 48],
		  [11, 4, 91],
		  [11, 5, 14],
		  [11, 6, 31],
		  [12, 0, 31],
		  [12, 1, 1],
		  [12, 2, 82],
		  [12, 3, 32],
		  [12, 4, 30],
		  [12, 5, 82],
		  [12, 6, 32],
		  [13, 0, 10],
		  [13, 1, 19],
		  [13, 2, 8],
		  [13, 3, 24],
		  [13, 4, 67],
		  [13, 5, 24],
		  [13, 6, 67],
		  [14, 0, 92],
		  [14, 1, 58],
		  [14, 2, 78],
		  [14, 3, 117],
		  [14, 4, 48],
		  [14, 5, 24],
		  [14, 6, 67],
		  [15, 0, 35],
		  [15, 1, 15],
		  [15, 2, 123],
		  [15, 3, 64],
		  [15, 4, 52],
		  [15, 5, 123],
		  [15, 6, 64],
		  [16, 0, 72],
		  [16, 1, 132],
		  [16, 2, 114],
		  [16, 3, 19],
		  [16, 4, 16],
		  [16, 5, 114],
		  [16, 6, 19],
		  [17, 0, 38],
		  [17, 1, 5],
		  [17, 2, 8],
		  [17, 3, 117],
		  [17, 4, 115],
		  [17, 5, 117],
		  [17, 6, 115],
		  [18, 0, 88],
		  [18, 1, 32],
		  [18, 2, 12],
		  [18, 3, 6],
		  [18, 4, 120],
		  [18, 5, 88],
		  [18, 6, 32],
		  [19, 0, 13],
		  [19, 1, 44],
		  [19, 2, 88],
		  [19, 3, 98],
		  [19, 4, 96],
		  [19, 5, 88],
		  [19, 6, 98],
		  [20, 0, 31],
		  [20, 1, 1],
		  [20, 2, 82],
		  [20, 3, 32],
		  [20, 4, 30],
		  [20, 5, 82],
		  [20, 6, 32],
		  [21, 0, 85],
		  [21, 1, 97],
		  [21, 2, 123],
		  [21, 3, 64],
		  [21, 4, 84],
		  [21, 5, 97],
		  [21, 6, 123],
		  [22, 0, 47],
		  [22, 1, 114],
		  [22, 2, 31],
		  [22, 3, 48],
		  [22, 4, 91],
		  [22, 5, 31],
		  [22, 6, 48],
		  [23, 0, 85],
		  [23, 1, 97],
		  [23, 2, 123],
		  [23, 3, 64],
		  [23, 4, 84],
		  [23, 5, 97],
		  [23, 6, 123],
		],
	  }],
	plotOptions: {
		series: {
			events: {
				click: function (e) {
					abreGraficos(e.point);
				}
			}
		}
	},	
	tooltip: {
		formatter: function () {
			return '<b>' + this.series.xAxis.categories[this.point.x] + ' - '+ this.series.yAxis.categories[this.point.y] + '</b><br><b>' + this.point.value + 'v - ' +this.point.x + ' - ' + this.point.y;
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

function abreGraficos(ponto){
	var dia = diaDaSemana(ponto.y);
	var hora = horaDaSemana(ponto.x);
	var arrayValoresX = [], arrayValoresY = [], total = heatmapcolor.series[0].valueData.length;
	var mediaX = 0;
	var mediaY = 0;

	for(var i=0; i<=23; i++){
		arrayValoresX.push(heatmapcolor.series[0].valueData[ponto.y + (7 * i)]);
		mediaX = mediaX + heatmapcolor.series[0].valueData[ponto.y + (7 * i)];
	}
	
	for(var j=0; j<=6; j++){
		arrayValoresY.push(heatmapcolor.series[0].valueData[(ponto.x * 7) + j]);
		mediaY = mediaY + heatmapcolor.series[0].valueData[(ponto.x * 7) + j];
	}

	console.log("mediaX", mediaX/23);
	console.log("mediaY", mediaY/7);
	
	abreAreaX(arrayValoresX, dia);
	abreAreaY(arrayValoresY, hora);
}

function diaDaSemana(ponto){
	return heatmapcolor.yAxis[0].categories[ponto];
}

function horaDaSemana(ponto){
	return heatmapcolor.xAxis[0].categories[ponto];
}
