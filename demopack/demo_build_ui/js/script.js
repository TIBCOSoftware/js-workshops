var configPath = '../../config/config.json';
var  auth = {
    name: "jasperadmin",
    password: "jasperadmin",
    organization: "organization_1"
}
initializeVisualize(initPage, auth, configPath);
function initPage(jrsConfig, v) {

    //render report from provided resource
    var report = v.report({
        container: "#container",
        resource: "/public/Samples/Reports/RevenueDetailReport",
        success: function(){
            console.log("success");
        },
        error: handleError
    });


    var ic = v.inputControls({
        resource: "/public/Samples/Reports/RevenueDetailReport",
            success: function(data) {
                renderInputControls(data)
            },
            error: function(e) {
                alert(e);
            }
    });


    //show error
    function handleError(err) {
        alert(err.message);
    }

    $("#btnRunReport").click(function() {
      var chkBoxes = $(":checkbox");
      var p = buildParam(chkBoxes);
      console.log(p);

      report.params({ "ProductFamily": p });
      report.run();
    });

}



function renderInputControls(icList){
    var icList = icList;

    //cycle through each input control
    //Not needed for this project but looking to create this function to support future examples
    $.each(icList,function(index,item){

        $.each(item.state.options,function(index,option){

            var newDiv = document.createElement("div");

            var newInput = document.createElement("input");
            newInput.type = "checkbox";
            newInput.id = "checkbox" + index;
            newInput.value = option.value;
            newInput.setAttribute("data-jrsparam",item.id)

            var newLabel = document.createElement('label')
            newLabel.htmlFor = newInput.id;
            newLabel.appendChild(document.createTextNode(option.label));

            newDiv.appendChild(newInput);
            newDiv.appendChild(newLabel)

            var container = document.getElementById("reportControls");
            container.appendChild(newDiv);


        });

        

    });


}

function buildParam(controls){
    var param = [];
    //console.log(controls);

    $.each(controls, function( index, control ) {
        if(control.checked){
            //console.log(control.dataset.jrsvalue);
            param.push(control.value);
        }
    });

    return param;


}
