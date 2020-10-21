var locations = ["5th Street Cafe","Belmont Street Cafe","Franklin Street Cafe","Main Street Roastery and Cafe"]
var selectedLocation = [];

initializeVisualize(initPage);

function initPage(jrsConfig, v) {
    var barChart = v.adhocView({
        resource: "/public/Samples/FreshCoffee/Ad_Hoc_Views/Management/Net_Sales___Total_Cost_and_Gross_Profit",
        container: "#bar",
        success: function(){
            console.log(barChart.data().metadata.inputParameters);
        },
        error: function(e) {
            console.log(e);
        }
    });
    
    function clickOnMarker(locationName) {
        selectedLocation[0] = locationName;
        barChart.params({
            location_1: selectedLocation
        }).run().fail(function(e) {
            console.log(e);
        }); 
    }
    
}
