$(document).ready(function() {
function rgb2hex(rgb) {
rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
function hex(x) {
return ("0" + parseInt(x).toString(16)).slice(-2);
}
return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}
function RGBToHSL(rgb) {
let sep = rgb.indexOf(",") > -1 ? "," : " ";
rgb = rgb
.substr(4)
.split(")")[0]
.split(sep);
for (let R in rgb) {
let r = rgb[R];
if (r.indexOf("%") > -1)
rgb[R] = Math.round(r.substr(0, r.length - 1) / 100 * 255);
}
let r = rgb[0] / 255,
g = rgb[1] / 255,
b = rgb[2] / 255;
let cmin = Math.min(r, g, b),
cmax = Math.max(r, g, b),
delta = cmax - cmin,
h = 0,
s = 0,
l = 0;
if (delta === 0) h = 0;
else if (cmax == r)
h = ((g - b) / delta) % 6;
else if (cmax == g)
h = (b - r) / delta + 2;
else
h = (r - g) / delta + 4;
h = Math.round(h * 60);
if (h < 0) h += 360;
l = (cmax + cmin) / 2;
s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
s = +(s * 100).toFixed(1);
l = +(l * 100).toFixed(1);
return "hsl(" + h + "," + s + "%," + l + "%)";
}
function HSLToRGB(h,s,l) {
s /= 100;
l /= 100;
let c = (1 - Math.abs(2 * l - 1)) * s,
x = c * (1 - Math.abs((h / 60) % 2 - 1)),
m = l - c/2,
r = 0,
g = 0,
b = 0;
}


var color_index = new Array();
var color_scheme;


function reset_color_wheel() {
$("color_wheel swatch").addClass("dim");
}

function update_color_wheel() {
	$("color_wheel swatch").addClass("dim");
	var number_colors = color_index.length;
	// console.log(number_colors);
	for (var i = 0; i < color_index.length; i++) {
		$("color_wheel swatch:nth-of-type(" + color_index[i] + ")").removeClass("dim");
	}
}

// function update_color_wheel() {
// 	$("color_wheel swatch").addClass("dim");
// 	var number_colors = color_index.length;
// 	var color1 = color_index[0];
// 	console.log(color1);
// 	for (var i = 0; i <= color_index[i]; i++) {
// 		$("color_wheel swatch:nth-of-type(" + color_index[i] + ")").removeClass("dim");
// 	}
// }

function get_color_scheme() {
		color_scheme = $(this).data("color_scheme");
	console.log(color_scheme);
	var base_color_index = color_index[0];
	switch	(color_scheme) {
		case "triadic":
		if(base_color_index<5) {
		color_index.push(base_color_index + 4, base_color_index + 8);
		}
		else if(base_color_index<9) {
		color_index.push(base_color_index + 4, base_color_index - 4);
		}
		else {
		color_index.push(base_color_index - 4, base_color_index - 8);
		}
		break;

		case "complementary":
		if(base_color_index<7) {
		color_index.push(base_color_index + 6);
		}
		else {
		color_index.push(base_color_index - 6);
		}
		break;

		case "split-complementary":
		if(base_color_index<6) {
		color_index.push(base_color_index + 7, base_color_index + 5);
		}
		else if(base_color_index>7) {
		color_index.push(base_color_index - 7, base_color_index - 5);
		}
		else {
		color_index.push(base_color_index + 5, base_color_index -5);
		}
	break;

		case "analogous":

		if(base_color_index==1) {
		color_index.push(12, 2);
		}
		else 	if(base_color_index==12) {
		color_index.push(11, 1);
		}
		else {
		color_index.push(base_color_index - 1, base_color_index + 1);
		}
		break;
	}
}


function empty_color_index() {
color_index.length=1;
}


$("color_wheel swatch").click(function() {
	if (typeof color_scheme == 'undefined') {
	console.log("choose a color scheme");
	}
	var base_color_index = $(this).data("color_index");
	color_index = [];
	color_index.push(base_color_index);
	update_color_wheel();
	color_rgb = $(this).css("background-color");
	color_hex = rgb2hex(color_rgb);
	color_hsl = RGBToHSL(color_rgb);
	return {
	color_rgb: color_rgb,
	color_index: color_index,
	};
});

$(".color_schemes input").click(function() {
	empty_color_index();
	get_color_scheme();
	update_color_wheel();
});
});



function generate_steps(color_hsl, swatch_num) {
$("palette").html("");
var h = color_hsl.split('(').pop().split(',')[0]; 
console.log(h);
var l = color_hsl.substring(color_hsl.lastIndexOf(",") + 1, color_hsl.lastIndexOf("%"));
var l_rounded = Math.round(parseFloat(l));
var lightness_levels = new Array();
var tint_step = Math.round(l_rounded / 6);
var tone_step = Math.round((100 - l_rounded) / 6);
var step = 0;
for (var i = 0; i < swatch_num; i++) {
var $newSwatch = "<swatch></swatch>";
$("palette").append($newSwatch);
}
for (var i = 0; i < 7; i++) {
step += tint_step;
tint_level = 'hsl(' + h + ',100%,' + step + '%)';
lightness_levels.push(tint_level);
}
tone_level = color_hsl;
lightness_levels.push(tone_level);
for (var i = 0; i < 7; i++) {
step += tone_step;
tone_level = 'hsl(' + h + ',100%,' + step + '%)';
lightness_levels.push(tone_level);
}
console.log(lightness_levels);
console.log(lightness_levels.length);
for (var i = 0; i < lightness_levels.length; i++) {
$("palette swatch:nth-of-type(" + i + ")").css("background-color", lightness_levels[i]);
}
}
