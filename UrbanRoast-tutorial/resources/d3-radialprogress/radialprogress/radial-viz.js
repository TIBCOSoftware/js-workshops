/*
 Copyright (c) 2016, BrightPoint Consulting, Inc.

 MIT LICENSE:

 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
 documentation files (the "Software"), to deal in the Software without restriction, including without limitation
 the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
 and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
 TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 IN THE SOFTWARE.
 */

// @version 1.1.54

// html element that holds the chart
var viz_container;

// our radial components and an array to hold them
var viz1,viz2,viz3,vizs=[];

// our radial themes and an array to hold them
var theme1,theme2,theme3,themes;

// our div elements we will put radials in
var div1,div2,div3,divs;

// show reel for demo only;
var reels=[];

function initialize() {

    //Here we use the three div tags from our HTML page to load the three components into.
    div1 = d3.select("#div1");
    div2 = d3.select("#div2");
    div3 = d3.select("#div3");
    //Store the divs in an array for easy access
    divs=[div1,div2,div3];

    //Here we create our three radial progress components by passing in a parent DOM element (our div tags)
    viz1 = vizuly.viz.radial_progress(document.getElementById("div1"));
    viz2 = vizuly.viz.radial_progress(document.getElementById("div2"));
    viz3 = vizuly.viz.radial_progress(document.getElementById("div3"));
    //Store the vizs in an array for easy access
    vizs=[viz1,viz2,viz3];


    //Here we create three vizuly themes for each radial progress component.
    //A theme manages the look and feel of the component output.  You can only have
    //one component active per theme, so we bind each theme to the corresponding component.
    theme1 = vizuly.theme.radial_progress(viz1).skin(vizuly.skin.RADIAL_PROGRESS_ALERT);
    theme2 = vizuly.theme.radial_progress(viz2).skin(vizuly.skin.RADIAL_PROGRESS_FIRE);
    theme3 = vizuly.theme.radial_progress(viz3).skin(vizuly.skin.RADIAL_PROGRESS_BUSINESS);
    themes=[theme1,theme2,theme3];

    //Like D3 and jQuery, vizuly uses a function chaining syntax to set component properties
    //Here we set some bases line properties for all three components.
    vizs.forEach(function (viz,i) {
        viz.height(600)                    // Height of component - radius is calculated automatically for us
            .min(0)                         // min value
            .max(100)                       // max value
            .capRadius(1)                   // Sets the curvature of the ends of the arc.
            .on("tween",onTween)            // On the arc animation we create a callback to update the label
            .on("mouseover",onMouseOver)    // mouseover callback - all viz components issue these events
            .on("mouseout",onMouseOut)      // mouseout callback - all viz components issue these events
            .on("click",onClick);           // mouseout callback - all viz components issue these events
    })

    //
    // Now we set some unique properties for all three components to demonstrate the different settings.
    //
    vizs[0]
        .data(240)
        .startAngle(210)                         // Angle where progress bar starts
        .endAngle(150)                           // Angle where the progress bar stops
        .arcThickness(.12)                        // The thickness of the arc (ratio of radius)
        .label(function (d,i) { return d3.format("$.0f")(d) + "k"; });

    vizs[1]
        .data(230)
        .startAngle(210)
        .endAngle(150)
        .arcThickness(.12)
        .label(function (d,i) { return d3.format("$.0f")(d) + "k"; });

    vizs[2]
        .data(267)
        .startAngle(210)
        .endAngle(150)
        .arcThickness(.12)
        .label(function (d,i) { return d3.format("$.0f")(d) + "k"; });

    //We use this function to size the components.
    changeSize(800,250);

}

//Here we want to animate the label value by capturin the tween event
//that occurs when the component animates the value arcs.
function onTween(viz,i) {
    viz.selection().selectAll(".vz-radial_progress-label")
        .text(viz.label()(viz.data() * i));
}

function onMouseOver(viz,d,i) {
    //We can capture mouse over events and respond to them
}

function onMouseOut(viz,d,i) {
    //We can capture mouse out events and respond to them
}

function onClick(viz,d,i) {
    //We can capture click events and respond to them
}

//This function is called when the user selects a different skin.
function changeSkin(val) {
    themes.forEach(function (theme,i) {
        //If the user selects "none" for the skin we need to tell the theme to release the component and clear
        //any applied styles.
        if (val == "none") {
            theme.release();
            vizs[i].update();
        }
        //If the user selected a skin, make sure each viz has a theme and apply the skin
        else {
            theme.viz(vizs[i]);
            theme.skin(val);
            theme.viz().update();  //We could use theme.apply() here, but we want to trigger the tween.
        }
    })

}

//This is applies different end caps to each arc track by adjusting the 'capRadius' property
function changeEndCap(val) {
    vizs.forEach(function (viz,i) {
        vizs[i].capRadius(Number(val)).update();
    })
}

//This changes the size of the component by adjusting the radius and width/height;
function changeSize(val) {
    var s = String(val).split(",");
    viz_container.transition().duration(300).style('width', s[0] + 'px').style('height', 190 + 'px');

    var divWidth = s[0] * 0.80 / 3;

    divs.forEach(function (div,i) {
        div.style("width",divWidth + 'px').style("margin-left", (s[0] *.05) + "px");
        vizs[i].width(divWidth).height(divWidth).radius(divWidth/2.2).update();
    })

}

//This sets the same value for each radial progress
function changeData(val) {
    vizs.forEach(function (viz,i) {
        vizs[i].data(Number(val)).update();
    })
}


$(document).ready(function () {

        // Set the size of our container element.
        viz_container = d3.selectAll("#viz_container")
                .style("width", "800px")
                .style("height", "250px");

        initialize();

    });