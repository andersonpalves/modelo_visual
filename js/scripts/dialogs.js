var modalNumber = 1;

$('#modal-monthly').draggable();
$('#modal-weekly').draggable();
$('#modal-daily').draggable();

$("#modal-monthly").click(function(e){
    var dados = getLoadDatasByMonth(mesSelected);
    var listaDados = []
    
    for (var i=0; i<dados.length; i++) {
        var valores = [dados[i][1], dados[i][2], dados[i][3]];
        listaDados.push(valores);
    }

    var idChart = 'idDialog_'+ modalNumber;
    var title = 'Monthly View - ' + retornaNomePorMes(mesSelected) + '/' +$("#ano").val();
    var $dlg = createNewDialog(title, "<div id='"+idChart+"'></div>", 415, 410)
    var chartMonth = createDialogMonthly(idChart, mesSelected, maxDenseDisplay, listaDados);
    Highcharts.chart(chartMonth);
    modalNumber++;
});

$("#modal-weekly").click(function(e){

  var listaDados = [];
  var lista_heatmap_dialog = [];

  $.post( "datas_semanais.php", { ano: weekSelected[0], semana: weekSelected[1] }, function( data ) {
    lista_dias=[];

    $.each(data, function (key, val) {
      lista_dias.push(val);
      lista_heatmap_dialog.push(getLoadDatas(val));
    });

    for(var i=0; i<=6; i++){
      for(var j=0; j<=23; j++){
        var item = [];
        var valor = 0;

        if (typeof lista_heatmap_dialog[i][j] === 'undefined') {
            valor = null
        }
        else {
            valor = lista_heatmap_dialog[i][j][2];
        }

        if (valor != null) {
            valor = parseInt(valor);
        }

        item.push(i, j, valor);
        listaDados.push(item);
      }
    }

    var idChart = 'idDialog_'+ modalNumber;
    var title = 'Week View - Week ' + weekSelected[1] + ' - ' +retornaNomePorMes(mesSelected) + '/' +$("#ano").val();
    var $dlg = createNewDialog(title, "<div id='"+idChart+"'></div>", 395, 390)
    var chartWeek = createDialogWeek(idChart, mesSelected, weekSelected[1], listaDados);
    carregaHeatmap(chartWeek, listaDados, maxDenseDisplay, true);
    Highcharts.chart(chartWeek);
    modalNumber++;

  }, "json");

});

$("#modal-daily").click(function(e){
    var $dlg = createNewDialog('Dialog title', '<div id="container"></div>', 350, 350);
});

var createNewDialog = (title, body, height, width) => {
  var $newDialog = $('#dialogs .dialog-tmpl').clone();
  $('.dialog-body', $newDialog).html(body);
  $('#dialogs').append($newDialog);
  $newDialog.dialog({
      'top' : 110,
      'title': title,
      'height': height, //350
      'width': width,
      'position': {my: "center",
                  at: "center",
                  of: "#dialogs"}
  });
  return $newDialog;
};

function createDialogMonthly(idChart, mesSelected, maxDenseDisplay, listaDados){
  return {
      chart: {
          renderTo: idChart,
          type: 'heatmap',
          zoomType: 'xy',
          margin: [60, 10, 80, 50],
          style:{
              cursor:'crosshair' //zoom-in'
          },
          height: 360,
          marginTop: 0
      },

      boost: {
          useGPUTranslations: true
      },

      title: {
          text: ''
      },
      subtitle: {
          text: ''
      },

      xAxis: {
          type: 'datetime',
          min: Date.UTC($("#ano").val(), mesSelected - 1, 1),
          max: Date.UTC($("#ano").val(), mesSelected, 1),
          useUTC: true,
          labels: {
              align: 'left',
              x: 5,
              y: 14/*,
              format: '{value:%B}' // long month */
          },
          title: {
              text: 'Day'
          }
      },

      yAxis: {
          title: {
              text: null
          },
          labels: {
              format: '{value}h' //:00
          },
          minPadding: 0,
          maxPadding: 0,
          startOnTick: false,
          endOnTick: false,
          tickPositions: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
          tickWidth: 1,
          min: 0,
          max: 23,
          reversed: true,
          title: {
              text: 'Schedule',
              margin: 3
          },
      },

      colorAxis: {
          stops: [
              [0, '#3060cf'],
              [0.5, '#fffbbc'],
              [0.9, '#c4463a'],
              [1, '#c4463a']
          ],
          min: 0,
          max: maxDenseDisplay,
          startOnTick: false,
          endOnTick: false,
          labels: {
              format: '{value}'
          }
      },

      series: [{
          data: listaDados,
          boostThreshold: 100,
          borderWidth: 0,
          nullColor: '#EFEFEF',
          colsize: 24 * 36e5, // one day
          tooltip: {
              headerFormat: null,
              pointFormat: '<b>{point.x:%e %b, %Y, %A} {point.y}:00h: {point.value} Consumption</b>'
          },
          turboThreshold: Number.MAX_VALUE
      }],
     
      navigation: {
          buttonOptions: {
              enabled: false
          }
      },

      credits: {
          enabled: false
      },
      
      responsive: {
          rules: [{
              condition: {
                  maxWidth: "100%"
              }
          }]
      }
  }
}

function createDialogWeek(idChart, mesSelected, weekSelected, listaDados){
  return {
    chart: {
      renderTo: idChart,
      type: 'heatmap',
      height: 360,
      width: 360,
      marginTop: 0
    },
    title: {
      text: ''
    },
    subtitle: {
      text: ''
    },
    yAxis: {
      labels: {
        format: '{value}h'//:00
      },
      minPadding: 0,
      maxPadding: 0,
      startOnTick: false,
      endOnTick: false,
      tickPositions: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
      tickWidth: 1,
      min: 0,
      max: 23,
      reversed: true,
      title: {
        text: 'Schedule'
      },
    },
    xAxis: {
      categories: ['Mon', 'Tue', 'Wedn', 'Thu', 'Fri', 'Sat', 'Sun'],
      opposite: false,
      labels: {
              rotation: 0
          },
      title: {
        text: 'Consumption'
      }
    },
    colorAxis: {
      stops: [
        [0, '#3060cf'],
        [0.5, '#fffbbc'],
        [0.9, '#c4463a'],
        [1, '#c4463a']
      ],
      min: 0,
      max:  parseInt(maxDenseDisplay)
    },
    legend: {
      visible: false
    },
    series: [{
          // cursor: 'pointer',
          name: 'Energy consumption per day in the week',
          borderWidth: 0.5,
          borderColor: '#000',
          keys: ['x', 'y', 'value'],
          data: listaDados,
          dataLabels: {
            enabled: false,
            color: 'black',
            style: {
              fontWeight: 'bold',
              fontSize: '10px'
            }
          }
        },
        {
          type: 'scatter',
          name: 'Lowest Daily',
          color: '#00008B',
          data: [],
          marker: {
            symbol: 'triangle-down',
            lineWidth: 0, //changed
            radius: 6,
            lineColor: '#FFFFFF',
            fillColor: '#00008B' //white
          },
          visible: false,
        },
        {
          type: 'scatter',
          name: 'Highest Daily',
          color: '#CC0000',
          data: [],
          marker: {
            symbol: 'triangle',
            lineWidth: 0,
            radius: 6,
            lineColor: '#CC0000',
            fillColor: '#CC0000'
          },
          visible: false,
        },
        {
          type: 'scatter',
          name: 'Lowest Hours',
          color: '#0000CD',
          data: [],
          lineWidth: 0,
          marker: {
            symbol: 'triangle-down',
            lineWidth: 0,
            radius: 6,
            lineColor: '#0000CD',
            fillColor: '#0000CD',
          },
          visible: false,
        },
        {
          type: 'scatter',
          name: 'Highest Hours',
          color: '#B70B2C',
          data: [],
          lineWidth: 0,
          marker: {
            symbol: 'triangle',
            lineWidth: 0,
            radius: 6,
            lineColor: '#B70B2C',
            fillColor: '#B70B2C'
          },
          visible: false
        }],
    plotOptions: {
      series: {
        events: {
          click: function (e) {
            
            var data = e.point.series.xAxis.categories[e.point.options.x];
            
            if(zoomAberto == true){
              $("#panel-fullscreen-heatmap").click();
            }
  
            largura_dias = chart_dias.chartWidth;
            altura_dias = chart_dias.chartHeight;
            largura_horas = chart_horas.chartWidth;
            altura_horas = chart_horas.chartHeight;
  
            if (e.point.value != null) {
              abreGraficos(e.point, e, semana_selecionada, data);					
            
              $('#graficos').show();
              $(".grupo").show();
            }
          }
        }
      }
    },	
    tooltip: {
      formatter: function () {
        var valor = this.series.xAxis.categories[this.point.x];
  
        if (typeof valor == "undefined") {
          var ponto = String(this.point.x);
          var valor_ponto = ponto.substring(0, 1);
          return '<b>' + this.series.xAxis.categories[valor_ponto] + ', '+ this.point.y + ':00 hours </b>';
        }
        else {
          if (this.point.value != null) {
            return '<b>' + this.series.xAxis.categories[this.point.x] + ', '+ this.point.y + ':00 hours - ' + this.point.value + ' Consumption</b>';
          }
          else {
            return "<b>No value to show</b>";
          }
          
        }
      },
      followPointer: true
    },
    navigation: {
      buttonOptions: {
        enabled: false
      }
    },
    credits: {
      enabled: false
    },
    responsive: {
      rules: [{
        condition: {
          maxWidth: "100%"
        }
      }]
    }
  }
}