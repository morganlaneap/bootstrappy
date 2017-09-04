/**
 * Created by Morgan Lane on 04/09/2017.
 */

var element = "";

function bootstrappify() {
    var editor = $('.bootstrappy-editor');
    var result = $('.bootstrappy-result');
    var markup = "";
    var bootstrappy = editor.val();
    var lines = bootstrappy.split('\n');

    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];

        // this is a bootstrappy class line
        if (line.includes('@')) {
            line = line.replace(/\s/g,'');

            var endTag = checkEndTag(line);

            if (endTag != "") {
                markup += endTag;
                continue;
            }

            // we have a line to process
            // so split it into its sections
            var sections = line.replace("@", "");
            sections = sections.split(',');

            var classNames = "";

            for (var section = 0; section < sections.length; section++) {
                classNames += processSection(sections[section]);
            }

            classNames = classNames.substr(0, classNames.length - 1);

            markup += "<" + element + " class=\"" + classNames + "\">";
        } else if(line.includes('#')) {
            var sections = line.split(' ');
            var query = sections[0];
            query = query.replace('#', '');

            if (isKnownElement(query)) {
                var elm = "<" + query.toString() + ">";

                for (var section = 1; section < sections.length; section++) {
                    elm += sections[section] + ' ';
                }

                markup += elm;

                markup += "</" + query.toString() + ">";
            } else {
                markup += line;
            }
        } else {
            markup += line;
        }
    }

    result.text(markup);

    //tidyUp();
}

function processSection(section) {
    if (section.includes("->")) {
        // not implemented yet
    } else {
        element = "div";
        return section + " ";
    }
}

function checkEndTag(line) {
    switch (line) {
        case "@end":
            return "</div>";
        default:
            return "";
    }
}

function isKnownElement(query) {
    var elements = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'];

    return elements.includes(query);
}

/*function tidyUp() {
    options = {
        "indent":"auto",
        "indent-spaces":2,
        "wrap":80,
        "markup":true,
        "output-xml":false,
        "numeric-entities":true,
        "quote-marks":true,
        "quote-nbsp":false,
        "show-body-only":true,
        "quote-ampersand":false,
        "break-before-br":true,
        "uppercase-tags":false,
        "uppercase-attributes":false,
        "drop-font-tags":true,
        "tidy-mark":false
    };

    var markup = $('.bootstrappy-result').text();
    var result = tidy_html5(markup, options);

    $('.bootstrappy-result').text(result);
}*/
