$(document).ready(function() {

		// rgn to hex. probably don't need this
		function rgb2hex(rgb) {
				rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

				function hex(x) {
						return ("0" + parseInt(x).toString(16)).slice(-2);
				}
				return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
		}

		// rgb to hsl. Need this because swatch groups will use lightness (l) value to build value range
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

				// Make r, g, and b fractions of 1
				let r = rgb[0] / 255,
						g = rgb[1] / 255,
						b = rgb[2] / 255;

				// Find greatest and smallest channel values
				let cmin = Math.min(r, g, b),
						cmax = Math.max(r, g, b),
						delta = cmax - cmin,
						h = 0,
						s = 0,
						l = 0;

				// Calculate hue
				// No difference
				if (delta === 0) h = 0;
				else if (cmax == r)
						// Red is max
						h = ((g - b) / delta) % 6;
				else if (cmax == g)
						// Green is max
						h = (b - r) / delta + 2;
				else
						// Blue is max
						h = (r - g) / delta + 4;

				h = Math.round(h * 60);

				// Make negative hues positive behind 360°
				if (h < 0) h += 360;
				// Calculate lightness
				l = (cmax + cmin) / 2;

				// Calculate saturation
				s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

				// Multiply l and s by 100
				s = +(s * 100).toFixed(1);
				l = +(l * 100).toFixed(1);

				return "hsl(" + h + "," + s + "%," + l + "%)";
		}
		// need a function to convert hsl to rgb since jquery only works with rgb colors? hmm
		function HSLToRGB(h,s,l) {
  // Must be fractions of 1
  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs((h / 60) % 2 - 1)),
      m = l - c/2,
      r = 0,
      g = 0,
      b = 0;
}
var base_color_index;
var color_scheme;
var alt_colors = new Array();

function reset_color_wheel(base_color_index,alt_colors) {
					$("color_wheel swatch").addClass("dim");
					$("color_wheel swatch:nth-of-type(" + base_color_index + ")").removeClass("dim");
}

		//1. click a base color color in the color wheel
$("color_wheel swatch").click(function() {
			// see if a color scheme has been set
			console.log(color_scheme);
			if (typeof color_scheme == 'undefined') {
				console.log("choose a color scheme");
}
				base_color_index = $(this).data("color_index");
				reset_color_wheel(base_color_index);
				base_color_rgb = $(this).css("background-color");
				base_color_hex = rgb2hex(base_color_rgb);
				// convert to hsl
				base_color_hsl = RGBToHSL(base_color_rgb);
				// build the steps
				// $("#base_color_hsl").css("background-color", base_color_hsl);


return {
        base_color_rgb: base_color_rgb,
        base_color_index: base_color_index,
    };

		});

		// 2. click a color scheme option
$(".controls input").click(function() {

			if (typeof base_color_index == 'undefined') {
				console.log("choose a base color");
}
else {
	reset_color_wheel(base_color_index);
}

				color_scheme = $(this).data("color_scheme");
				switch	(color_scheme) {
case "triadic":
if(base_color_index<5) {
	var alt_color_index_1 = base_color_index + 4;
	var alt_color_index_2 = base_color_index + 8;
}

else if(base_color_index<9) {
	var alt_color_index_1 = base_color_index + 4;
	var alt_color_index_2 = base_color_index - 4;
}

else {
	var alt_color_index_1 = base_color_index - 4;
	var alt_color_index_2 = base_color_index - 8;

}

break;

case "complementary":
if(base_color_index<7) {
	var alt_color_index_1 = base_color_index + 6;
}

else {
	var alt_color_index_1 = base_color_index - 6;
}

$("color_wheel swatch:nth-of-type(" + alt_color_index_1 + ")").removeClass("dim");


var alt_color_rgb_1 = $("color_wheel swatch:nth-of-type(" + alt_color_index_1 + ")").css("background-color");

break;


case "split-complementary":
if(base_color_index<6) {
	alt_colors.push(base_color_index + 7);
	alt_colors.push(base_color_index + 5);
}

else if(base_color_index>6) {
	alt_colors.push(base_color_index - 7);
	alt_colors.push(base_color_index - 5);
}

else {
	alt_colors.push(base_color_index + 5);
	alt_colors.push(base_color_index + 5);

}
// $("color_wheel swatch:nth-of-type(" + alt_color_index_1 + ")").removeClass("dim");
// $("color_wheel swatch:nth-of-type(" + alt_color_index_1 + ")").removeClass("dim");
// $("color_wheel swatch:nth-of-type(" + alt_color_index_2 + ")").removeClass("dim");
// var alt_color_rgb_1 = $("color_wheel swatch:nth-of-type(" + alt_color_index_1 + ")").css("background-color");
// var alt_color_rgb_2 = $("color_wheel swatch:nth-of-type(" + alt_color_index_2 + ")").css("background-color");
console.log(alt_colors);
break;



case "analogous":
if(base_color_index==12) {
	var alt_color_index_1 = 11;
	var alt_color_index_2 = 1;
}


else {
	var alt_color_index_1 = base_color_index - 1;
	var alt_color_index_2 = base_color_index + 1;

}

$("color_wheel swatch:nth-of-type(" + alt_color_index_1 + ")").removeClass("dim");
$("color_wheel swatch:nth-of-type(" + alt_color_index_2 + ")").removeClass("dim");


var alt_color_rgb_1 = $("color_wheel swatch:nth-of-type(" + alt_color_index_1 + ")").css("background-color");
var alt_color_rgb_2 = $("color_wheel swatch:nth-of-type(" + alt_color_index_2 + ")").css("background-color");

break;

// choosing a color scheme sets the alt colors and color scheme

}


		});
});







		// Generate L values ranging from almost white to almost black. Since the lightness isn't always 50%, the steps may be different depending on which direction they are going.
		function generate_steps(base_color_hsl, swatch_num) {
// clear old swatches. maybe they can be reused?
							$("palette").html("");

				// console.log(base_color_hsl);
				var base_h = base_color_hsl.split('(').pop().split(',')[0]; 
				console.log(base_h);
				var base_l = base_color_hsl.substring(base_color_hsl.lastIndexOf(",") + 1, base_color_hsl.lastIndexOf("%"));
				var base_l_rounded = Math.round(parseFloat(base_l));
				var lightness_levels = new Array();
				var tint_step = Math.round(base_l_rounded / 6);
				var tone_step = Math.round((100 - base_l_rounded) / 6);
				// console.log(tint_step);
				// console.log(tone_step);
				var step = 0;
				// generate swatches
				for (var i = 0; i < swatch_num; i++) {
						var $newSwatch = "<swatch></swatch>";
						$("palette").append($newSwatch);
						// $("palette swatch").css("background-color", base_color_hsl);
				}
				// build values
				for (var i = 0; i < 7; i++) {
						step += tint_step;
						// tint_level = 'hsl(60,100%,' + step + '%)';
						tint_level = 'hsl(' + base_h + ',100%,' + step + '%)';
						lightness_levels.push(tint_level);
						// console.log(lightness_levels);

						// update the l of the palette swatches
				}

				// get the midpoint
										tone_level = base_color_hsl;
						lightness_levels.push(tone_level);
				for (var i = 0; i < 7; i++) {
						step += tone_step;
						tone_level = 'hsl(' + base_h + ',100%,' + step + '%)';
						lightness_levels.push(tone_level);
				}
										console.log(lightness_levels);
										console.log(lightness_levels.length);

				for (var i = 0; i < lightness_levels.length; i++) {

												$("palette swatch:nth-of-type(" + i + ")").css("background-color", lightness_levels[i]);

				}
		}


