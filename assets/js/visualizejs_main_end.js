visualize({
    auth: {
        name: "jasperadmin",
        password: "jasperadmin",
        organization: "organization_1"
    }
}, function (v) {
	
	/*-- LAB_2_2 --*/
    v("#div_chart_1").report({
		resource: "/public/Samples/Reports/02._Sales_Mix_by_Demographic_Report",
		scrollToTop:false,
		scale: "height",
		error: function (err) {
			alert(err.message);
		}
	});
	
	/*-- LAB_2_3 --*/
	v("#div_chart_2").report({
		resource: "/public/Samples/Reports/States",
		scrollToTop:false,
		scale: "height",
		linkOptions: {
			events: {
				"mouseOut":function (ev, link) {},
				"mouseOver":function (ev, link) {},
				"select":function (ev, link) {},
				"click": function (ev, link) {             
					 if (link.type == "ReportExecution") {
						 /*-- LAB_2_4 --*/
						 //alert('You clicked on State: '+ link.parameters.store_state);						 
						 v("#div_chart_3").report({
							resource: "/public/Samples/Reports/Cities",
							scrollToTop:false,
							scale: "height",
							params: {
								state: [link.parameters.store_state]
							},
						});
						//console.log(link.parameters.store_state);
	 
					}
				}
			}
		},
		error: function (err) {
			alert(err.message);
		}
	});
	
	/*-- LAB_3_1 --*/
	var drinkFoodReport = v.report({
		resource: "/public/Samples/Reports/06g.ProfitDetailReport",
		scrollToTop:false,
		scale: "height",
		container:"#div_report_1",
		error: function (err) {
			alert(err.message);
		}
	});
	
	/*-- LAB_3_2 --*/
	$("#foodImage").on("click", function() {
		var params = {
			ProductFamily: ["Food"]
		};
		 
		drinkFoodReport.params(params).run()
			.fail(function(err) {
				alert(err.message);
			});
		 
	});
	
	/*-- LAB_3_3 --*/
	$("#drinkImage").on("click", function() {
		var params = {
			ProductFamily: ["Drink"]
		};
		 
		drinkFoodReport.params(params).run()
			.fail(function(err) {
				alert(err.message);
			});
		 
	});
	
	/*-- LAB_3_4 --*/
	var inputControls = v.inputControls({
		resource: "/public/Samples/Reports/06g.ProfitDetailReport",
		success: function(data){
			var productFamilyInputControl = _.findWhere(data, {
				id: "ProductFamily"});
				 
			_.each(productFamilyInputControl.state.options, function (option) {
				$("#productFamilySelector").append("<option " + 
					(option.selected ? "selected" : "") +
					" value='" + option.value + "'>" +
					option.label +
					"</option>");
			});
		}
	});
	 
	$("#productFamilySelector").on("change", function () {
		drinkFoodReport.params({
			"ProductFamily": [$(this).val()]
		}).run();
	});
	
	/*-- LAB_4_1 --*/
	v("#div_dashboard_1").dashboard({
		resource: "/public/Samples/Dashboards/4._New_Dashboard",
		error: function (err) {
			alert(err.message);
		}
	});
	
	/*-- LAB_4_2 --*/
	v.resourcesSearch({
		folderUri:"/public/Samples/Dashboards",
		recursive:false,
		types:["dashboard"],
		success: listRepository,
		error: function (err) {
			alert(err.message);
		}
	});
	
	/*-- LAB_4_3 --*/
	// Repo Lister
	function listRepository(results) {
		var dSelector = $("#dashboardSelector");
		dSelector.empty(); // remove old options
		$.each(results, function() {
			dSelector.append($("<option></option>")
			 .attr("value", this.uri).text(this.label));
		});
	 
		//console.log($("#select"));
		dSelector.change(function() {
			v.dashboard({
					resource: this.value,
					container: "#div_dashboard_1",
					error: function (err) {
						alert(err.message);
					}
			});
		});
		// To select the option to display as default via index
		$("#dashboardSelector option:eq(5)").prop("selected", true).change();
	}
 
});