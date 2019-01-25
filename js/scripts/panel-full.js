$(document).ready(function () {
    $("#panel-fullscreen-dense-display").click(function (e) {
        e.preventDefault();
        
        var $this = $(this);
    
        if ($this.children('i').hasClass('glyphicon-resize-full'))
        {
            $this.children('i').removeClass('glyphicon-resize-full');
            $this.children('i').addClass('glyphicon-resize-small');
            chart_heatmap_large.setSize(1300, 580);
        }
        else if ($this.children('i').hasClass('glyphicon-resize-small'))
        {
            $this.children('i').removeClass('glyphicon-resize-small');
            $this.children('i').addClass('glyphicon-resize-full');
			chart_heatmap_large.setSize(636, 360);
        }
        $(this).closest('.panel').toggleClass('panel-fullscreen');		
    });
	
	$("#panel-fullscreen-heatmap").click(function (e) {
        e.preventDefault();
        
        var $this = $(this);
    
        if ($this.children('i').hasClass('glyphicon-resize-full'))
        {
            $this.children('i').removeClass('glyphicon-resize-full');
            $this.children('i').addClass('glyphicon-resize-small');
			chart_heatmap_color.setSize(1300, 580);
        }
        else if ($this.children('i').hasClass('glyphicon-resize-small'))
        {
            $this.children('i').removeClass('glyphicon-resize-small');
            $this.children('i').addClass('glyphicon-resize-full');
			chart_heatmap_color.setSize(chart_heatmap_large.containerWidth, 360);
        }
        $(this).closest('.panel').toggleClass('panel-fullscreen');		
    });
	
	$("#panel-fullscreen-dias-horas").click(function (e) {
        e.preventDefault();
        
        var $this = $(this);
    
        if ($this.children('i').hasClass('glyphicon-resize-full'))
        {
            $this.children('i').removeClass('glyphicon-resize-full');
            $this.children('i').addClass('glyphicon-resize-small');
			chart_dias.setSize(600, 580);
			chart_horas.setSize(600, 580);
        }
        else if ($this.children('i').hasClass('glyphicon-resize-small'))
        {
            $this.children('i').removeClass('glyphicon-resize-small');
            $this.children('i').addClass('glyphicon-resize-full');
			chart_dias.setSize(chart_dias.containerWidth, 360);
			chart_horas.setSize(chart_horas.containerWidth, 360);
        }
        $(this).closest('.panel').toggleClass('panel-fullscreen');		
    });
	
	$("#panel-fullscreen-relogio").click(function (e) {
        e.preventDefault();
        
        var $this = $(this);
    
        if ($this.children('i').hasClass('glyphicon-resize-full'))
        {
            $this.children('i').removeClass('glyphicon-resize-full');
            $this.children('i').addClass('glyphicon-resize-small');
			chart_relogio_manha.setSize(600, 580);
			chart_relogio_tarde.setSize(600, 580);
        }
        else if ($this.children('i').hasClass('glyphicon-resize-small'))
        {
            $this.children('i').removeClass('glyphicon-resize-small');
            $this.children('i').addClass('glyphicon-resize-full');
			chart_relogio_manha.setSize(chart_relogio_manha.containerWidth, 400);
			chart_relogio_tarde.setSize(chart_relogio_tarde.containerWidth, 400);
        }
        $(this).closest('.panel').toggleClass('panel-fullscreen');		
    });
	
	$("#panel-fullscreen-historico").click(function (e) {
        e.preventDefault();
        
        var $this = $(this);
    
        if ($this.children('i').hasClass('glyphicon-resize-full'))
        {
            $this.children('i').removeClass('glyphicon-resize-full');
            $this.children('i').addClass('glyphicon-resize-small');
			chart_historico.setSize(chart_historico.containerWidth, 600);
        }
        else if ($this.children('i').hasClass('glyphicon-resize-small'))
        {
            $this.children('i').removeClass('glyphicon-resize-small');
            $this.children('i').addClass('glyphicon-resize-full');
			chart_historico.setSize(chart_historico.containerWidth, 400);
        }
        $(this).closest('.panel').toggleClass('panel-fullscreen');		
    });

    $("#panel-fullscreen-historico-geral").click(function (e) {
        e.preventDefault();
        
        var $this = $(this);
    
        if ($this.children('i').hasClass('glyphicon-resize-full'))
        {
            $this.children('i').removeClass('glyphicon-resize-full');
            $this.children('i').addClass('glyphicon-resize-small');
			chart_historico_geral.setSize(chart_historico_geral.containerWidth, 600);
        }
        else if ($this.children('i').hasClass('glyphicon-resize-small'))
        {
            $this.children('i').removeClass('glyphicon-resize-small');
            $this.children('i').addClass('glyphicon-resize-full');
			chart_historico_geral.setSize(chart_historico_geral.containerWidth, 400);
        }
        $(this).closest('.panel').toggleClass('panel-fullscreen');		
    });
	
});