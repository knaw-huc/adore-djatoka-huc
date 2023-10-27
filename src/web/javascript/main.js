// The *full* image path on the server. This path does *not* need to be in the web
// server root directory. On Windows, use Unix style forward slash paths without
// the "c:" prefix
var images = 'http://memory.loc.gov/gmd/gmd433/g4330/g4330/np000066.jp2';

// Copyright or information message
var credit = '';

// Obtain URL Parameters if present
var query = location.href.substring(location.href.indexOf("?") + 1);
var vars = query.split("&");
for (var i = 0; i < vars.length; i++) {
	var pair = vars[i].split("=");
	if (pair[0] == "url" || pair[0] == "rft_id")
		images = pair[1];
	if (images.indexOf("#") > 0)
		images = images.substring(0, images.length - 1);
}

// Create our viewer object - note: must assign this to the 'iip' variable.
// See documentation for more details of options
iip = new IIP("targetframe", {
	image : images,
	server : server,
	credit : credit,
	zoom : 1,
	render : 'random',
	showNavButtons : true
});
