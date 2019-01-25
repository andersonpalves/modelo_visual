$(function () {

	$.getJSON("dados_ht1.json", function(data) {
		var lista = data;
		var html = "Date,Time,Temperature ";

		$.each(lista, function (key, val) { //chave
			html += val.data + "," + val.horario + "," + val.valor + " ";
			console.log(key);
		});

		$('#csv').html(html);
	});
});