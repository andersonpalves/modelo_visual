<html>
  <head>
    <meta charset="utf-8">
    <title>Model Visualization to Smart Cities and Smart Buildings</title>
    <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' />
    <link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
    <link rel="shortcut icon" type="image/png" href="images/favicon.ico"/>
    <!-- Dashboard 26/06/2011 - Sunday-->
    <link href="css/keen-dashboards.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="css/style.css">
  </head>
  <body class="keen-dashboard">
    <div class="navbar nav-color">
      <div class="container-fluid">
        <div class="navbar-collapse">
          <ul class="nav navbar-nav">
            <li>
              <span class="texto">Place: </span>
              <select id="lugar">
                <!--<option value="restaurante">Restaurant</option>
                  <option value="super_mercado">Super Market</option>
                  <option value="teste">1140 Energies</option>-->
                <option value="pjm">PJM</option>
              </select>
            </li>
            <li>
              <span class="texto">Year: </span>
              <select id="ano">
                <!--<option value="2004" selected>2004</option>
                  <option value="2005" selected>2005</option>
                  <option value="2006">2006</option>
                  <option value="2016">2016</option> 
                  <option value="2009" selected>2009</option>
                  <option value="2010" selected>2010</option>-->
                <option value="2011" selected>2011</option>
                <option value="2012">2012</option>
                <option value="2013">2013</option>
                <option value="2014">2014</option>
                <option value="2015">2015</option>
                <option value="2016">2016</option>
                <option value="2017">2017</option>
              </select>
            </li>
            <li>
              <span class="texto">Energy Source: </span><select id="energia"></select>
            </li>
            <!--	<li>
              <span class="texto">Group Energy Source: </span>
              <select id="grupo">
                <option value="-">-</option>
              	<option value="Eletricidade">Eletricidade</option>
              	<option value="Gas">Gás</option>
              </select>
              </li>-->
          </ul>
        </div>
      </div>
		</div>

    <div class="container-fluid">
		<div class="row">
        <div id='ajax_loader' style="position: fixed; left: 50%; top: 50%; display: none;">
          <img src="images/loading.gif" id="loading-indicator" style="display:none" />
        </div>
        <div class="col-sm-12 chart-container">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h2 class="panel-title"><span id="calendarTexto"></span></h2>
              <ul class="list-inline panel-actions">
                <li><a href="#" id="panel-fullscreen-calendar-view" role="button" title="Toggle fullscreen"><i class="glyphicon glyphicon-resize-full"></i></a></li>
              </ul>
            </div>
            <div class="panel-body">
							<div id="calendar_view" style="height: 500px; margin: 0 auto"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-12 chart-container">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h2 class="panel-title"><span id="denseTexto"></span></h2>
              <ul class="list-inline panel-actions">
                <li><a href="#" id="panel-fullscreen-dense-display" role="button" title="Toggle fullscreen"><i class="glyphicon glyphicon-resize-full"></i></a></li>
              </ul>
            </div>
            <div class="panel-body">
              <div id="ht_large"></div>
              <div>
                <input id="rangeValuesDense" type="range" value="0" name="points" min="0">
                <span>Values equal or grater than: </span><span id="denseRange"><b>0</b></span>
              </div>
            </div>
          </div>
        </div>
      </div>
			
			<div class="row"><a name="link_heatmap"></a>
				<div class="col-sm-6 chart-container">
          <div class="panel panel-default blocos_6">
            <div class="panel-heading">
              <h2 class="panel-title"><span id="heatmapTexto"></span></h2>
              <ul class="list-inline panel-actions">
                <li><a href="#" id="panel-fullscreen-heatmap" role="button" title="Toggle fullscreen"><i class="glyphicon glyphicon-resize-full"></i></a></li>
              </ul>
            </div>
            <div class="panel-body">
              <div id="heatmap-color" align="center"></div>
              <div id="rangeHeatmap">
                <input id="rangeValuesHeatmap" type="range" value="0" name="points" min="0">
                <span>Values equal or grater than: </span><span id="heatmapRange"><b>0</b></span>
              </div>
            </div>
          </div>
				</div>
				
        <div class="col-sm-3 chart-container">
          <div class="panel panel-default blocos_6">
            <div class="panel-heading">
              <h2 class="panel-title"><span id="diasTexto"></span></h2>
              <ul class="list-inline panel-actions">
                <li><a href="#" id="panel-fullscreen-dias" role="button" title="Toggle fullscreen"><i class="glyphicon glyphicon-resize-full"></i></a></li>
              </ul>
            </div>
            <div class="panel-body">
              <div class="col-sm-12">
                <div id="area-conjunto-x1" align="center"></div>
                <div id="botoes-area-conjunto-x1" style="text-align:center;">
                  <button id="area-conjunto-x1-coluna" class="btn btn-primary btn-sm">Bar</button>
                  <!--<button id="area-conjunto-x1-pizza" class="btn btn-orange btn-sm">Pie</button>-->
                  <button id="area-conjunto-x1-polar" class="btn btn-success btn-sm">Polar</button>
                  <button id="area-conjunto-x1-plot" class="btn btn-info btn-sm">Plot</button>
                  <button id="area-conjunto-x1-linha" class="btn btn-danger btn-sm">Line</button>
                  <button id="area-conjunto-x1-area" class="btn btn-warning btn-sm">Area</button>
                  <button id="area-conjunto-x1-box" class="btn btn-green btn-sm">Box</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-sm-3 chart-container">
          <div class="panel panel-default blocos_6">
            <div class="panel-heading">
              <h2 class="panel-title"><span id="horasTexto"></span></h2>
              <ul class="list-inline panel-actions">
                <li><a href="#" id="panel-fullscreen-horas" role="button" title="Toggle fullscreen"><i class="glyphicon glyphicon-resize-full"></i></a></li>
              </ul>
            </div>
            <div class="panel-body">
              <div class="col-sm-12">
                <div id="area-conjunto-y1" align="center"></div>
                <div id="botoes-area-conjunto-y1" style="text-align:center;">
                  <button id="area-conjunto-y1-coluna" class="btn btn-primary btn-sm">Bar</button>
                  <!--<button id="area-conjunto-y1-pizza" class="btn btn-orange btn-sm">Pie</button>-->
                  <button id="area-conjunto-y1-polar" class="btn btn-success btn-sm">Polar</button>
                  <button id="area-conjunto-y1-plot" class="btn btn-info btn-sm">Plot</button>
                  <button id="area-conjunto-y1-linha" class="btn btn-danger btn-sm">Line</button>
                  <button id="area-conjunto-y1-area" class="btn btn-warning btn-sm">Area</button>
                  <button id="area-conjunto-y1-box" class="btn btn-green btn-sm">Box</button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

		
    <div class="row">
      <div class="col-sm-6 chart-container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h2 class="panel-title" align="center"><span id="heatmapHistoricoTexto"></span></h2>
            <ul class="list-inline panel-actions">
              <li><a href="#" id="panel-fullscreen-historico" role="button" title="Toggle fullscreen"><i class="glyphicon glyphicon-resize-full"></i></a></li>
            </ul>
          </div>
          <div class="panel-body">
            <div id="historico" style="height: 400px; min-width: 310px"></div>
          </div>
        </div>
      </div>
      <div class="col-sm-6 chart-container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h2 class="panel-title" align="center">
              <span id="boxplotTexto"></span> 
              <span> - Hour: </span>
              <select id="boxplotAno">
                <option value="-" selected>All</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
              </select></h2>
            <ul class="list-inline panel-actions">
              <li><a href="#" id="panel-fullscreen-boxplot" role="button" title="Toggle fullscreen"><i class="glyphicon glyphicon-resize-full"></i></a></li>
            </ul>
          </div>
          <div class="panel-body">
            <div id="boxplotAnnual" style="height: 400px; min-width: 310px"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-sm-12 chart-container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h2 class="panel-title" align="center" <span id="heatmapHistoricoGeralTexto"></span></h2>
            <ul class="list-inline panel-actions">
              <li><a href="#" id="panel-fullscreen-historico-geral" role="button" title="Toggle fullscreen"><i class="glyphicon glyphicon-resize-full"></i></a></li>
            </ul>
          </div>
          <div class="panel-body">
            <div id="historico_geral" style="height: 400px; min-width: 310px"></div>
          </div>
        </div>
      </div>
    </div>
    </div>
    <script src="js/jquery.js" type="text/javascript"></script>
    <script src="js/bootstrap.js" type="text/javascript"></script>
    <script src="js/highchart/highcharts.js"></script>
    <script src="js/highchart/highcharts-more.js"></script>
    <script src="js/highchart/heatmap.js"></script>
    <script src="js/highchart/series-label.js"></script>
    <script src="js/highchart/exporting.js"></script>
    <script src="js/highchart/data.js"></script>
    <script src="js/highchart/boost-canvas.js"></script>
    <script src="js/scripts/historico.js"></script>
		<script src="js/scripts/historico-geral.js"></script>
		<script src="js/scripts/calendar-view.js"></script>
    <script src="js/scripts/heatmap-large.js"></script>
    <script src="js/scripts/heatmap-color.js"></script>
    <script src="js/scripts/panel-full.js"></script>
    <script src="js/scripts/config.js"></script>
    <script src="js/scripts/horas.js"></script>
    <script src="js/scripts/dias.js"></script>
    <script src="js/scripts/graficos.js"></script>
    <script src="js/scripts/boxplot.js"></script>
  </body>
</html>