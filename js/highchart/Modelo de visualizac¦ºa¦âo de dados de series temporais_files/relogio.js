function abreRelogioManha(arrayPieManha, dia, dia_semana){
	$("#relogioTexto").html("Relógio - Consumo dos dois turnos do dia <b>" + dia + ' </b>-<b>' + dia_semana +'</b>');
	
	var relogio_manha = {
		chart: {
			renderTo: 'relogio-manha',
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			type: 'pie'
		},
		title: {
			text: null 
		},
		subtitle:{
			text: "<b>Consumo entre 0 e 11 horas</b>" 
		},
		tooltip: {
            pointFormat: '{series.value}<b>{point.value} consumo</b>'
        },
        plotOptions: {
            pie: {
				startAngle: -14,
				allowPointSelect: true,
				cursor: 'pointer',
				borderWidth: 0.3,
				borderColor: '#000000',
				dataLabels: {
					enabled: true,
					//format: '<b>{point.value}</b>',
					distance: 0,
					filter: {
						operator: '>',
						value: 4
					}
				},
				size: '75%',
                cursor: 'pointer',
                data: arrayPieManha
            }
        },
        series: [{
            type: 'pie',
            dataLabels: {
                verticalAlign: 'top',
                enabled: true,
                color: '#000000',
                connectorWidth: 1,
                distance: -40,
                connectorColor: '#000000',
                formatter: function () {
                    return this.point.value; //texto dentro da celula
                }
            }
        }, {
            type: 'pie',
            dataLabels: {
                enabled: true,
                color: '#000000',
                connectorWidth: 1,
                distance: 10,
                connectorColor: '#000000',
                formatter: function () {
					var texto = this.point.name;
                    return '<b>' + texto.replace("horas", "<br>horas");
                }
            }
        }],
        exporting: {
            enabled: false
        },
        credits: {
            enabled: false
        },
		responsive: {
			rules: [{
				condition: {
					maxWidth: "100%",
					maxHeight: "100%"
				}
			}]
		}
	};
	
	chart_relogio_manha = new Highcharts.Chart(relogio_manha);
}
	
function abreRelogioTarde(arrayPieManha, dia, dia_semana){
	
	var relogio_tarde = {
		chart: {
			renderTo: 'relogio-tarde',
			plotBackgroundColor: null,
			plotBorderWidth: null,
			plotShadow: false,
			type: 'pie'
		},
		title: {
			text: null 
		},
		subtitle:{
			text: "<b>Consumo entre 12 e 23 horas</b>" 
		},
		tooltip: {
            pointFormat: '{series.value}<b>{point.value} consumo</b>'
        },
        plotOptions: {
            pie: {
				startAngle: -14,
				allowPointSelect: true,
				cursor: 'pointer',
				borderWidth: 0.3,
				borderColor: '#000000',
				dataLabels: {
					enabled: true,
					//format: '<b>{point.value}</b>',
					distance: 0,
					filter: {
						operator: '>',
						value: 4
					}
				},
				size: '75%',
                cursor: 'pointer',
                data: arrayPieManha
            }
        },
        series: [{
            type: 'pie',
            dataLabels: {
                verticalAlign: 'top',
                enabled: true,
                color: '#000000',
                connectorWidth: 1,
                distance: -40,
                connectorColor: '#000000',
                formatter: function () {
                    return this.point.value; //texto dentro da celula
                }
            }
        }, {
            type: 'pie',
            dataLabels: {
                enabled: true,
                color: '#000000',
                connectorWidth: 1,
                distance: 10,
                connectorColor: '#000000',
                formatter: function () {
					var texto = this.point.name;
                    return '<b>' + texto.replace("horas", "<br>horas");
                }
            }
        }],
        exporting: {
            enabled: false
        },
        credits: {
            enabled: false
        },
		responsive: {
			rules: [{
				condition: {
					maxWidth: "100%",
					maxHeight: "100%"
				}
			}]
		}
	};
	
	chart_relogio_tarde = new Highcharts.Chart(relogio_tarde);
}