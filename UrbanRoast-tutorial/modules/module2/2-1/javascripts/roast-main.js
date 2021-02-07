var recentTags = [];
var avgOnGoal = [];
var avgToProfile = [];
var avgRoasted = [];
var avgShipped = [];

var auth = {
    name: "superuser",
    password: "superuser"
}
initializeVisualize(initPage, auth);
function initPage(jrsConfig, v) {
    
    var progressGauges = v.adhocView({
        resource: "/public/Samples/FreshCoffee/Ad_Hoc_Views/Roastery/Coffee_Percentages",
        params: {
            coffee_name_1: ["aquamarine", "convergence"]
        },
        success: function() {
            renderGaugeData(progressGauges.data()._dataset_internal_)
        },
        error: function(e) {
            console.log(e);
        }
    });
    
    var first = v.adhocView({
        resource: "/public/Samples/FreshCoffee/Ad_Hoc_Views/Roastery/Coffee_List3",
        container: "#container1",
        success: function(ada) {
        },
        error: function(e) {
            console.log(e);
        },
        
        linkOptions: {
            events: {
                click: function(ev, data, defaultHandler, extendedData) {
                    //console.log(data, extendedData);
                    
                    //create row highlight on selection
                    $("tr").removeClass("my-selected");
                    $("tbody tr:nth-child(" + (extendedData.row.relativeIndex + 1) + ")").addClass("my-selected");
        
                    //Send selected coffee in parent report to tag input control
                    var coffeeSelected = [data["public_coffee.coffee_name"]]
                    taggle.add(coffeeSelected);

                    //Check for current coffee tags and run ad hoc views with them
                    var allSelected = taggle.getTagValues();
                    
                    progressGauges.params({
                        coffee_name_1: allSelected
                    }).run().done(function(data) {
                    renderGaugeData(data._dataset_internal_)
                    }).fail(function(e) {
                        console.log(e);
                    });
                    
                    second.params({
                        coffee_name_1: allSelected
                    }).run().fail(function(e) {
                        console.log(e);
                    });

                    third.params({
                        coffee_name_1: allSelected
                    }).run().fail(function(e) {
                        console.log(e);
                    });

                    fourth.params({
                        coffee_name_1: allSelected
                    }).run().fail(function(e) {
                        console.log(e);
                    });

                    fifth.params({
                        coffee_name_1: allSelected
                    }).run().fail(function(e) {
                        console.log(e);
                    });
                }
            }
        }
    });

    var country = $("#coffeeCountry");
    var blend = $("#coffeeBlend");
    var aroma = $("#coffeeAroma");
    var ic = v.inputControls({
        resource: "/public/Samples/FreshCoffee/Ad_Hoc_Views/Roastery/Coffee_List3",
        success: function(data) {

            data.forEach(function(control) {

                if (control.id == "origin_country_1") {
                    var _opt = control.state.options;
                    //console.log("All values for Country");
                    //console.log(_opt[0]);
                    _opt.forEach(function(val) {
                        //console.log(val.value);
                        var o = new Option(val.label, val.value, val.selected);
                        country.append(o);
                    });
                }

                if (control.id == "blend_1") {
                    var _opt = control.state.options;
                    //console.log("All values for Blends");
                    _opt.forEach(function(val) {
                        //console.log(val.value);
                        var o = new Option(val.label, val.value, val.selected);
                        blend.append(o);
                    });
                }

                if (control.id == "aroma1_1") {
                    var _opt = control.state.options;
                    //console.log("All values for Aroma1");
                    _opt.forEach(function(val) {
                        //console.log(val.value);
                        var o = new Option(val.label, val.value, val.selected);
                        aroma.append(o);
                    });
                }
            });
            //console.log(data);

            renderInputControls()

        },
        error: function(e) {
            alert(e);
        }
    });

    var second = v.adhocView({
        resource: "/public/Samples/FreshCoffee/Ad_Hoc_Views/Roastery/Coffee_Scores",
        container: "#container2",
        linkOptions: {
            events: {
                click: function(ev, data, defaultHandler, extendedData) {
                    //console.log(data, extendedData);
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
        resource: "/public/Samples/FreshCoffee/Ad_Hoc_Views/Roastery/Roast_efficiency",
        container: "#container3",
        linkOptions: {
            events: {
                click: function(ev, data, defaultHandler, extendedData) {
                    //console.log(data, extendedData);
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
            //console.log(e);
        }
    });

    var fourth = v.adhocView({
        resource: "/public/Samples/FreshCoffee/Ad_Hoc_Views/Roastery/Average_Reduction_by_Blend_and_Country",
        container: "#container4",
        linkOptions: {
            events: {
                click: function(ev, data, defaultHandler, extendedData) {
                    //console.log(data, extendedData);
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

    var fifth = v.adhocView({
        resource: "/public/Samples/FreshCoffee/Ad_Hoc_Views/Roastery/Raw_Bean_used_by_Country_and_Blend",
        container: "#container5",
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

    var taggle = new Taggle('coffeeTag', {
        onTagAdd: function(event, tag) {
            updateReports()
        },
        onTagRemove: function(event, tag) {
            var delayMillis = 500; //.7 second delay for removing multiple tags
            setTimeout(function() {
                updateReports()
            }, delayMillis);
        }
    });
    
    function updateReports() {
        var recentTags = taggle.getTagValues();
        window.recentTags = recentTags;
        
        progressGauges.params({
            coffee_name_1: recentTags
        }).run().done(function(data) {
            renderGaugeData(data._dataset_internal_)
        }).fail(function(e) {
            console.log(e);
        });
        
        second.params({
            coffee_name_1: recentTags
        }).run().fail(function(e) {
            console.log(e);
        });

        third.params({
            coffee_name_1: recentTags
        }).run().fail(function(e) {
            console.log(e);
        });

        fourth.params({
            coffee_name_1: recentTags
        }).run().fail(function(e) {
            console.log(e);
        });
    }

    function renderInputControls() {
        $(document).ready(function() {
            $('#coffeeCountry').multiselect({
                includeSelectAllOption: true
            });
        });
        
        $(document).ready(function() {
            $('#coffeeBlend').multiselect({
                includeSelectAllOption: true
            });
        });
        
        $(document).ready(function() {
            $('#coffeeAroma').multiselect({
                includeSelectAllOption: true
                //enableClickableOptGroups: true
            });
        });
    }

    $('#coffeeCountry').on('change', function(){
        var changeCountry = $(this).val();
        first.params({
            origin_country_1: changeCountry
        }).run().fail(function(e) {
            console.log(e);
        });
    });

    $('#coffeeBlend').on('change', function(){
        var changeBlend = $(this).val();
        first.params({
            blend_1: changeBlend
        }).run().fail(function(e) {
            console.log(e);
        });
    });

    $('#coffeeAroma').on('change', function(){
        var changeAroma = $(this).val();
        first.params({
            aroma1_1: changeAroma
        }).run().fail(function(e) {
            console.log(e);
        });
    });

    function updateOnMap(mapSelections) {
        first.params({
            country_code_1: mapSelections
        }).run().fail(function(e) {
            console.log(e);
        });
    }
}

function renderGaugeData(data) {
    //console.log(data);
    //get the col and row count from the ad hoc view data object
    //minus 1 to account for only using 4 of the 5 columns
    var numCol = (data.levels[1].detail.fields.length) - 1;
    var numRow = data.counts;
    var onGoal = [];
    var toProfile = [];
    var roasted = [];
    var shipped = [];
    
    //loop through the desired columns (last 4) and push data to prepared arrays
    for (var col = 0; col < numCol; col++) {
        for (var i = 0; i < numRow; i++) {
            eachRow = data.levelDataNodes[0].all.children[0].detail.data[i][col+1];
            if (col === 0) { onGoal.push(Number(eachRow)) }
            if (col === 1) { toProfile.push(Number(eachRow)) }
            if (col === 2) { roasted.push(Number(eachRow)) }
            if (col === 3) { shipped.push(Number(eachRow)) }
        }
    }
    
    //use to calculate the sum of all values in each array (column)
    function getSum(total, num) {
        return total + num;
    }
    
    //calculate the average of all values in each array (column)
    avgOnGoal = onGoal.reduce(getSum).toFixed(1) / numRow;
    avgToProfile = toProfile.reduce(getSum).toFixed(1) / numRow;
    avgRoasted = roasted.reduce(getSum).toFixed(1) / numRow;
    avgShipped = shipped.reduce(getSum).toFixed(1) / numRow;
    
    //send averages for all selected coffee blends to D3 gauges
    gauge1.update(avgOnGoal.toFixed(1));
    gauge2.update(avgToProfile.toFixed(1));
    gauge3.update(avgRoasted.toFixed(1));
    gauge4.update(avgShipped.toFixed(1));
     
}

//build the progress gauge    
var configLarge = liquidFillGaugeDefaultSettings();
configLarge.circleColor = "#D4AB6A";
configLarge.textColor = "#422703";
configLarge.waveTextColor = "#724c10";
configLarge.waveColor = "#bc8f56";
configLarge.circleThickness = 0.07;
configLarge.circleFillGap = 0.16;
configLarge.textVertPosition = 0.5;
configLarge.waveAnimateTime = 3000;
configLarge.waveHeight = 0.09;
configLarge.waveCount = 1;

var configSmall = liquidFillGaugeDefaultSettings();    
configSmall.circleColor = "#178BCA";
configSmall.textColor = "#045681";
configSmall.waveTextColor = "#A4DBf8"; 
configSmall.waveColor = "#178BCA";
configSmall.circleThickness = 0.05; 
configSmall.circleFillGap = 0.17;  
configSmall.textVertPosition = 0.5; 
configSmall.waveAnimateTime = 3000;  
configSmall.waveHeight = 0.08;
configSmall.waveCount = 1;

var gauge1 = loadLiquidFillGauge("fillgauge1", 0, configLarge);    
var gauge2 = loadLiquidFillGauge("fillgauge2", 0, configSmall);    
var gauge3 = loadLiquidFillGauge("fillgauge3", 0, configSmall);
var gauge4 = loadLiquidFillGauge("fillgauge4", 0, configSmall); 


function createInput() {
    var $input = $('<input type="button" value="new button" />');
    $input.appendTo($("body"));

    sessionStorage.setItem("sent", JSON.stringify(window.recentTags));
    window.open("roast-report1.html","_self");
}
