$(document).ready(function() {
    // global variables
    var color_index = new Array();
    var color_scheme;
    $("color_wheel swatch").click(function() {

        base_color = $(this).data("color_index");
        if (color_scheme) {
            console.log(color_scheme);
            update_color_index(base_color);

        } else {
            color_index.length = 0;
            color_index.push(base_color);

        }
        update_color_wheel(base_color);
        console.log(color_index);
    });

    $("color_schemes input").click(function() {
        color_scheme = $(this).data("color_scheme");
        if (color_index.length == 0) {
            console.log("Click a color");
        } else {
            // console.log("Color index is " + color_index);

        color_index.length = 1;
            update_color_index(color_index[0]);
        }
        update_color_wheel();
    });

    function update_color_index(base_color) {
        console.log(color_scheme);
        switch (color_scheme) {
            case "triadic":
                if (base_color < 5) {
                    color_index.push(base_color + 4, base_color + 8);
                } else if (base_color < 9) {
                    color_index.push(base_color + 4, base_color - 4);
                } else {
                    color_index.push(base_color - 4, base_color - 8);
                }
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
        }
        console.log(color_index);
    }

    function update_color_wheel() {

        console.log("Base color is " + base_color);
        color_index_length = color_index.length;
        console.log("Index contains " + color_index_length + " color(s)");
        $("color_wheel swatch").addClass("dim");
        for (var i = 0; i < color_index_length; i++) {
            $("color_wheel swatch:nth-of-type(" + color_index[i] + ")").removeClass("dim");
        }

    }



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