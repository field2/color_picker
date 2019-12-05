// set global variables
var color_index = new Array();
var color_scheme;
var number_steps;

// if they click on a color wheel swatch to choose a base color
$("color_wheel swatch").click(function() {
  // get the color index from the swatch and store as the base color
  base_color = $(this).data("color_index");
  // if a color scheme has been chosen and a color wheel swatch has been clicked
  if (color_scheme && color_index.length > 0) {
    // update the color index with the new values
    update_color_index(base_color);
  } 
  // if the color scheme has been chosen, but a base color has not been clicked yet
  else if (color_scheme) {
    // add the color index to the color_index array
    color_index.push(base_color);
        // update the color_index array with the new values
    update_color_index(base_color);
  } 
  // otherwise, the color wheel is being clicked for the first time
  else {
    // add the color index to the color_index array, using shift in case they are clicking more than one color
    color_index.shift(base_color);
  }
  // update the color wheel with the values stored in the color_index array
  update_color_wheel(base_color);
});
// if they click on a color scheme option
$("color_schemes input").click(function() {
  // get the color scheme from data-color_scheme attribute and store it in the color_scheme var
  color_scheme = $(this).data("color_scheme");
  // if they click a color scheme before they've chosen a base color. the color_index array will be empty
  if (color_index.length == 0) {
    // prompt them to choose a base color
    $('#choose_a_color').addClass("callout"); 
  } else {
    // remove any swatches currently in the palette
    $("palette").html("");
    // update the color_index array based the new first color in the color_index array
    update_color_index(color_index[0]);
  }
});

function update_color_index(base_color) {
  // remove all values except the first one; the base_color
  color_index.length = 1;
  // populate the remaining colors based on the chosen color scheme
  switch (color_scheme) {
      // need the color indexes to always be from 1 to 12 so this is a bit tricky
    case "triadic":
      // triadic needs to be 1/3 of the way around the wheel
      if (base_color < 5) {
        color_index.push(base_color + 4, base_color + 8);
      } else if (base_color < 9) {
        color_index.push(base_color + 4, base_color - 4);
      } else {
        color_index.push(base_color - 4, base_color - 8);
      }
      // store the background colors as css. didn't know this was in RGB format
      alt_rgb1 = $(
        "color_wheel swatch:nth-of-type(" + color_index[1] + ")"
      ).css("background-color");
      // convert the RGB to HSL so the tint/tone levels can be easily created by dividing the L value
      alt_hsl1 = RGBToHSL(alt_rgb1);
      // generate the tint/tone levels alt color 1
      generate_steps(alt_hsl1, "alt_1");
      alt_rgb2 = $(
        "color_wheel swatch:nth-of-type(" + color_index[2] + ")"
      ).css("background-color");
      alt_hsl2 = RGBToHSL(alt_rgb2);
       // generate the tint/tone levels alt color 1
      generate_steps(alt_hsl2, "alt_2");
      break;
    case "complementary":
      // repeat for the other color schemes
      if (base_color >= 7) {
        color_index.push(base_color - 6);
      } else {
        color_index.push(base_color + 6);
      }
      alt_rgb1 = $(
        "color_wheel swatch:nth-of-type(" + color_index[1] + ")"
      ).css("background-color");
      alt_hsl1 = RGBToHSL(alt_rgb1);
      generate_steps(alt_hsl1, "alt_1");
      break;
    case "split-complementary":
      if (base_color < 6) {
        color_index.push(base_color + 7, base_color + 5);
      } else if (base_color > 7) {
        color_index.push(base_color - 7, base_color - 5);
      } else {
        color_index.push(base_color + 5, base_color - 5);
      }
      alt_rgb1 = $(
        "color_wheel swatch:nth-of-type(" + color_index[1] + ")"
      ).css("background-color");
      alt_hsl1 = RGBToHSL(alt_rgb1);
      generate_steps(alt_hsl1, "alt_1");
      alt_rgb2 = $(
        "color_wheel swatch:nth-of-type(" + color_index[2] + ")"
      ).css("background-color");
      alt_hsl2 = RGBToHSL(alt_rgb2);
      generate_steps(alt_hsl2, "alt_2");
      break;
    case "analogous":
      if (base_color == 1) {
        color_index.push(12, 2);
      } else if (base_color == 12) {
        color_index.push(11, 1);
      } else {
        color_index.push(base_color - 1, base_color + 1);
      }
      alt_rgb1 = $(
        "color_wheel swatch:nth-of-type(" + color_index[1] + ")"
      ).css("background-color");
      alt_hsl1 = RGBToHSL(alt_rgb1);
      generate_steps(alt_hsl1, "alt_1");
      alt_rgb2 = $(
        "color_wheel swatch:nth-of-type(" + color_index[2] + ")"
      ).css("background-color");
      alt_hsl2 = RGBToHSL(alt_rgb2);
      generate_steps(alt_hsl2, "alt_2");
      break;
  }
// reset the color index to contain only the base color. need to do this in case they pick a different swatch
  update_color_wheel(color_index[0]);
}

function update_color_wheel(base_color) {
  // if they have chosen a scheme
  if (color_scheme !== "undefined") {
      // need to remove the old base color but keep the length of the array > 1 so it doesn't f up... this needs better explanaition I know. try comenting the next line and test and you'll see. sometimes extra colors get left undimmed in the wheel 
    color_index.shift();
    // add the new base color index
    color_index.unshift(base_color);
  } else {
    // if there's no color scheme yet; i.e., they haven't chosen one, add the base color
    color_index.push(base_color);
  }
  // dim all the color wheel swatches
  $("color_wheel swatch").addClass("dim");
  // get the RGB value of the color wheel swatch at the first position in the index
  base_rgb = $("color_wheel swatch:nth-of-type(" + color_index[0] + ")").css(
    "background-color"
  );
  // convert it to hsl for easy stepping
  base_hsl = RGBToHSL(base_rgb);
  // generate the steps
  generate_steps(base_hsl, "base_color");
 // undim the swatches at the locations stored in the color_index
  for (var i = 0; i < color_index.length; i++) {
    $("color_wheel swatch:nth-of-type(" + color_index[i] + ")").removeClass(
      "dim"
    );
  }
}

// generate the palette swatches
function generate_steps(hsl, palette_id) {
  // clear the palette of any existing swatches
  $("palette#" + palette_id).html("");
  // get the h value from the hsl passed to the function
  var h = hsl.split("(").pop().split(",")[0];
  // repeat for l
  var l = hsl.substring(hsl.lastIndexOf(",") + 1, hsl.lastIndexOf("%"));
  // round it 
  var l_rounded = Math.round(parseFloat(l));
  // create an array for the lightness levels
  var lightness_levels = new Array();
  // create steps for tint and tone
  var tint_step = Math.round(l_rounded / 6);
  var tone_step = Math.round((100 - l_rounded) / 6);
  var step = 0;
  // generate the palette swatchs
  for (var i = 0; i < 13; i++) {
    var $newSwatch = "<swatch></swatch>";
    // add the swatches to the palette id that was passed in the function
    $("palette#" + palette_id + "").append($newSwatch);
  }
  // generate six tints
  for (var i = 0; i < 6; i++) {
    step += tint_step;
    tint_level = "hsl(" + h + ",100%," + step + "%)";
    lightness_levels.push(tint_level);
  }
  // need to add the original hsl for the middle step. there's always gonna be an odd number of palette swatches for this reason
  tone_level = hsl;
  lightness_levels.push(tone_level);
  // generate the tones
  for (var i = 0; i < 6; i++) {
    step += tone_step;
    tone_level = "hsl(" + h + ",100%," + step + "%)";
    lightness_levels.push(tone_level);
  }
  // set the background colors of the palette swatches with the ones stored in the lightnesslevels array
  for (var i = 0; i < lightness_levels.length; i++) {
    var ntarget = i + 1;
    $("palette#" + palette_id + " swatch:nth-of-type(" + ntarget + ")").css(
      "background-color",
      lightness_levels[i]
    );
  }
}
// not mine-from css-tricks, add reference
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
  else if (cmax == r) h = ((g - b) / delta) % 6;
  else if (cmax == g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;
  h = Math.round(h * 60);
  if (h < 0) h += 360;
  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);
  return "hsl(" + h + "," + s + "%," + l + "%)";
}
