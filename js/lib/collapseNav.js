var app = app || {};

app.collapseNav = function(){
	// If the mobile nav is present, collapse it down
	var $nav = $("#header").find(".navbar-toggle");

	if (!$nav.is(".collapsed")){
		$nav.click();
	}
};
