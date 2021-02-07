$(document).ready(function(){
    
    //This sessionStorage.getItem(); is also a predefined function in javascript
    //will retrieve session and get the value;
    var selectedDate = JSON.parse(sessionStorage.getItem("dateSent"));
    var selectedLocation = JSON.parse(sessionStorage.getItem("locationSent"));

    $('#date').html(selectedDate);
    $('#location').html(selectedLocation);

    var location = ["5th Street Cafe"];

    var auth = {
        name: "superuser",
        password: "superuser"
    }
    initializeVisualize(initPage, auth);
    function initPage(jrsConfig, v) {

        var first = v.adhocView({
            resource: "/public/Samples/FreshCoffee/Ad_Hoc_Views/Management/DailyDrilldown___Sales_and_Profit",
            container: "#dailyDrilldown1",
            params: {
                "date_by_month_1": selectedDate,
                "location_1": selectedLocation
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
                    }
                }
            }
        });

        var second = v.adhocView({
            resource: "/public/Samples/FreshCoffee/Ad_Hoc_Views/Management/DailyDrilldown___Profit_Margin",
            container: "#dailyDrilldown2",
            params: {
                "date_by_month_1": selectedDate,
                "location_1": selectedLocation
            },
            linkOptions: {
                events: {
                    click: function(ev, data, defaultHandler, extendedData) {
                        console.log(data, extendedData);
                    }
                },
                beforeRender: function(pairs) {
                    //console.log(pairs);
                }
            },
            success: function() {
            },
            error: function(e) {
                console.log(e);
            }
        });

        var third = v.adhocView({
            resource: "/public/Samples/FreshCoffee/Ad_Hoc_Views/Management/DailyDrilldown___Operational_Metrics",
            container: "#dailyDrilldown3",
            params: {
                "date_by_month_1": selectedDate,
                "location_1": selectedLocation
            },
            linkOptions: {
                events: {
                    click: function(ev, data, defaultHandler, extendedData) {
                        console.log(data, extendedData);
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
                "date_by_month_1": selectedDate,
                "location_1": selectedLocation
            },
            linkOptions: {
                events: {
                    click: function(ev, data, defaultHandler, extendedData) {
                        console.log(data, extendedData);
                    }
                },
                beforeRender: function(pairs) {
                    //console.log(pairs);
                }
            },
            error: function(e) {
                console.log(e);
            }
        });
    }
});
