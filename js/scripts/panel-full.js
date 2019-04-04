$(document).ready(function () {

    $("#panel-fullscreen-calendar-view").click(function (e) {
        e.preventDefault();
        
        var $this = $(this);
    
        if ($this.children('i').hasClass('glyphicon-resize-full'))
        {
            $this.children('i').removeClass('glyphicon-resize-full');
            $this.children('i').addClass('glyphicon-resize-small');
            chart_calendar_view.setSize(largura_calendario, altura_calendario + 290);
        }
        else if ($this.children('i').hasClass('glyphicon-resize-small'))
        {
            $this.children('i').removeClass('glyphicon-resize-small');
            $this.children('i').addClass('glyphicon-resize-full');
			chart_calendar_view.setSize(largura_calendario, altura_calendario);
        }
        $(this).closest('.panel').toggleClass('panel-fullscreen');		
    });

    $("#panel-fullscreen-dense-display").click(function (e) {
        e.preventDefault();
        
        var $this = $(this);
    
        if ($this.children('i').hasClass('glyphicon-resize-full'))
        {
            $this.children('i').removeClass('glyphicon-resize-full');
            $this.children('i').addClass('glyphicon-resize-small');
            chart_heatmap_large.setSize(largura_dense, altura_dense + 290);
        }
        else if ($this.children('i').hasClass('glyphicon-resize-small'))
        {
            $this.children('i').removeClass('glyphicon-resize-small');
            $this.children('i').addClass('glyphicon-resize-full');
			chart_heatmap_large.setSize(largura_dense, altura_dense);
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
			chart_heatmap_color.setSize(largura_heatmap, altura_heatmap + 290);
        }
        else if ($this.children('i').hasClass('glyphicon-resize-small'))
        {
            $this.children('i').removeClass('glyphicon-resize-small');
            $this.children('i').addClass('glyphicon-resize-full');
			chart_heatmap_color.setSize(largura_heatmap, altura_heatmap);
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