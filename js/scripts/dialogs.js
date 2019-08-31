var modalNumber = 1;
var mesSelected = 0;

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

    var idChart = 'container_'+ modalNumber;
    var $dlg = createNewDialog('Dialog title', "<div id='"+idChart+"'></div>", 415, 410);
    modalNumber++;

    var newChart = createDialogMonthly(idChart, mesSelected, maxDenseDisplay, listaDados);
    Highcharts.chart(newChart);
});

$("#modal-weekly").click(function(e){
    console.log(getLoadDatasByMonth(mesSelected));
    var $dlg = createNewDialog('Dialog title', '<div id="container"></div>', 350, 350);
});

$("#modal-daily").click(function(e){
    console.log(getLoadDatasByMonth(mesSelected));
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