function OnlineJsEditor(){ } 

function openEditor(){
	url= "textEditor.html";
	newwindow=window.open(url,'name','height=600,width=600');
	if (window.focus) {newwindow.focus()}
	return false;
}

$(function() {
  // load persistent store after the DOM has loaded
  store = new Persist.Store('My Application');
	OnlineJsEditor.getCode=function(){ 
		text = store.get('jsCode');
		if(text==undefined){
			text = "";
			store.set('jsCode', text);
		}		
		return text;
	};

	OnlineJsEditor.setCode=function(codeStr){ 
		store.set('jsCode', codeStr);
	};
});





