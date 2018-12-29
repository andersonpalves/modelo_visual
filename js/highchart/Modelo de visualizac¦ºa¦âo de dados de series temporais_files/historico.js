function carregarHistorico(ano) {
    
    var listaObjetos = buscaDadosHistorico(historico);

    var historico = {
       
        title: {
			text: ''
		},
		subtitle: {
			text: ''
		},
        chart: {
            renderTo: 'historico',
            type: 'line',
            zoomType: 'x'
        },
        tooltip: {
            shared: true,
            crosshairs: true,
            dateTimeLabelFormats : {
                day:"%b %e"
            }
        },
        xAxis: {
            categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            plotBands: [{
                color: '#F0F0F0',
                from: -10,
                to: 0.5
            }],
		},
        series: listaObjetos
		
    };
    
    console.log('fim');
    chart_historico = new Highcharts.Chart(historico);

}

function buscaDadosHistorico(historico){

    var dadosNomesArquivos = "";
   
    $.ajax({
        url: "busca_arquivos.php?nome_arquivo="+lugar_selecionado,
        success: function (nomesArquivos) {
            dadosNomesArquivos = carregarDados(nomesArquivos);
        },
        async: false
    });

    console.log(dadosNomesArquivos);

    return dadosNomesArquivos;
}

function carregarDados(nomesArquivos){
    var energia = $("#energia").val();
    var arquivos = eval(nomesArquivos);
    var contador_historico = 0, valor_historico = 0, conteudoHistorico = [], retornoFinal =[];
    var jan = 0, fev = 0, mar = 0, abr = 0, mai = 0, jun = 0, jul = 0, ago = 0, set = 0, out = 0, nov = 0, dez = 0;
    
    for(i=0; i<arquivos.length; i++){
        var nome = arquivos[i];
        $.ajax({
            url: nome,
            success: function (dadosJson) {
                var anoDoArquivo = nome.substring(0,4);
                $.each(dadosJson, function (chave, val) {

                    if (chave == 0){
                        return;
                    }

                    var dataFormato = val[0].split('-');
            
                    if (energia == "Média") {
                        var contadorTotal = 0;
                        for(var z=0; z<=val[2].length-1; z++){
                            contadorTotal += parseInt(val[2][z]);
                        }
            
                        valor = contadorTotal / val[2].length;
                    }
                    else{
                        valor = val[2][energia-1];
                    }

                    switch (dataFormato[1]) {
                        case "01":
                            jan += parseInt(valor);
                            break;
                        case "02":
                            fev += parseInt(valor);
                            break;
                        case "03":
                            mar += parseInt(valor);
                            break;
                        case "04":
                            abr += parseInt(valor);
                            break;
                        case "05":
                            mai += parseInt(valor);
                            break;
                        case "06":
                            jun += parseInt(valor);
                            break;
                        case "07":
                            jul += parseInt(valor);
                            break;
                        case "08":
                            ago += parseInt(valor);
                            break;
                        case "09":
                            set += parseInt(valor);
                            break;
                        case "10":
                            out += parseInt(valor);
                            break;
                        case "11":
                            nov += parseInt(valor);
                            break;
                        case "12":
                            dez += parseInt(valor);
                    }
                });

                var objeto = {};
                objeto.name = anoDoArquivo;

                if(anoDoArquivo == 2002){
                    objeto.data = [jan, fev, mar, abr, mai, jun, jul, ago, set, out, nov, dez];
                }
                
                if(anoDoArquivo == 2003){
                    objeto.data = [jan, fev, mar, abr, mai, jun, jul, ago, set, out, nov, dez];
                }

                if(anoDoArquivo == 2004){
                    objeto.data = [jan, fev, mar, abr, mai, jun, jul, ago, set, out, nov, dez];
                }

                if(anoDoArquivo == 2005){
                    objeto.data = [jan, fev, mar, abr, mai, jun, jul, ago, set, out, nov, dez];
                }

                if(anoDoArquivo == 2006){
                    objeto.data = [jan, fev, mar, abr, mai, jun, jul, ago, set, out, nov, dez];
                }

                //jan = 0, fev = 0, mar = 0, abr = 0, mai = 0, jun = 0, jul = 0, ago = 0, set = 0, out = 0, nov = 0, dez = 0;

                retornoFinal.push(objeto);
            },
            async: false
        });
   }
   return retornoFinal;
}