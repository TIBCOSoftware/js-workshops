$(function() {
    var editor = ace.edit("editor");
	editor.setValue(OnlineJsEditor.getCode());
    editor.setTheme("ace/theme/github");
    editor.session.setMode("ace/mode/javascript");
	
	$( "#sendButton" ).click(function() {
		OnlineJsEditor.setCode(editor.getValue());
		window.opener.location.reload(false);
	});
});