$(document).ready(function(){
    //This sessionStorage.getItem(); is also a predefined function in javascript
    //will retrieve session and get the value;

    var selectedCoffee = JSON.parse(sessionStorage.getItem("sent"));
    //console.log(selectedCoffee);

    var auth = {
        name: "superuser",
        password: "superuser"
    }
    initializeVisualize(initPage, auth);
    function initPage(jrsConfig, v) {
        //add custom export format
        //(should throw a proper error)
        var reportExports = v.report
                        .exportFormats
                        .concat(["json"]);
            $select = buildControl("",reportExports);
            $button = $("#button");

        var alwaysRefresh = false;

        var report,
            zoom = 1,
            plus = document.getElementById("plusZoom"),
            minus = document.getElementById("minusZoom"),
            width = document.getElementById("widthZoom"),

            report = v.report({
            //skip report running during initialization
            runImmediately: !alwaysRefresh,
            resource: "/public/Samples/FreshCoffee/Reports/roastery1",
            container: "#roastery-report",
            success: function () {
                button.removeAttribute("disabled");
                plus.removeAttribute("disabled");
                minus.removeAttribute("disabled");
                width.removeAttribute("disabled");
            },
            params: {
                "coffee_name": selectedCoffee
            },
            scale: "width",
            error: function (error) {
                console.log(error);
            }
        });

        plus.onclick = function () {
            report
                .scale(zoom += 0.1)
                .render();
        }

        minus.onclick = function () {
            report
                .scale((zoom -= 0.1) > 0 ? zoom : zoom = 0.1)
                .render();
        }

        width.onclick = function () {
            report
                .scale("width")
                .render();
        }


        if (alwaysRefresh){
            report.refresh();
        }

        $("#buttonRefresh").click(function(){
            report
                .refresh()
                .done(function(){console.log("Report Refreshed!");})
                .fail(function(){alert("Report Refresh Failed!");});
        });

        $("#pageRange").change(function() {
            report
                .pages($(this).val())
                .run()
                .fail(function(err) { alert(err); });
        });

        $button.click(function () {

            //console.log($select.val());

            report.export({
                //export options here
                outputFormat: $select.val(),
                //exports all pages if not specified
                //for example...
                //pages: "1-2"
            }, function (link) {
                url = link.href ? link.href : link;
                window.location.href = url;
            }, function (error) {
                console.log(error);
            });
        });

        function buildControl(name, options) {

            function buildOptions(options) {
                var template = "<option>{value}</option>";
                return options.reduce(function (memo, option) {
                    return memo + template.replace("{value}", option);
                }, "")
            }

            var template = "<label>{label}</label><select>{options}</select><br>",
                content = template.replace("{label}", name)
                    .replace("{options}", buildOptions(options));

            var $control = $(content);
            $control.replaceAll($("#export-selector"));
            //return select
            return $($control[1]);
        }

        $("#previousPage").click(function() {
            var currentPage = report.pages() || 1;

            report
                .pages(--currentPage)
                .run()
                .fail(function(err) { alert(err); });
        });

        $("#nextPage").click(function() {
            var currentPage = report.pages() || 1;

            report
                .pages(++currentPage)
                .run()
                .fail(function(err) { alert(err); });
        });
    }
});
