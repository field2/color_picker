$(document).ready(function() {
    console.log("Choose a base color index.");
    // global variables
    var color_index = new Array();
    var color_scheme;
    // color wheel
    $("color_index swatch").click(function() {
        base_color_index = $(this).data("color_index");
                // remove all colors except the one they just clicked
       color_index.length = 0;

        color_index.push(base_color_index);
                console.log("Your base color index is " + base_color_index);

        if (typeof color_scheme == 'undefined') {
        	        console.log("Next, choose a color scheme.");

            // console.log("base_color_index: " + base_color_index);

        } else {
        	set_color_scheme(base_color_index);
            // get_color_scheme();
        }
                    set_base_color(base_color_index);
    });
    function set_base_color(base_color_index) {
        color_index.push(base_color_index);
        // console.log(color_index[0]);
        // reset base color
        
    }
    function get_base_color() {
        // is the base color set yet?
    }
    function update_color_index() {
        var number_colors = color_index.length;
        for (var i = 0; i < number_colors; i++) {
            $("color_index swatch:nth-of-type(" + color_index[i] + ")").removeClass("dim");
        }
    }
    $("button#reset_color_index").click(function() {
        reset_color_index(color_scheme);
    });


    // color scheme 
    $("color_schemes input").click(function() {
        color_scheme = $(this).data("color_scheme");
        set_color_scheme(color_scheme);
    });
    function set_color_scheme(color_scheme) {
        console.log(color_scheme);
        if (typeof color_index[0] == 'undefined') {
            console.log("Set your base color.");
        } else {

               color_index.length = 1;
            var base_color_index = color_index[0];
            console.log(base_color_index);
            switch (color_scheme) {
                case "triadic":
                    if (base_color_index < 5) {
                        color_index.push(base_color_index + 4, base_color_index + 8);
                    } else if (base_color_index < 9) {
                        color_index.push(base_color_index + 4, base_color_index - 4);
                    } else {
                        color_index.push(base_color_index - 4, base_color_index - 8);
                    }
                    break;
                case "complementary":
                    if (base_color_index > 7) {
                        color_index.push(base_color_index - 6);
                    } else {
                        color_index.push(base_color_index + 6);
                    }
                    break;
                case "split-complementary":
                    if (base_color_index < 6) {
                        color_index.push(base_color_index + 7, base_color_index + 5);
                    } else if (base_color_index > 7) {
                        color_index.push(base_color_index - 7, base_color_index - 5);
                    } else {
                        color_index.push(base_color_index + 5, base_color_index - 5);
                    }
                    break;
                case "analogous":
                    if (base_color_index == 1) {
                        color_index.push(12, 2);
                    } else if (base_color_index == 12) {
                        color_index.push(11, 1);
                    } else {
                        color_index.push(base_color_index - 1, base_color_index + 1);
                    }
                    break;
            }
        }
        console.log(color_index);
    }
    function get_color_scheme() {
        color_scheme = $(this).data("color_scheme");
        console.log(color_scheme);
    }
    // color format conversion functions
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
    function HSLToRGB(h, s, l) {
        s /= 100;
        l /= 100;
        let c = (1 - Math.abs(2 * l - 1)) * s,
            x = c * (1 - Math.abs((h / 60) % 2 - 1)),
            m = l - c / 2,
            r = 0,
            g = 0,
            b = 0;
    }
});