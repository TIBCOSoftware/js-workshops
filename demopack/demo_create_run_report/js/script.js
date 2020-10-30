
$(function(){
    console.log('ready');
    
    
})

var configPath = '../../config/config.json';
var  auth = {
    name: "jasperadmin",
    password: "jasperadmin",
    organization: "organization_1"
}
initializeVisualize(initPage, auth, configPath);

function initPage(jrsConfig, v) {
    $("#reportViewer").hide();

    $("#adhocViewer").hide();

    //This function is used to build the list of report options on the screen
    function buildUserReportList(){
        var search = v.resourcesSearch({
            folderUri: "/public/Samples/Create_Run_Report",
            recursive: false,
            types:["adhocDataView"],
            success: function(repo) {
                console.log(repo); // resourceLookups

                $( "#reportList" ).empty();

                repo.forEach(function(report,index){
                    $("#reportList").append('<li class="list-group-item" data-reporturi='+ report.uri +'>'+ report.label +'</li>');
                });

                $('.list-group li').click(function(e) {
                    e.preventDefault()
                    
                    $that = $(this);
                    
                    $that.parent().find('li').removeClass('active');
                    $that.addClass('active');

                });
            }
        });
    }

    //Calling the function to generate report list
    buildUserReportList();
    
    //Wireing up the runReportBtn to run the selected report
    $('#runReportBtn').click(function(e) {
        
        $("#reportViewer").show();
        $("#ic").show();
        $("#adhocViewer").hide();

        let $activeReport = $(".active")

        let reportURI = $activeReport.data("reporturi");
        //console.log($activeReport.data("reporturi"));

        var adv = v.adhocView({
            container: "#reportViewer",
            resource: reportURI,
            error: handleError
        });


        var inputControls = v.inputControls({
            resource: reportURI,
            container: "#ic",
        events: {
            change: function(params, error){
                if (!error){
                    adv.params(params).run();  
                } 
              }
            }
        });

    });

    $('#refreshBtn').click(function(e){

        buildUserReportList();

    });

    $('#editReportBtn').click(function(e){

        $("#reportViewer").hide();

        $("#adhocViewer").show();

        let $activeReport = $(".active")

        let reportURI = $activeReport.data("reporturi");

        let url = "https://infra-platforms-phase2-11723-rsarda.pfa.jaspersoft.com/jasperserver-pro/flow.html?_flowId=adhocFlow&resource=" + reportURI + "&decorate=no";

        $('#adhocViewer').prop('src', url)

    });

    $('#createReport').click(function(e){

        $("#reportViewer").hide();
        $("#ic").hide();
        document.getElementById("ic").innerHTML = "";

        $("#adhocViewer").show();
        
        let url = "https://infra-platforms-phase2-11723-rsarda.pfa.jaspersoft.com/jasperserver-pro/flow.html?_flowId=adhocFlow&decorate=no";

        $('#adhocViewer').prop('src', url)
    });



    //show error
    function handleError(err){
        alert(err.message);
    }
}

function runReport(v, report){
    v("#reportViewer").report({
        resource: report,
        error: handleError
    });
}



function reportDetails(v,reportPath,reportName,callback){
    let path = reportPath;
    let name = reportName;
    let fullPath = path + "/" + name;

    var search = v.resourcesSearch({
        folderUri: reportPath,
        recursive: false,
        success: function(repo) {

            repo.forEach(function(k,i){

                if (k.uri == fullPath){
                    callback(k);
                    return;
                }

            });
        }
    });
}

function buildReportSaveLocationDropdown(v){
    var search = v.resourcesSearch({
        folderUri: "/",
        recursive: false,
        types:["folder"],
        success: function(repo) {
            console.log(repo); // resourceLookups
            
            $("#folder").append('<option value=""></option>');
            repo.forEach(function(folder,index){
                $("#folder").append('<option value='+folder.uri+'>' + folder.label + '  ' +  folder.uri + '</option>');
            });
        }
    });
}
