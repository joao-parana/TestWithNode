// jQuery versão 2.1.1 ou superior
var jsdom = require("jsdom");
var window = jsdom.jsdom().parentWindow;
var jQuery = require("jquery")(window);
jQuery.support.cors = true;
// Versão OO
function object(o) {
	function F() {}
	F.prototype = o;
	return new F();
}
var model = { lines: '' };
var myModel = object(model);
var $ = jQuery;
/*
myModel.renderContent = function () {
  $('#myDiv').html($('<ul>' + this.lines + '</ul>'));
  console.log($('body').html());
};​*/
myModel.loadContent = function($, url, title) {
  // Since the jQuery.ajax method returns a jqXHR object, which is derived from a
  // Deferred object, we can attach handlers using the .then method
  var jqXhr = $.ajax({
    type: "GET",
    /* contentType: "application/json; charset=utf-8", */
		contentType: "text/html; charset=utf-8",
    data: "<div>ERRO</div>", 
    dataType: "html",
    url: url,
    error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log(errorThrown);
    }
  });
  jqXhr.then(this.sortContent);
};
myModel.sortContent = function (data) {
  var myArray = [];
  for( var i in data ) {
    if (data.hasOwnProperty(i)){
       myArray.push(data[i]);
    }
  }
  var ordered = [];
  ordered = myArray.sort();
  var linhas = ordered.map(
    function(item) {
      return '<li>' + item + '</li>';
    }
  );
  myModel.lines = linhas.join(' ');
  myModel.renderContent();
};
(function() {
  var host = "luma.cepel.br";
	var port = 1443;
	var urlBase = "http://" + host + ":" + port + "/hawtio/#/jmx";
	var services = {
		historical : "attributes?nid=root-br.cepel.soma-somaService-HistoricalService"
		
	};
  for( var i in services ) {
    if (services.hasOwnProperty(i)){
			var url = urlBase + "/" + services[i];
			var title = i;
			console.log(url);
      myModel.loadContent(jQuery, url, title); 
    }
  }
  
}());