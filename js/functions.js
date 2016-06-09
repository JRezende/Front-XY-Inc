$(function(){
    var tbPontos = localStorage.getItem("tbPontos");
    tbPontos = JSON.parse(tbPontos);
    if(tbPontos == null)
    	tbPontos = [];
});

$(document).ready( function(){
	$('.listaPoi').hide();
	$('.listaPoiPesquisa').hide();
	$('.pagCadastro').hide();
	$('.home').show();
});

function home(){
	$('.listaPoi').hide();
	$('.listaPoiPesquisa').hide();
	$('.pagCadastro').hide();
	$('.home').show();
}

function retornarFormCadastro(){
	$('.home').hide();
	$('.listaPoi').hide();
	$('.listaPoiPesquisa').hide();
	$('.pagCadastro').show();
}

function retornarFormPesquisa(){
	$('.home').hide();
	$('.listaPoi').hide();
	$('.pagCadastro').hide();
	$('.listaPoiPesquisa').show();
}

function retornarLista(){
	$.getJSON('db.json', function(data){
		var resultado = '';							
		for (var i in data.listaPoi) {
			resultado +="<li><div class='col-md-4 col-lg-4'>" 
				+ data.listaPoi[i].nome + "</div><div class='col-md-4 col-lg-4'>" 
				+ data.listaPoi[i].x + "</div><div class='col-md-4 col-lg-4'>" 
				+ data.listaPoi[i].y+"</div></li>";
		}
		var tbPontos = localStorage.getItem("tbPontos");
	    tbPontos = JSON.parse(tbPontos);
	    if(tbPontos == null){
    		$('.listaPoi ul').html(resultado);
	    }
	    else{
	    	for(var i in tbPontos){
				var pto = JSON.parse(tbPontos[i]);

				resultado +="<li><div class='col-md-4 col-lg-4'>" 
				+ pto.nome + "</div><div class='col-md-4 col-lg-4'>" 
				+ pto.x + "</div><div class='col-md-4 col-lg-4'>" 
				+ pto.y+"</div></li>";
			}
			$('.listaPoi ul').html(resultado);
		}
	});
	$('.home').hide();
	$('.listaPoiPesquisa').hide();
	$('.pagCadastro').hide();
	$('.listaPoi').show();
}

function procurarPontosProximos(){
	coord_x = parseFloat($('#xPoiPesquisa').val());
	coord_y = parseFloat($('#yPoiPesquisa').val());
	distMax = parseFloat($('#distPoi').val());

	var resultado = "<li><div class='col-md-3 col-lg-3'>Nome</div><div class='col-md-3 col-lg-3'>Coordenada X</div><div class='col-md-3 col-lg-3'>Coordenada Y</div><div class='col-md-3 col-lg-3'>Distância</div>";
	$.getJSON('db.json', function(data){
		for (var i in data.listaPoi) {

			x = parseFloat(data.listaPoi[i].x);
			y = parseFloat(data.listaPoi[i].y)
			aux1 = x - coord_x;
			aux2 = y - coord_y;

			soma = parseFloat((Math.pow(aux1,2)) + (Math.pow(aux2,2)));
			distancia = parseFloat(Math.sqrt(soma));

			if(  distMax >= distancia ){
				resultado +="<li><div class='col-md-3 col-lg-3'>" 
					+ data.listaPoi[i].nome + "</div><div class='col-md-3 col-lg-3'>" 
					+ data.listaPoi[i].x + "</div><div class='col-md-3 col-lg-3'>"
					+ data.listaPoi[i].x + "</div><div class='col-md-3 col-lg-3'>" 
					+ distancia + "</div></li>";
			}
		}

		var tbPontos = localStorage.getItem("tbPontos");
	    tbPontos = JSON.parse(tbPontos);
	    if(tbPontos == null){
    		$('.listaPoiProximidade ul').html(resultado);
	    }
	    else{
	    	for(var i in tbPontos){
				var pto = JSON.parse(tbPontos[i]);

				x = parseFloat(pto.x);
				y = parseFloat(pto.y)
				aux1 = x - coord_x;
				aux2 = y - coord_y;

				soma = parseFloat((Math.pow(aux1,2)) + (Math.pow(aux2,2)));
				distancia = parseFloat(Math.sqrt(soma));

				if(  distMax >= distancia ){
    				resultado +="<li><div class='col-md-3 col-lg-3'>" 
    					+ pto.nome + "</div><div class='col-md-3 col-lg-3'>" 
    					+ pto.x + "</div><div class='col-md-3 col-lg-3'>"
    					+ pto.x + "</div><div class='col-md-3 col-lg-3'>" 
    					+ distancia + "</div></li>";
				}
			}
			$('.listaPoiProximidade ul').html(resultado);
	    }
	});

	return false;
}

function adicionarPonto(){
	event.preventDefault();
	var tbPontos = localStorage.getItem("tbPontos");
    tbPontos = JSON.parse(tbPontos);
    if(tbPontos == null)
    	tbPontos = [];
	if ( $("#nomePoi").val() == '' || $("#nomePoi").val()== null || $("#xPoi").val() == '' || $("#xPoi").val()== null || $("#yPoi").val() == ''|| $("#yPoi").val()== null) {
		alert('Preencha corretamente os campos');
		return false;
	}
	else{
		var ponto = JSON.stringify({
			nome : $("#nomePoi").val(),
			x : $("#xPoi").val(),
			y : $("#yPoi").val()
		});
		tbPontos.push(ponto);
		localStorage.setItem("tbPontos", JSON.stringify(tbPontos));
		
		$('.mensagemSucesso').fadeIn(1500);
		setTimeout(function(){
			$('.mensagemSucesso').fadeOut();
			$("#nomePoi").val('');
			$("#xPoi").val('');
			$("#yPoi").val('');
		}, 3500);

		return false;
	}
}

$(function(){
    var tbPontos = localStorage.getItem("tbPontos");
    tbPontos = JSON.parse(tbPontos);
    if(tbPontos == null)
    	tbPontos = [];
});
