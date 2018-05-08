$(document).ready(function(){
    //This sessionStorage.getItem(); is also a predefined function in javascript
    //will retrieve session and get the value;

    var selectedDate = JSON.parse(sessionStorage.getItem("dateSent"));
    //console.log(selectedDate);

    $('#date').html(selectedDate);

    //formattedDate = formatDate(selectedDate);
    //console.log("The formatted date is " + formattedDate);

    visualize({
        auth: {
            name: "superuser",
            password: "superuser"
        }
    }, function(v) {

        var first = v.adhocView({
            resource: "/public/Samples/FreshCoffee/Ad_Hoc_Views/Management/DailyDrilldown___Sales_and_Profit",
            container: "#dailyDrilldown1",
            params: {
                "date_by_month_1": selectedDate
            },
            success: function(ada) {
            },
            error: function(e) {
                console.log(e);
            },
            linkOptions: {
                events: {
                    click: function(ev, data, defaultHandler, extendedData) {
                        console.log(data, extendedData);

                        var locationSelected = [data["public_sales.location"]];
                        console.log(locationSelected);

                        sessionStorage.setItem("locationSent", JSON.stringify(locationSelected));
                        window.open("locations-dashboard2.html","_self");
                    }
                }
            }
        });

        var second = v.adhocView({
            resource: "/public/Samples/FreshCoffee/Ad_Hoc_Views/Management/DailyDrilldown___Profit_Margin",
            container: "#dailyDrilldown2",
            params: {
                "date_by_month_1": selectedDate
            },
            linkOptions: {
                events: {
                    click: function(ev, data, defaultHandler, extendedData) {
                        console.log(data, extendedData);

                        var locationSelected = [data["public_sales.location"]];
                        console.log(locationSelected);

                        sessionStorage.setItem("locationSent", JSON.stringify(locationSelected));
                        window.open("locations-dashboard2.html","_self");

                    }
                },
                beforeRender: function(pairs) {
                    //console.log(pairs);
                }
            },
            success: function() {
                //console.log("rendered");
            },
            error: function(e) {
                console.log(e);
            }
        });


        var third = v.adhocView({
            resource: "/public/Samples/FreshCoffee/Ad_Hoc_Views/Management/DailyDrilldown___Operational_Metrics",
            container: "#dailyDrilldown3",
            params: {
                "date_by_month_1": selectedDate
            },
            linkOptions: {
                events: {
                    click: function(ev, data, defaultHandler, extendedData) {
                        console.log(data, extendedData);

                        var locationSelected = [data["public_sales.location"]];
                        console.log(locationSelected);

                        sessionStorage.setItem("locationSent", JSON.stringify(locationSelected));
                        window.open("locations-dashboard2.html","_self");

                    }
                },
                beforeRender: function(pairs) {
                    //console.log(pairs);
                }
            },
            success: function() {
                //console.log("rendered");
            },
            error: function(e) {
                console.log(e);
            }
        });

        var fourth = v.adhocView({
            resource: "/public/Samples/FreshCoffee/Ad_Hoc_Views/Management/DailyDrilldown___Cost_Analysis",
            container: "#dailyDrilldown4",
            params: {
                "date_by_month_1": selectedDate
            },
            linkOptions: {
                events: {
                    click: function(ev, data, defaultHandler, extendedData) {
                        console.log(data, extendedData);

                        var locationSelected = [data["public_sales.location"]];
                        console.log(locationSelected);

                        sessionStorage.setItem("locationSent", JSON.stringify(locationSelected));
                        window.open("locations-dashboard2.html","_self");

                    }
                },
                beforeRender: function(pairs) {
                    //console.log(pairs);
                }
            },
            success: function() {
                //console.log("rendered");
            },
            error: function(e) {
                console.log(e);
            }
        });
    });
});