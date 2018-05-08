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

//
// This is the base component for a vizuly radial progress component.
//
vizuly.viz.radial_progress = function (parent) {

    // This is the object that provides pseudo "protected" properties that the vizuly.viz function helps create
    var scope={};

    var properties = {
        "data" : null,              // Expects a single numeric value
        "margin" : {                // Our marign object
            "top": "10%",           // Top margin
            "bottom" : "7%",        // Bottom margin
            "left" : "8%",          // Left margin
            "right" : "7%"          // Right margin
        },
        "duration": 500,            // This the time in ms used for any component generated transitions
        "width": 300,               // Overall width of component
        "height": 300,              // Height of component
        "radius" : 150,             // Radius of the progress tracks
        "min" : 0,                  // Min value of the domain
        "max" : 1,                  // Max value of the domain
        "label" : function (d,i)    // Default function used to render center label
        { return d; },
        "capRadius" : 0,            // Percent to use for corner radius at end of arc  (0-1)
        "startAngle" : 180,         // Start angle for layout range
        "endAngle" : 180,           // End angle for layout range
        "arcThickness" : 0.05       // Determines each arc width as percentage value of radius
    };

    //Create our viz and type it
    var viz=vizuly.core.component(parent,scope,properties,["tween"]);
    viz.type="viz.chart.radial_progress";

    //Measurements
    var size;                   // Holds the 'size' variable as defined in viz.util.size()
    var theta;                  // Calculated from start and end angle
    var radian = Math.PI/180;   // radian constant
    var arcs=[];                // Holds array of arc objects based on the data value in respect to the min/max values


    //These are all d3.selection objects we use to insert and update svg elements into
    var svg, g,background, plot, plotBackground, arcPlot, labelPlot, defs;

    // This is used to generate the arc path for the background track
    var arcTrack = d3.svg.arc();

    initialize();

    // Here we set up all of our svg layout elements using a 'vz-XX' class namespace.  This routine is only called once
    // These are all place holder groups for the invidual data driven display elements.   We use these to do general
    // sizing and margin layout.  The all are referenced as D3 selections.
    function initialize() {

        svg = scope.selection.append("svg").attr("id", scope.id).style("overflow","visible").attr("class","vizuly");
        defs = vizuly.core.util.getDefs(viz);
        background = svg.append("rect").attr("class","vz-background");
        g = svg.append("g").attr("class","vz-radial_progress-viz");
        plot = g.append("g").attr("class","vz-radial_progress-plot");
        plotBackground = plot.append("rect").attr("class","vz-plot-background");
        arcPlot = plot.append("g").attr("class","vz-radial_progress-arc-plot");
        labelPlot = plot.append("g").attr("class","vz-radial_progress-label-plot");

        // We attach our base events to the arcPlot
        plot.on("mouseover",function () { scope.dispatch.mouseover(this) })
            .on("mouseout",function () { scope.dispatch.mouseout(this) })
            .on("click",function () { scope.dispatch.click(this) });

        // Tell everyone we are done initializing
        scope.dispatch.initialize();
    }

    // The measure function performs any measurement or layout calcuations prior to making any updates to the SVG elements
    function measure() {

        // Call our validate routine and make sure all component properties have been set
        viz.validate();

        // Get our size based on height, width, and margin
        size = vizuly.core.util.size(scope.margin, scope.width, scope.height);

        // Set our theta bases on start and end angles
        theta = (scope.startAngle == scope.endAngle)
            ? 360 : (scope.startAngle > scope.endAngle)
            ? 360-(scope.startAngle - scope.endAngle) : theta = scope.endAngle - scope.startAngle;

        // Calculate start angle in radians
        var arcStartRadian = scope.startAngle * radian;

        // Determine how many arcs we need
        var arcsTotal=Math.floor(scope.data/(scope.max-scope.min)) + 1;
        // Calculate arc thickness (if we have too many arcs for a given radius we reduce the thickness)
        var arcThickness = Math.min(scope.radius*scope.arcThickness, scope.radius*0.75/arcsTotal);

        // Reset our arcs array to add new arcs for each measure cycle
        arcs=[];

        // Create custom arc objects that hold arc properties and the d3.svg.arc path generator
        for (var i=0; i < arcsTotal; i++) {
            var o={};
            var arc=d3.svg.arc();
            arc.outerRadius(scope.radius-(arcThickness*i));
            arc.innerRadius(scope.radius-(arcThickness*(i+1)));
            arc.cornerRadius(arcThickness*scope.capRadius/2);
            o.arc = arc;
            o.startAngle = arcStartRadian;

            console.log("start angle = " + o.startAngle);

            //Determine how far the arc extends within theta (if we only have a partial arc, we need to calculate that  here)
            var spread = scope.data/(scope.max-scope.min) - i;
            o.endAngle = (spread > 1) ? theta * radian + arcStartRadian : (spread * theta) * radian + arcStartRadian;

            arcs.push(o);
        }

        // This sets the properties of the d3.svg.arc that generates the background arc track
        arcTrack.outerRadius(scope.radius)
            .cornerRadius(arcThickness*scope.capRadius/2)
            .innerRadius(scope.radius-arcThickness*arcs.length)
            .startAngle(scope.startAngle*radian).endAngle((scope.startAngle + theta) * radian);

        // Tell everyone we are done making our measurements
        scope.dispatch.measure();

    }

    // The update function is the primary function that is called when we want to render the visualiation based on
    // all of its set properties.  A developer can change properties of the components and it will not show on the screen
    // until the update function is called
    function update() {

        // Call measure each time before we update to make sure all our our layout properties are set correctly
        measure();

        // Layout all of our primary SVG d3 elements.
        svg.attr("width", scope.width).attr("height", scope.height);
        background.attr("width", scope.width).attr("height", scope.height);
        plot.style("width",size.width).style("height",size.height).attr("transform","translate(" + size.left + "," + size.top +  ")");
        arcPlot.attr("transform","translate(" + size.width/2 + "," + size.height/2 + ")");

        // Create a background circle if one is not present
        var backCircle= plot.selectAll(".vz-radial_progress-back-circle")
        if (backCircle[0].length == 0) {
            backCircle= arcPlot.append("circle").attr("class","vz-radial_progress-back-circle");
        }
        backCircle.attr("r",scope.radius);

        // Create our background track if one is not present.
        var trackPath = plot.selectAll(".vz-radial_progress-track");
        if (trackPath[0].length == 0) {
            trackPath = arcPlot.append("path").attr("class","vz-radial_progress-track");
        }
        trackPath.attr("d",arcTrack);

        // Create our label using the select, enter, exit pattern
        var label = labelPlot.selectAll(".vz-radial_progress-label").data([scope.data]);
        label.enter().append("text").attr("class","vz-radial_progress-label").style("text-anchor","middle");
        label.exit().remove();
        label.attr("x",size.width/2)
            .attr("y",size.height/2)
            .text(function (d,i) { return scope.label(d,i)});

        // Create each arc path using the select, enter, exit pattern
        var arcPath = arcPlot.selectAll(".vz-radial_progress-arc").data(arcs);
        arcPath.enter()
            .append("path")
            .attr("class","vz-radial_progress-arc");
        arcPath.exit().remove();

        // Use a transition to animate the arc.  If the duration is set to '0' there will be no animation


        arcPath.transition()
            .duration(scope.duration)
            // call our tween function
            .call(arcTween);

        // Let everyone know we are doing doing our update
        // Typically themes will attach a callback to this event so they can apply styles to the elements
        scope.dispatch.update();
    }

    // This function takes the arc transition and for every 'tick' event of the transition will
    // interpolate the lenght of the arc.
    function arcTween(transition) {
        transition.attrTween("d", function(d) {
            var interpolate = d3.interpolate(d.startAngle, d.endAngle);
            return function(t) {
                d.endAngle = interpolate(t);
                scope.dispatch.tween(viz,t);
                return d.arc(d);
            };
        });
    }

    // This is our public update call that all viz components implement
    viz.update = function () {
        update();
        return viz;
    };

    // Returns our glorious viz component :)
    return viz;

};