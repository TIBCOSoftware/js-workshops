$(function() {

	function GetParameterValues(param) {  
	    var url_string = window.location.href; //window.location.href
		var url = new URL(url_string);
		var c = url.searchParams.get(param);
		return c;
	}  

	visualize({
	    auth: {
	        token: encodeURI(GetParameterValues("token")),
			preAuth: true,
			tokenName: "pp"
	    }
	}, function (v) {

	    //render report from provided resource
	    v("#report").report({
	        resource: "/public/Samples/Reports/01._Geographic_Results_by_Segment_Report",
	        error: handleError
	    });

	    //show error
	    function handleError(err) {
	        alert(err.message);
	    }
	});
});