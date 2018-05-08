// configuration for JRS repo and embedded page ids
var pageConfig = {
    drinkReport: {
        uri: '/public/Samples/FreshCoffee/Ad_Hoc_Views/Cafe/Drink_List',
        container: '#cafeDrink'
    },
    ingredientReport: {
        uri: '/public/Samples/FreshCoffee/Ad_Hoc_Views/Cafe/Ingredient_List',
        container: '#cafeIngredient'
    }
};

// create and initialize first selected drink object
var drink = {
    name: 'Americano',
    customized: 'false',
    iced: 'false',
    whipped: 'false',
    syrup: { name: 'Standard', percent: 0, rating: '' },
    water: { name: 'Standard', percent: 60, rating: '' },
    milk: { name: 'Whole', percent: 0, rating: '' },
    cream: { name: 'Half and Half', percent: 0, rating: '' },
    liquor: { name: 'House Blend', percent: 0, rating: '' },
    espresso: { name: 'House Blend', percent: 40, rating: '' },
    coffee: { name: 'House Blend', percent: 0, rating: '' },
    numberCups: '5000'
};

// initialize variable for order
var order = [];

// create string to be used for a custom drink name
var customName = "Custom " + drink.name;

// initialize Visualize.js
function initPage() {
    visualize({
        auth: {
            name: "jasperadmin",
            password: "jasperadmin",
            organization: "organization_1"
        }
    }, function(v) {

        // load the ad hoc views and report
        loadViews(v);
        
        var orderPage = 0;
        $("#orderBtn").click(function () {
            
            // run report with dynamic JSON order data
            report
                .params({
                    "json_data": [JSON.stringify(order)]
                })
                .run()
                // wait until report is done running with params and then show most recent page
                .done(function(){report.pages(++orderPage).run();})
                .fail(function (err) {
                    console.log(err);
                });
        }); 
    });
}

initPage();

function loadViews(v) {
    
    report = v.report({
        resource: "/public/Samples/FreshCoffee/Reports/cafe1_1",
        container: "#cafeIngredient",
        success: function () {
        },
        params: {
            "json_data": [JSON.stringify(order)]
        },
        error: function (error) {
            console.log(error);
        }
    });

    ingredientView(pageConfig.ingredientReport.uri);

    function ingredientView(uri) {
        adhocIngredient = v.adhocView({
            resource: uri,
            container: "#cafeIngredient",
            linkOptions: {
                events: {
                     click: function(ev, data) {
                         type = data["public_ingredient.type"];
                         ing = data["public_ingredient.name"];
                         document.getElementById("ingTypeHeader").textContent=type + ": ";
                         document.getElementById("ingHeader").textContent=ing;

                         typeRef = (type).toLowerCase();
                         drink[typeRef].name = ing;

                         if (type === 'Syrup') {
                             $('.ingHeader').css('color', '#7c6061');
                         }
                         else if (type === 'Water') {
                             $('.ingHeader').css('color', '#1794b5');
                         }
                         else if (type === 'Milk') {
                             $('.ingHeader').css('color', '#F9F9F9');
                         }
                         else if (type === 'Cream') {
                             $('.ingHeader').css('color', '#f9efc7');
                         }
                         else if (type === 'Liquor') {
                             $('.ingHeader').css('color', '#a3631f');
                         }
                         else if (type === 'Espresso') {
                             $('.ingHeader').css('color', '#7F3303');
                         }
                         else if (type === 'Coffee') {
                             $('.ingHeader').css('color', '#3D1A03');
                         }
                     }
                }
            },
            error: function (err) {
                alert(err.message);
            }
        });
    }

    function reRunParams(ing) {
        pageConfig.ingredientReport.uri = '/public/Samples/FreshCoffee/Ad_Hoc_Views/Cafe/Ingredient_List' + '___' + ing;
        ingredientView(pageConfig.ingredientReport.uri);
        currentIng = drink.syrup.name;
    }
    
    customCup(drink.syrup.percent, drink.water.percent, drink.milk.percent, drink.cream.percent, drink.liquor.percent,
        drink.espresso.percent, drink.coffee.percent);
    
    window.reRunParams = reRunParams;

    var initialSortType = "alpha-desc";
    
    var customDrinkList = v.adhocView({
        resource: pageConfig.drinkReport.uri,
        success: function (data) {
            useData(data, initialSortType);

            $("#filterAlpha").click(
                function () {
                    filterSort();
                    if (alphaClick === zaSelected) {
                        var sortType="alpha-asc";
                        useData(data, sortType);
                    } else {
                        var sortType = "alpha-desc";
                        useData(data, sortType);
                    }
                    $("#filterAlpha").attr('src', alphaClick);
                }
            );

            $("#filterCaf").click(
                function () {
                    filterSort();
                    if (cafClick === cafUpSel) {
                        var sortType="caf-desc";
                        useData(data, sortType);
                    } else {
                        var sortType = "caf-asc";
                        useData(data, sortType);
                    }
                    $("#filterCaf").attr('src', cafClick);
                }
            );

            $("#filterSug").click(
                function () {
                    filterSort();
                    if (sugClick === sugUpSel) {
                        var sortType="sug-desc";
                        useData(data, sortType);
                    } else {
                        var sortType="sug-asc";
                        useData(data, sortType);
                    }
                    $("#filterSug").attr('src', sugClick);
                }
            );
        },
        error: function () {
            alert("error");
            console.log(arguments);
        }
    });

    // Instantiate a caf and sug slider
    var cafSlider = $("#cafSlider").bootstrapSlider();
    var sugSlider = $("#sugSlider").bootstrapSlider();

    // Call a method on the caf slider
    $('#cafSlider').on('slideStop', function () {
        var cafValue = cafSlider.bootstrapSlider('getValue');

        customDrinkList.params({
            caf_perc_1: [cafValue[0]],
            caf_perc_2: [cafValue[1]]
        }).run().fail(function(e) {
            console.log(e);
        });

        var newData = v.adhocView({
            resource: pageConfig.drinkReport.uri,
            params: {caf_perc_1: [cafValue[0]], caf_perc_2: [cafValue[1]]},
            success: function (data) {
                resetDrinkView();
                useData(data);
            },
            error: function () {
                alert("error");
                console.log(arguments);
            }
        });
    });

    // Call a method on the sug slider
    $('#sugSlider').on('slideStop', function () {
        var sugValue = sugSlider.bootstrapSlider('getValue');

        customDrinkList.params({
            sug_perc_1: [sugValue[0]],
            sug_perc_2: [sugValue[1]]
        }).run().fail(function(e) {
            console.log(e);
        });

        var newData = v.adhocView({
            resource: pageConfig.drinkReport.uri,
            params: {sug_perc_1: [sugValue[0]], sug_perc_2: [sugValue[1]]},
            success: function (data) {
                resetDrinkView();
                useData(data);
                console.log(data);
            },
            error: function () {
                alert("error");
                console.log(arguments);
            }
        });
    });

    currentPrimaryName = "Americano";
    
    function useData (data, sortType) {
        
        var nameData = [];
        var svgNameData = [];
        var cafData = [];
        var sugData = [];
        var drinkUrls = [];

        var pctSyrup = [];
        var pctWater = [];
        var pctMilk = [];
        var pctCream = [];
        var pctLiquor = [];
        var pctEspresso = [];
        var pctCoffee = [];
        var hasIce = [];
        var hasWhip = [];
   
        var numCol = 16;
        var numRow = data._dataset_internal_.counts;

        for (var col = 0; col < numCol; col++) {
            for (var row = 0; row < numRow; row++) {
                eachRow = data._dataset_internal_.levelDataNodes[0].detail.data[row][col];
                if (col === 0) { nameData.push(eachRow) }
                if (col === 0) { svgNameData.push(eachRow) }
                if (col === 5) { cafData.push(eachRow) }
                if (col === 6) { sugData.push(eachRow) }

                if (col === 7) { pctSyrup.push(eachRow) }
                if (col === 8) { pctWater.push(eachRow) }
                if (col === 9) { pctMilk.push(eachRow) }
                if (col === 10) { pctCream.push(eachRow) }
                if (col === 11) { pctLiquor.push(eachRow) }
                if (col === 12) { pctEspresso.push(eachRow) }
                if (col === 13) { pctCoffee.push(eachRow) }
                if (col === 14) { hasIce.push(eachRow) }
                if (col === 15) { hasWhip.push(eachRow) }
            }
        }

        
        sortData(nameData, svgNameData, cafData, sugData, pctSyrup, pctWater, pctMilk, pctCream, pctLiquor, pctEspresso, pctCoffee, hasIce, hasWhip, sortType);
        
        renderData();

        function renderData() {
            //Push drink data to html elements
            var storeID = [];
            for (var p = 0; p < numRow; p++) {
                var drinkID = ("name-"+(p+1));
                var cafLabelID = ("caf-"+(p+1));
                var sugLabelID = ("sug-"+(p+1));
                var cafDataID = ("c"+(p+1));
                var sugDataID = ("s"+(p+1));
                storeID.push(drinkID);

                document.getElementById(drinkID).textContent=nameData[p];
                document.getElementById(cafLabelID).textContent="Caffeine: ";
                document.getElementById(sugLabelID).textContent="Sugar: ";
                document.getElementById(cafDataID).textContent=cafData[p];
                document.getElementById(sugDataID).textContent=sugData[p];
            }

            ingredientList = [];
            returnIngredient(nameData[0]);

            //Remove spaces and create url from each drink name
            for (var i = 0; i < numRow; i++) {
                svgNameData[i] = svgNameData[i].replace(/\s+/g, '');
                drinkUrls.push("../../../resources/svg/cups/cup-"+svgNameData[i]+".svg");
            }

            //Loop through urls and pass to each element ID
            for (var o = 0; o < (numRow); o++) {
                var urlID = ("drink" + (o + 1));
                document.getElementById(urlID).data=drinkUrls[o];
            }

            //remove any previous click events that may have been created
            for(let c = 0; c < (numRow + 1); c++) {
                $('#d' + c).off("click");
            }

            //add the click events for each drink
            for(let j = 0; j < (numRow + 1); j++) {
                $('#d' + j).click( function() {
                    ingredientType = [];
                    returnIngredient(nameData[j - 1]);
                    drink.name = nameData[j - 1];
                    customName = "Custom " + drink.name;
                    
                    drink.syrup.percent = pctSyrup[j-1];
                    drink.water.percent = pctWater[j-1];
                    drink.milk.percent = pctMilk[j-1];
                    drink.cream.percent = pctCream[j-1];
                    drink.liquor.percent = pctLiquor[j-1];
                    drink.espresso.percent = pctEspresso[j-1];
                    drink.coffee.percent = pctCoffee[j-1];

                    adhocIngredient.params({
                        type_1: ingredientList
                    }).run().fail(function(e) {
                        console.log(e);
                    });

                    slider.__proto__.initialise(pctSyrup[j-1] + "%", pctWater[j-1] + "%", pctMilk[j-1] + "%", pctCream[j-1] + "%", pctLiquor[j-1] + "%",
                        pctEspresso[j-1] + "%", pctCoffee[j-1] + "%");

                    customCup(Number(pctSyrup[j-1]), Number(pctWater[j-1]), Number(pctMilk[j-1]), Number(pctCream[j-1]), Number(pctLiquor[j-1]),
                        Number(pctEspresso[j-1]), Number(pctCoffee[j-1]));

                    updateFromImages(hasIce[j-1], hasWhip[j-1]);
                    currentPrimaryName = nameData[j - 1];

                    return currentPrimaryName;
                });
            }
        }
    }

    function resetDrinkView() {
        for (var i = 0; i < 15; i++) {
            document.getElementById("drink"+(i + 1)).data='';
            document.getElementById("name-"+(i+1)).textContent = '';
            document.getElementById("caf-"+(i+1)).textContent = '';
            document.getElementById("sug-"+(i+1)).textContent = '';
            document.getElementById("c"+(i+1)).textContent = '';
            document.getElementById("s"+(i+1)).textContent = '';
        }
    }

    function sortData(nameData, svgNameData, cafData, sugData, pctSyrup, pctWater, pctMilk, pctCream, pctLiquor, pctEspresso, pctCoffee, hasIce, hasWhip, sortType) {
        //1) combine the arrays:
        var list = [];
        for (var j = 0; j < nameData.length; j++)
            list.push({'drinkName': nameData[j], 'svgName': svgNameData[j], 'caf': cafData[j], 'sug': sugData[j], 'syrup': pctSyrup[j], 'water': pctWater[j],
                'cream': pctCream[j], 'milk': pctMilk[j], 'liquor': pctLiquor[j], 'espresso': pctEspresso[j], 'coffee': pctCoffee[j], 'ice': hasIce[j],
                'whip': hasWhip[j]});
        //2) sort:
        if (sortType === "alpha-desc") {
            list.sort(function (a, b) {
                return ((a.drinkName < b.drinkName) ? -1 : ((a.drinkName === b.drinkName) ? 0 : 1));
            });
        }
        if (sortType === "alpha-asc") {
            list.sort(function (a, b) {
                return ((a.drinkName > b.drinkName) ? -1 : ((a.drinkName === b.drinkName) ? 0 : 1));
            });
        }
        if (sortType === "caf-desc") {
            list.sort(function (a, b) {
                return ((a.caf < b.caf) ? -1 : ((a.caf === b.caf) ? 0 : 1));
            });
        }
        if (sortType === "caf-asc") {
            list.sort(function (a, b) {
                return ((a.caf > b.caf) ? -1 : ((a.caf === b.caf) ? 0 : 1));
            });
        }
        if (sortType === "sug-desc") {
            list.sort(function (a, b) {
                return ((a.sug < b.sug) ? -1 : ((a.sug === b.sug) ? 0 : 1));
            });
        }
        if (sortType === "sug-asc") {
            list.sort(function (a, b) {
                return ((a.sug > b.sug) ? -1 : ((a.sug === b.sug) ? 0 : 1));
            });
        }
        //3) separate them back out:
        for (var k = 0; k < nameData.length; k++) {
            nameData[k] = list[k].drinkName;
            svgNameData[k] = list[k].svgName;
            cafData[k] = list[k].caf;
            sugData[k] = list[k].sug;

            pctSyrup[k] = list[k].syrup;
            pctWater[k] = list[k].water;
            pctMilk[k] = list[k].milk;
            pctCream[k] = list[k].cream;
            pctLiquor[k] = list[k].liquor;
            pctEspresso[k] = list[k].espresso;
            pctCoffee[k] = list[k].coffee;
            hasIce[k] = list[k].ice;
            hasWhip[k] = list[k].whip;
        }
    }

    function returnIngredient(nameData) {
        if (nameData === "Americano") {
            return ingredientList = ["Coffee"];
        }
        if (nameData === "Black Coffee") {
            return ingredientList = ["Coffee"];
        }
        if (nameData === "Cafe Breve") {
            return ingredientList = ["Coffee", "Milk", "Milk Substitute"];
        }
        if (nameData === "Cafe Carajillo") {
            return ingredientList = ["Coffee", "Liquor"];
        }
        if (nameData === "Cafe Latte") {
            return ingredientList = ["Coffee", "Milk", "Milk Substitute"];
        }
        if (nameData === "Cafe Melange") {
            return ingredientList = ["Coffee", "Cream"];
        }
        if (nameData === "Cafe Mocha") {
            return ingredientList = ["Mocha", "Coffee", "Syrup", "Milk", "Milk Substitute"];
        }
        if (nameData === "Eiskaffee") {
            return ingredientList = ["Coffee", "Syrup", "Cream"];
        }
        if (nameData === "Flat White") {
            return ingredientList = ["Coffee", "Milk", "Milk Substitute"];
        }
        if (nameData === "Galao") {
            return ingredientList = ["Coffee", "Milk", "Milk Substitute"];
        }
        if (nameData === "Iced Coffee") {
            return ingredientList = ["Coffee", "Syrup"];
        }
        if (nameData === "Irish Coffee") {
            return ingredientList = ["Mocha", "Coffee", "Liquor", "Cream"];
        }
        if (nameData === "Long Black") {
            return ingredientList = ["Coffee"];
        }
        if (nameData === "Macchiato") {
            return ingredientList = ["Mocha", "Coffee", "Syrup", "Milk", "Milk Substitute"];
        }
        if (nameData === "Red Eye") {
            return ingredientList = ["Coffee"];
        }
    }

    var cafDn = "../../../resources/images/filter-icons/caf-down.png";
    var sugDn = "../../../resources/images/filter-icons/sug-down3.png";
    var cafDnSel = "../../../resources/images/filter-icons/caf-down-selected.png";
    var sugDnSel = "../../../resources/images/filter-icons/sug-down-selected3.png";

    var cafUp = "../../../resources/images/filter-icons/caf-up.png";
    var sugUp = "../../../resources/images/filter-icons/sug-up3.png";
    var cafUpSel = "../../../resources/images/filter-icons/caf-up-selected.png";
    var sugUpSel = "../../../resources/images/filter-icons/sug-up-selected3.png";

    var azSort = "../../../resources/images/filter-icons/iconAZ.png";
    var zaSort = "../../../resources/images/filter-icons/iconZA.png";
    var azSelected = "../../../resources/images/filter-icons/hoverAZ.png";
    var zaSelected = "../../../resources/images/filter-icons/hoverZA.png";

    $("#filterAlpha").attr('src', azSort);
    $("#filterCaf").attr('src', cafDn);
    $("#filterSug").attr('src', sugDn);

    $(document).ready(function() {

        $("#filterAlpha").hover(
            function () {
                filterSort();
                $("#filterAlpha").attr('src', alphaHover);
            }, function () {
                filterSort();
                $("#filterAlpha").attr('src', alphaOffHover);
            }
        );

        $("#filterCaf").hover(
            function () {
                filterSort();
                $("#filterCaf").attr('src', cafHover);
            }, function () {
                filterSort();
                $("#filterCaf").attr('src', cafOffHover);
            }
        );

        $("#filterSug").hover(
            function () {
                filterSort();
                $("#filterSug").attr('src', sugHover);
            }, function () {
                filterSort();
                $("#filterSug").attr('src', sugOffHover);
            }
        );
    });


    function filterSort() {
        if ($("#filterCaf").attr('src') === cafDn) {
            cafHover = cafDnSel;
            cafOffHover = cafDn;
            cafClick = cafUpSel;
        }
        if ($("#filterSug").attr('src') === sugDn) {
            sugHover = sugDnSel;
            sugOffHover = sugDn;
            sugClick = sugUpSel;
        }

        if ($("#filterCaf").attr('src') === cafUp) {
            cafHover = cafUpSel;
            cafOffHover = cafUp;
            cafClick = cafDn;
        }
        if ($("#filterSug").attr('src') === sugUp) {
            sugHover = sugUpSel;
            sugOffHover = sugUp;
            sugClick = sugDn;
        }

        if ($("#filterCaf").attr('src') === cafDnSel) {
            cafHover = cafDnSel;
            cafOffHover = cafDn;
            cafClick = cafUpSel;
        }
        if ($("#filterSug").attr('src') === sugDnSel) {
            sugHover = sugDnSel;
            sugOffHover = sugDn;
            sugClick = sugUpSel;
        }

        if ($("#filterCaf").attr('src') === cafUpSel) {
            cafHover = cafUpSel;
            cafOffHover = cafUp;
            cafClick = cafDnSel;
        }
        if ($("#filterSug").attr('src') === sugUpSel) {
            sugHover = sugUpSel;
            sugOffHover = sugUp;
            sugClick = sugDnSel;
        }
        
        if ($("#filterAlpha").attr('src') === azSort) {
            alphaHover = azSelected;
            alphaOffHover = azSort;
            alphaClick = azSelected;
        }
        if ($("#filterAlpha").attr('src') === zaSort) {
            alphaHover = zaSelected;
            alphaOffHover = zaSort;
            alphaClick = zaSelected;
        }
        if ($("#filterAlpha").attr('src') === azSelected) {
            alphaHover = azSelected;
            alphaOffHover = azSort;
            alphaClick = zaSelected;
        }
        if ($("#filterAlpha").attr('src') === zaSelected) {
            alphaHover = zaSelected;
            alphaOffHover = zaSort;
            alphaClick = azSelected;
        }
    }

    $("#iconPlus").hover(
        function () {
            plusHover();
        }, function () {
            plusOffHover()
        }
    );


    $("#iconPlus").click(function() {
        plusClick(currentPrimaryName);
    });

    //Provide functionality for selecting drinks and adding them to the collection
    function plusHover () {
        document.getElementById("iconPlus").src='../../../resources//images/plus-icons/plus-white.png';
    }

    function plusOffHover() {
        document.getElementById("iconPlus").src='../../../resources//images/plus-icons/plus-midbrown.png';
    }

    //Control the collection icon hover
    $("#collectionRunSelected").hover(
        function () {
            collectionHover();
        }, function () {
            collectionOffHover()
        }
    );

    function collectionHover() {

    }

    function collectionOffHover() {

    }

    //Control running a report on the collection
    $("#collectionRunSelected").click(function() {
        reviewOrder();
        //remove this click event to avoid repeats
        $('#collectionRun').off("click");
    });

    function reviewOrder() {
        sessionStorage.setItem("sent", JSON.stringify(window.order));
        myWindow=window.open("cafe-report1.html",'myWin','width=850,height=960')
    }

    //Control the collection view hover
    $("#previousPage").hover(
        function () {
            previousHover();
        }, function () {
            previousOffHover()
        }
    );

    //Control the collection view hover
    $("#nextPage").hover(
        function () {
            nextHover();
        }, function () {
            nextOffHover()
        }
    );

    function previousHover() {
        document.getElementById("previousPage").src='../../../resources/images/collection-icons/up-arrow-selected.png';
    }

    function previousOffHover() {
        document.getElementById("previousPage").src='../../../resources/images/collection-icons/up-arrow.png';
    }

    function nextHover() {
        document.getElementById("nextPage").src='../../../resources/images/collection-icons/down-arrow-selected.png';
    }

    function nextOffHover() {
        document.getElementById("nextPage").src='../../../resources/images/collection-icons/down-arrow.png';
    }
}

// passes ingredient parameter from D3 cup to ad hoc view on click
function passIngredient(ing) {
    reRunParams(ing);
}

//Sliders for ingredients
$(document).ready(function () {
    slider = new Slider();
    var initSyrup = drink.syrup.percent + '%';
    var initWater = drink.water.percent + '%';
    var initMilk = drink.milk.percent + '%';
    var initCream = drink.cream.percent + '%';
    var initLiquor = drink.liquor.percent + '%';
    var initEspresso = drink.espresso.percent + '%';
    var initCoffee = drink.coffee.percent + '%';
    slider.__proto__.initialise(initSyrup, initWater, initMilk, initCream, initLiquor, initEspresso, initCoffee);
});

var Slider = (function () { 
    var Slider = function () {
        this.initialise();
    };
    
    Slider.prototype = {
        initialise: function (syrup, water, milk, cream, liquor, coffee, espresso) {
            this.vars();
            this.setup(syrup, water, milk, cream, liquor, coffee, espresso);
            this.slideEvent();
        },

        vars: function () {
            _this = this;
            this.container = $('.iSliders');
            this.slider = $('.iSlider');
            this.slide = $('.iSlide');
            this.controls = $('.iControl');
            this.totalPercentage = 100;
        },

        setup: function (currentSyrup, currentWater, currentMilk, currentCream, currentLiquor, currentEspresso, currentCoffee) {
            // set equal width depending on how many sliders there are when initalized
            var counter = 0;
            this.slide.each(function () {
                counter++;
            });
            var initWidth = this.totalPercentage / counter;

            this.slide.width(initWidth + '%');
            this.slide.attr('data-percent', initWidth + '%');

            //percent syrup
            this.slide[0].style.width = currentSyrup;

            //percent water
            this.slide[1].style.width = currentWater;

            //percent milk
            this.slide[2].style.width = currentMilk;

            //percent cream
            this.slide[3].style.width = currentCream;

            //percent liquor
            this.slide[4].style.width = currentLiquor;

            //percent espresso
            this.slide[5].style.width = currentEspresso;

            //percent coffee
            this.slide[6].style.width = currentCoffee;
        },

        getPercentWidth: function (target) {
            // get percentage of current width
            target.attr('data-percent', (100 * parseFloat(target.css('width')) / parseFloat(target.parent().css('width'))));
        },

        slideEvent: function () {
            // listen for mouse down on the controls
            this.controls.on('mousedown', function (event) {
                this.slideDrag(event);
            }.bind(this));
        },
        
        slideDrag: function (event) {
            // set custom name for the drink
            drink.name = customName;
            
            event.preventDefault();
            this.target = $(event.target);
            this.prevMousePos = 0;
            this.target.parent().addClass('active');
            // listen mousemove and mouseup events on the document: only if the mousedown happened on one of the controls
            $(document).on('mousemove', this.slideMove);
            $(document).on('mouseup', this.slideEnd);
            
            console.log("")
            console.log("coffee %")
            console.log(drink.coffee.percent);
            console.log("espresso %")
            console.log(drink.espresso.percent);
            console.log("cream %")
            console.log(drink.cream.percent);
            console.log("liquor %")
            console.log(drink.liquor.percent);
            
        },

        slideMove: function () {
            _this.mousePos = event.pageX;
            _this.amount = [];

            // get info on widths, offsets and positions
            var offset = _this.slider.offset().left;
            var sliderWidth = _this.slider.width();
            var posX = Math.min(Math.max(0, _this.mousePos - offset), sliderWidth);

            // checks direction
            if (_this.mousePos < _this.prevMousePos) {
                _this.direction = 'left';
            } else {
                _this.direction = 'right';
            }

            // update mouse position
            _this.prevMousePos = _this.mousePos;

            // set new width of the active slider
            _this.target.parent().width(posX / sliderWidth * 100 + '%');
            _this.calcPercent();
        },

        calcPercent: function () {
            var totalWidth = 0;
            var sliderLength = 0;
            var leftoverAmount = 0;

            // loop through each slide
            _this.slide.each(function () {

                sliderLength++;
                _this.getPercentWidth($(this));

                if ($(this).hasClass('active')) {
                    // set active percentage
                    _this.active = parseFloat($(this).attr('data-percent'));

                } else {

                    // add non active widths into an array
                    _this.amount.push(parseFloat($(this).attr('data-percent')));
                }
            });

            // find out the leftover amount
            leftoverAmount = _this.totalPercentage - _this.active;
            _this.nonActiveAmount = 0;
            $.each(_this.amount, function () {

                _this.nonActiveAmount += parseFloat(this);
            });

            var x = leftoverAmount / 100;
            var y = _this.nonActiveAmount / 100;
            var z = _this.active;

            drink.syrup.percent = Math.round($(this)[0].slide[0].dataset.percent);
            drink.water.percent = Math.round($(this)[0].slide[1].dataset.percent);
            drink.milk.percent = Math.round($(this)[0].slide[2].dataset.percent);
            drink.cream.percent = Math.round($(this)[0].slide[3].dataset.percent);
            drink.liquor.percent = Math.round($(this)[0].slide[4].dataset.percent);
            drink.espresso.percent = Math.round($(this)[0].slide[5].dataset.percent);
            drink.coffee.percent = Math.round($(this)[0].slide[6].dataset.percent);

            customCup(drink.syrup.percent, drink.water.percent, drink.milk.percent, drink.cream.percent, drink.liquor.percent,
                drink.espresso.percent, drink.coffee.percent);

            _this.slide.each(function () {

                if (!$(this).hasClass('active') || !$(this).hasClass('locked')) {
                    var v = x * (parseFloat($(this).attr('data-percent')) / y);
                    $(this).width(v + '%');
                }
            });
        },

        slideEnd: function () {
            // kill the events on mouse up.
            _this.target.parent().removeClass('active');
            $(this).off('mousemove', slider.slideMove);
            $(this).off('mouseup', slider.slideEnd);
        }
    };
    
    return Slider;
}());

function toggleIngredient(id) {
    var el = document.getElementById(id);
    if (el.style.visibility==="visible") {
        el.style.visibility="hidden";
        makeHidden(id);
    }
    else {
        el.style.visibility="visible";
        makeVisible(id);
    }
}

function updateFromImages(iced, whip) {
    drink.iced = iced;
    drink.whipped = whip;
    if (iced === "true") {
        document.getElementById("iced").checked = true;
        makeVisible("imgIced");
    }
    else {
        document.getElementById("iced").checked = false;
        makeHidden("imgIced");
    }

    if (whip === "true") {
        document.getElementById("whip").checked = true;
        makeVisible("imgWhip");
    }
    else {
        document.getElementById("whip").checked = false;
        makeHidden("imgWhip");
    }
}

function makeVisible(id) {
    if (id === "imgIced") {
        drink.iced = true;
    }
    else if (id === "imgWhip") {
        drink.whipped = true;
    }
    var el = document.getElementById(id);
    el.style.visibility="visible";
}

function makeHidden(id) {
    if (id === "imgIced") {
        drink.iced = false;
    }
    else if (id === "imgWhip") {
        drink.whipped = false;
    }
    var el = document.getElementById(id);
    el.style.visibility="hidden";
}

//set initial cup quantity to text field
document.getElementById("numCup").value = drink.numberCups;

//listen for 100, -100 increments from buttons for quantity
(function() {
    $(function() {
        return $(".minus,.plus").click(function(e) {
            var inc_dec, qty;
            inc_dec = $(this).hasClass("minus") ? -100 : 100;
            qty = $("[name=quantity]");
            
            //update current drink quantity when amount is incremented or decremented
            drink.numberCups = parseInt(qty.val()) + inc_dec;
            return qty.val(parseInt(qty.val()) + inc_dec);
        });
    });

}).call(this);

//update current drink quantity on change to text field
$("#numCup").on("change paste keyup", function() {
    drink.numberCups = parseInt(document.getElementById("numCup").value);
});

function makeOrder() {
    function newDrink() {
        return {
            'name': drink.name,
            'customized': drink.customized,
            'iced': drink.iced,
            'whipped': drink.whipped,
            'syrup': { name: drink.syrup.name, percent: drink.syrup.percent, rating: drink.syrup.rating },
            'water': { name: drink.water.name, percent: drink.water.percent, rating: drink.water.rating },
            'milk': { name: drink.milk.name, percent: drink.milk.percent, rating: drink.milk.rating },
            'cream': { name: drink.cream.name, percent: drink.cream.percent, rating: drink.cream.rating },
            'liquor': { name: drink.liquor.name, percent: drink.liquor.percent, rating: drink.liquor.rating },
            'espresso': { name: drink.espresso.name, percent: drink.espresso.percent, rating: drink.espresso.rating },
            'coffee': { name: drink.coffee.name, percent: drink.coffee.percent, rating: drink.coffee.rating },
            'numberCups': drink.numberCups
        };
    }
    
    document.getElementById("ingTypeHeader").textContent="";
            document.getElementById("ingHeader").textContent="";
                    
            //increment the icon order count and fade in/out when a new order is made
            orderIcon = document.getElementById("collectionRunSelected");

            setTimeout(changeCount, 1000);
            setTimeout(fadeIcon, 2000);
            
            function changeCount() {

                //select the order count label by id
                countLabel = document.getElementById("orderCount");

                //set the label to the length of the order array
                countLabel.textContent=order.length;

                //move the count label and select order icon to the right to make room for double digit numbers
                if (order.length === 10 ) {
                    countLabel.style.left = "63px";
                    orderIcon.style.left = "107px"
                }
            }

            //make the order selction icon fully visible
            orderIcon.style.opacity = "1";

            //hide the order selection icon after 2 seconds
            function fadeIcon() {
                orderIcon.style.opacity = "0";
            }
    
    //push the new dynamically updated drink object into the order array
    order.push(newDrink());
    
    return order;
}

