var locations = ["5th Street Cafe","Belmont Street Cafe","Franklin Street Cafe","Main Street Roastery and Cafe"]
var selectedLocation = [];
var startDate = ["2014-01-1"];
var endDate = ["2014-09-1"];
minDate = [];
maxDate = [];



var auth = {
    name: "jasperadmin",
    password: "jasperadmin",
    organization: "organization_1"
}
initializeVisualize(initPage, auth);
function initPage(jrsConfig , v) {
    var crosstab = v.adhocView({
        resource: "/public/Samples/FreshCoffee/Ad_Hoc_Views/Management/Location_List",
        container: "#manage-view1",
        error: function(e) {
            console.log(e);
        },
        linkOptions: {
            
        }
    });

    var columnSpline = v.adhocView({
        resource: "/public/Samples/FreshCoffee/Ad_Hoc_Views/Management/Net_Sales___Total_Cost_and_Gross_Profit",
        container: "#manage-view2",
        linkOptions: {
            events: {
                click: function(ev, data, defaultHandler, extendedData) {
                    var dateSelected = [data["public_sales.date_by_month"]];

                    sessionStorage.setItem("dateSent", JSON.stringify(dateSelected));
                    window.open("locations-dashboard1.html","_self");
                }
            }
        },
        error: function(e) {
            console.log(e);
        }
    });
    
    
    
    
    
    
    var totalNumbers = v.adhocView({
        resource: "/public/Samples/FreshCoffee/Ad_Hoc_Views/Management/Total_Performance_Numbers",
        success: function() {
      	     
      	     var data = totalNumbers.data()._dataset_internal_.data;
        
            //render select ad hoc view data
            renderTotalsData(data);

      },
        error: function(e) {
            console.log(e);
        }
    });
    
    function renderTotalsData(data) {
        var sales = "$"+Math.round(data[0]).toLocaleString();
        var cost = "$"+Math.round(data[1]).toLocaleString();
        var profit = "$"+Math.round(data[2]).toLocaleString();
        
        document.getElementById("salesTotal").textContent=sales;
        document.getElementById("costTotal").textContent=cost;
        document.getElementById("profitTotal").textContent=profit;
        
    }
    
    function clickOnMarker(locationName) {
        selectedLocation[0] = locationName;

        crosstab.params({
            location_1: selectedLocation
        }).run().fail(function(e) {
            console.log(e);
        });

        columnSpline.params({
            location_1: selectedLocation
        }).run().fail(function(e) {
            console.log(e);
        });
        
        totalNumbers.params({
            location_1: selectedLocation
        }).run().fail(function(e) {
            console.log(e);
        });
    }

    $("#date-slider").dateRangeSlider({
        bounds: {min: new Date(2014, 0, 1), max: new Date(2017, 2, 1, 12, 59, 59)},
        defaultValues: {min: new Date(2014, 0, 1), max: new Date(2016, 0, 1)},
        range: {min: {days: 1}, max: {years: 2}},
        valueLabels: "change",
        delayOut: 4500
    }).on("valuesChanged", function(e, data){
        console.log("Something moved. min: " + data.values.min + " max: " + data.values.max);
        minDate = formatDate(data.values.min)
        maxDate = formatDate(data.values.max)
        console.log("The formatted min date is " + minDate)
        console.log("The formatted max date is " + maxDate)

        crosstab.params({
            date_by_month_1: minDate,
            date_by_month_2: maxDate
        }).run().fail(function(e) {
            console.log(e);
        });
        
        columnSpline.params({
            date_by_month_1: minDate,
            date_by_month_2: maxDate
        }).run().fail(function(e) {
            console.log(e);
        });
        
        totalNumbers.params({
            date_by_month_1: minDate,
            date_by_month_2: maxDate
        }).run().fail(function(e) {
            console.log(e);
        });  
    });

    function formatDate(date) {
        console.log(date);
        var completeDate = new Array();
        var monthNames = [
            "01", "02", "03",
            "04", "05", "06", "07",
            "08", "09", "10",
            "11", "12"
        ];

        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();

        completeDate[0] = year + '-' + monthNames[monthIndex] + '-' + day;
        return completeDate
    }

    var mymap = L.map('mapid').setView([51.505, -0.09], 13);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
        id: 'mapbox.streets'
    }).addTo(mymap);

    var marker = new L.Marker([51.5, -0.09])
        .bindPopup(locations[0])
        .on('click', function() {
            clickOnMarker(locations[0])
        })
        .addTo(mymap);

    var circle = L.circle([51.5, -0.09], {
        color: '#7F3303',
        fillColor: '#CD853F',
        fillOpacity: 0.5,
        radius: 400
    })
        .bindPopup(locations[0])
        .on('click', function() {
            clickOnMarker(locations[0])
        })
        .addTo(mymap);

    var marker = new L.Marker([51.509, -0.08])
        .bindPopup(locations[1])
        .on('click', function() {
            clickOnMarker(locations[1])
        })
        .addTo(mymap);

    var circle = L.circle([51.509, -0.08], {
        color: '#7F3303',
        fillColor: '#CD853F',
        fillOpacity: 0.5,
        radius: 270
    })
        .bindPopup(locations[1])
        .on('click', function() {
            clickOnMarker(locations[1])
        })
        .addTo(mymap);

    var marker = new L.Marker([51.503, -0.06])
        .bindPopup(locations[2])
        .on('click', function() {
            clickOnMarker(locations[2])
        })
        .addTo(mymap);

    var circle = L.circle([51.503, -0.06], {
        color: '#7F3303',
        fillColor: '#CD853F',
        fillOpacity: 0.5,
        radius: 450
    })
        .bindPopup(locations[2])
        .on('click', function() {
            clickOnMarker(locations[2])
        })
        .addTo(mymap);

    var marker = new L.Marker([51.508, -0.11])
        .bindPopup(locations[3])
        .on('click', function() {
            clickOnMarker(locations[3])
        })
        .addTo(mymap);

    var circle = L.circle([51.508, -0.11], {
        color: '#7F3303',
        fillColor: '#CD853F',
        fillOpacity: 0.5,
        radius: 650
    })
        .bindPopup(locations[3])
        .on('click', function() {
            clickOnMarker(locations[3])
        })
        .addTo(mymap);
}
