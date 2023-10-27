// The *full* image path on the server. This path does *not* need to be in the web
// server root directory. On Windows, use Unix style forward slash paths without
// the "c:" prefix
var images = 'http://tomcat.tiler01.huygens.knaw.nl/jp2/witsen/WITS01_FHM1225_002_X-0.jp2';
//var images = 'http://tomcat.tiler01.huygens.knaw.nl/jp2/witsen/WITS01_KB75C51-HOF084_002_X.jpg';

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
	server : server,
	image : images,
	zoom : 1,
	render : 'spiral',
	showNavButtons : true
});

// XXX gijs: offer a way of toggling the navigation box. Tried to keep
// interference to a minimum.
function hideNavBox() {
	$('navcontainer').setStyle('display', 'none');
	$('openNavBox').setStyle('display', 'block');
}

function showNavBox() {
	$('navcontainer').setStyle('display', 'block');
	$('openNavBox').setStyle('display', 'none');
}

function makeBoxHidable() {
	if (!$('navcontainer') || !$('zoomIn')) {
		setTimeout(makeBoxHidable, 250);
		return;
	}
	var newBtn = new Element('img', {
		src : 'images/closeNavBox.png',
		id : 'closeNavBox'
	});
	newBtn.inject('navbuttons', 'bottom');
	newBtn.addEvent('click', hideNavBox);

	var closedButton = new Element(
			'div',
			{
				id : 'openNavBox',
				style : 'position: absolute; top: 0; right: 0; cursor: pointer; background-color: rgba(0,0,0,0.6); *background-color: black; display: none;',
				html : '<img src="images/zoomIn.png" alt="Open navigation box" title="Open navigation box">'
			});
	closedButton.inject('targetframe', 'bottom');
	closedButton.addEvent('click', showNavBox);
}

makeBoxHidable();
