
$(function() {
    
    //Grab UI items to manipulate later
	let dropdown = $('#userDropdown');
	let userId = $('#userId');
	let userOrgId = $('#userOrgId');
	let userRoles = $('#userRoles');
	let userPA1 = $('#userPA1');
	let userPA2 = $('#userPA2');
	let jrsToken = $('#jrsToken');
	let login = $('#login');

	// Setting the UI controls
	dropdown.empty();
	jrsToken.prop("disabled", false);

	//Clean out and start to build the user dropdown
	dropdown.append('<option selected="true" disabled>Choose a user</option>');
	dropdown.prop('selectedIndex', 0);

	
	// Populate dropdown with list of provinces
	// The list is populated from the users.js page that is included
	// You can edit that file to make user changes and add / delete users
	$.each(users, function (key, entry) {
	    dropdown.append($('<option></option>').attr('value', entry.userId).text(entry.userName));
	})

	// When the user dropdown changes the selected user's information is populated into other
	// UI elements on the page.
	// A token is created for demo purposes so a customer can see what a pre-auth token might look like
	dropdown.change(function() {
		let user = users.find(findUser);
		userId.val(user.userId);
		userOrgId.val(user.orgId);
		userRoles.val(user.roles);
		userPA1.val(user.storetype);
		userPA2.val(user.storecountry);
		jrsToken.val(createToken(user.userId,user.orgId,user.roles,user.storetype,user.storetype)); // Display token is created
	});

	userId.change(function(){
		setJRSToken();
	});
	userOrgId.change(function(){
		setJRSToken();
	});
	userRoles.change(function(){
		setJRSToken();
	});
	userPA1.change(function(){
		setJRSToken();
	});
	userPA2.change(function(){
		setJRSToken();
	});

	function setJRSToken(){
		jrsToken.val(createToken(userId.val(),userOrgId.val(),findAndReplace(userRoles.val()," ",""),userPA1.val(),userPA2.val()));
	}

	// Find function for users object
	function findUser(user) {
	    return user.userId == dropdown.val();
	}

	// When the login button is clicked the following happens..
	// -- Selected users is identified
	// -- The username of that user is stored in a cookie for other pages to use
	// -- A page redirect is done moving to the homepage with the url encoded token in the url
	login.click(function() {
		setCookie("jrsUser",userId.val(),1);
		let tempURL = "home.html?token=" + encodeURI(createToken(userId.val(),userOrgId.val(),findAndReplace(userRoles.val()," ",""),userPA1.val(),userPA2.val()));
		window.location.href = tempURL;
	});

});





