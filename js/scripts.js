$(document).ready(function() {
    // global variables
    var color_index = new Array();
    var color_scheme;
    var number_steps;

    $("color_wheel swatch").click(function() {
        base_color = $(this).data("color_index");
// console.log(base_rgb);
        if (color_scheme) {
            update_color_index(base_color);
        } else {
            color_index.length = 0;
            color_index.unshift(base_color);
        }
        update_color_wheel(base_color);
        // base_hsl = RGBToHSL(base_rgb);


    });

    $("color_schemes input").click(function() {
        color_scheme = $(this).data("color_scheme");
        if (color_index.length == 0) {
            alert("Click a color");
        } else {

$("palette").html("");
            base_color = color_index[0];
            update_color_index(color_index[0]);

        }
    });

    function update_color_index(base_color) {
        color_index.length = 1;
        console.log(color_index[0]);
          base_rgb = $("color_wheel swatch:nth-of-type(" + color_index[0] + ")").css("background-color");
base_hsl=RGBToHSL(base_rgb);
console.log(base_hsl);
generate_steps(base_hsl,"base_color");
        switch (color_scheme) {
            case "triadic":
                if (base_color < 5) {
                    color_index.push(base_color + 4, base_color + 8);

                } else if (base_color < 9) {
                    color_index.push(base_color + 4, base_color - 4);
                } else {
                    color_index.push(base_color - 4, base_color - 8);
                }
                console.log(color_index[1]);
alt_rgb1 = $("color_wheel swatch:nth-of-type(" + color_index[1] + ")").css("background-color");
alt_hsl1=RGBToHSL(alt_rgb1);
console.log(alt_hsl1);
generate_steps(alt_hsl1, "alt_1");
alt_rgb2 = $("color_wheel swatch:nth-of-type(" + color_index[2] + ")").css("background-color");
alt_hsl2=RGBToHSL(alt_rgb2);
generate_steps(alt_hsl2, "alt_2");
                break;
            case "complementary":
                if (base_color >= 7) {
                    color_index.push(base_color - 6);
                } else {
                    color_index.push(base_color + 6);
                }
                break;
            case "split-complementary":
                if (base_color < 6) {
                    color_index.push(base_color + 7, base_color + 5);
                } else if (base_color > 7) {
                    color_index.push(base_color - 7, base_color - 5);
                } else {
                    color_index.push(base_color + 5, base_color - 5);
                }
                break;
            case "analogous":
                if (base_color == 1) {
                    color_index.push(12, 2);
                } else if (base_color == 12) {
                    color_index.push(11, 1);
                } else {
                    color_index.push(base_color - 1, base_color + 1);
                }
                break;
            default:
                  base_rgb=$("color_wheel swatch:nth-of-type(" + color_index[0] + ")").css("background-color");
                  base_hsl=RGBToHSL(base_rgb);

        }
        // $("palette").html("");
        generate_steps(base_hsl,"base_color");
        update_color_wheel(color_index[0]);
    }

    function update_color_wheel(base_color) {
        color_index.shift();
        color_index.unshift(base_color);
        color_index_length = color_index.length;
        $("color_wheel swatch").addClass("dim");

        for (var i = 0; i < color_index_length; i++) {
            $("color_wheel swatch:nth-of-type(" + color_index[i] + ")").removeClass("dim");
        }

    }


    function generate_steps(hsl, palette_id) {
var h = hsl.split('(').pop().split(',')[0]; 
console.log(h);
var l = hsl.substring(hsl.lastIndexOf(",") + 1, hsl.lastIndexOf("%"));
var l_rounded = Math.round(parseFloat(l));
var lightness_levels = new Array();
var tint_step = Math.round(l_rounded / 6);
var tone_step = Math.round((100 - l_rounded) / 6);
var step = 0;
for (var i = 0; i < 12; i++) {
var $newSwatch = "<swatch></swatch>";
$("palette#" + palette_id +"").append($newSwatch);
}
for (var i = 0; i < 7; i++) {
step += tint_step;
tint_level = 'hsl(' + h + ',100%,' + step + '%)';
lightness_levels.push(tint_level);
}
tone_level = hsl;
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

});