<html>
<head>
  <meta charset="utf-8">
  <title>Model Visualization to Smart Cities and Smart Buildings</title>
  <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' />
  <link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
	<link rel="shortcut icon" type="image/png" href="images/favicon.ico"/>

  <!-- Dashboard -->
  <link href="css/keen-dashboards.css" rel="stylesheet" type="text/css" />
   <link rel="stylesheet" href="css/style.css">
</head>
<body class="keen-dashboard">

  <div class="navbar nav-color">
    <div class="container-fluid">
      <div class="navbar-collapse">
        <ul class="nav navbar-nav">
		  <li><span class="texto">Place: </span>
				<select id="lugar">
					<option value="restaurante">Restaurant</option>
					<option value="super_mercado">Super Market</option>
					<option value="teste">1140 Energies</option>
				</select>
			</li>
		  <li><span class="texto">Year:</span>
				<select id="ano">
					<option value="2004" selected>2004</option>
					<option value="2005">2005</option>
					<option value="2006">2006</option>
					<option value="2016">2016</option>
				</select>
			</li>
		  <li><span class="texto">Energy Source: </span><select id="energia"></select></li>
        </ul>
      </div>
    </div>
  </div>

  <div class="container-fluid">
		<div class="row">
		  <div class="col-sm-6 chart-container">
			<div class="panel panel-default">
				<div class="panel-heading">
					<h2 class="panel-title"><span id="denseTexto"></span></h2>
					<ul class="list-inline panel-actions">
						<li><a href="#" id="panel-fullscreen-dense-display" role="button" title="Toggle fullscreen"><i class="glyphicon glyphicon-resize-full"></i></a></li>
					</ul>
				</div>
				<div class="panel-body">
					<div id="ht_large"></div>
				</div>
			</div>
		  </div>
		  <div class="col-sm-6 chart-container">
			<div class="panel panel-default">
				<div class="panel-heading">
					<h2 class="panel-title"><span id="heatmapTexto"></span></h2>
					<ul class="list-inline panel-actions">
						<li><a href="#" id="panel-fullscreen-heatmap" role="button" title="Toggle fullscreen"><i class="glyphicon glyphicon-resize-full"></i></a></li>
					</ul>
				</div>
				<div class="panel-body">
					<div id="heatmap-color"></div>
				</div>
			</div>
		  </div>
		</div>
		
		<div class="row">
		  <div class="col-sm-6 chart-container chart-container-sub">
			<div class="panel panel-default">
				<div class="panel-heading">
					<h2 class="panel-title"><span id="diasHorasTexto"></span></h2>
					<ul class="list-inline panel-actions">
						<li><a href="#" id="panel-fullscreen-dias-horas" role="button" title="Toggle fullscreen"><i class="glyphicon glyphicon-resize-full"></i></a></li>
					</ul>
				</div>
				<div class="panel-body">
					<div class="col-sm-6 chart-container">
						<div id="area-conjunto-x1"></div>
						
						<div id="botoes-area-conjunto-x1" class="botoes-graficos" style="text-align:center;">
							<button id="area-conjunto-x1-coluna" class="btn btn-primary btn-sm">Bar</button>
							<!--<button id="area-conjunto-x1-pizza" class="btn btn-orange btn-sm">Pie</button>-->
							<button id="area-conjunto-x1-polar" class="btn btn-success btn-sm">Polar</button>
							<button id="area-conjunto-x1-plot" class="btn btn-info btn-sm">Plot</button>
							<button id="area-conjunto-x1-linha" class="btn btn-danger btn-sm">Line</button>
							<button id="area-conjunto-x1-area" class="btn btn-warning btn-sm">Area</button>
						</div>
					</div>
					<div class="col-sm-6 chart-container">
						<div id="area-conjunto-y1"></div>
						
						<div id="botoes-area-conjunto-y1" class="botoes-graficos" style="text-align:center;">
							<button id="area-conjunto-y1-coluna" class="btn btn-primary btn-sm">Bar</button>
							<!--<button id="area-conjunto-y1-pizza" class="btn btn-orange btn-sm">Pie</button>-->
							<button id="area-conjunto-y1-polar" class="btn btn-success btn-sm">Polar</button>
							<button id="area-conjunto-y1-plot" class="btn btn-info btn-sm">Plot</button>
							<button id="area-conjunto-y1-linha" class="btn btn-danger btn-sm">Line</button>
							<button id="area-conjunto-y1-area" class="btn btn-warning btn-sm">Area</button>
						</div>
					</div>
				</div>
				<div class="bottom"></div>
			</div>
		  </div>
		  <div class="col-sm-6 chart-container chart-container-sub">
			<div class="panel panel-default">
				<div class="panel-heading">
					<h2 class="panel-title"><span id="relogioTexto"></span></h2>
					<ul class="list-inline panel-actions">
						<li><a href="#" id="panel-fullscreen-relogio" role="button" title="Toggle fullscreen"><i class="glyphicon glyphicon-resize-full"></i></a></li>
					</ul>
				</div>
				<div class="panel-body">
					<div class="col-sm-6 chart-container">
						<div id="relogio-manha"></div>
					</div>
					<div class="col-sm-6 chart-container">
						<div id="relogio-tarde"></div>
					</div>
				</div>
				<div class="bottom"></div>
			</div>
		  </div>
	  </div>
	
	  <div class="row">
		  <div class="col-sm-12 chart-container">
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
	  </div>

		<div class="row">
				<div class="col-sm-12 chart-container">
				<div class="panel panel-default">
					<div class="panel-heading">
						<h2 class="panel-title" align="center"><span id="heatmapHistoricoGeralTexto"></span></h2>
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

	<script src="js/historico.js"></script>
	<script src="js/historico-geral.js"></script>

	<script src="js/scripts/heatmap-large.js"></script>
	<script src="js/scripts/heatmap-color.js"></script>
	
	<script src="js/scripts/panel-full.js"></script>
	<script src="js/scripts/config.js"></script>

	<script src="js/scripts/area-x.js"></script>
	<script src="js/scripts/area-y.js"></script>
	<script src="js/scripts/graficos.js"></script>
	<script src="js/scripts/relogio.js"></script>

</body>
</html>
