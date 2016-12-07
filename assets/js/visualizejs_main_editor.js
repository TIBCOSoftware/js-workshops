$(function() {
	eval(OnlineJsEditor.getCode());
	
	
	$( "#linkLoadSolution" ).click(function() {
		$.get( "assets/js/visualizejs_main_end.js", function( data ) {
		  OnlineJsEditor.setCode( data );
		});
	});
});