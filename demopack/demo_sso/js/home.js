$(function() {

	$('#navbarCollapse').find('a').each(function() {
	    $(this).removeClass( "d-none" );
	});


	let tokenDiv = $("#tokenDiv");

	tokenDiv.html(GetParameterValues("token"));

	function GetParameterValues(param) {  
	    var url_string = window.location.href; //window.location.href
		var url = new URL(url_string);
		var c = url.searchParams.get(param);
		return c;
	}  

	$("#loggedInUser").removeClass( "d-none" );
	$("#loggedInUser").html(getCookie("jrsUser") + " - Log Out");

	var configPath = '../../config/config.json';
	var  auth = {
		token: encodeURI(GetParameterValues("token")),
		preAuth: true,
		tokenName: "pp"
	}
	initializeVisualize(initPage, auth, configPath);
	function initPage (jrsConfig, v) {

	    //render report from provided resource
	    v("#dashboard").report({
	        resource: "/public/Samples/Reports/01._Geographic_Results_by_Segment_Report",
	        error: handleError
	    });

	    //show error
	    function handleError(err) {
	        alert(err.message);
	    }
	}

	$("#loggedInUser").click(function(){

		setCookie("jrsUser","",-10);

		window.location.href = "index.html"

	});


});
