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
    var sections;
    var classNames;
    var id;

    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];

        if (line == "\n") {
            markup += line;
            continue;
        }

        // this is a bootstrappy class line
        if (removeWhitespace(line).toString().startsWith('@')) {
            line = removeWhitespace(line);

            if (line.includes('[')) {
                id = line.substr(line.indexOf('['), line.indexOf(']'));
                line = line.replace(id, "");
                id = id.replace('[', '').replace(']', '');
            }

            var endTag = checkEndTag(line);
            if (endTag != "") {
                markup += endTag;
                continue;
            }

            // we have a line to process
            // so split it into its sections
            sections = line.replace("@", "").split(',');

            classNames = "";

            for (var section = 0; section < sections.length; section++) {
                classNames += processSection(sections[section]);
            }

            // remove the last bit of whitespace
            classNames = classNames.substr(0, classNames.length - 1);

            if (id != undefined) {
                markup += "<" + element + " id=\"" + id + "\" class=\"" + classNames + "\">";
            } else {
                markup += "<" + element + " class=\"" + classNames + "\">";
            }


        } else if(removeWhitespace(line).toString().startsWith('#')) {
            if (line.includes('[')) {
                id = line.substr(line.indexOf('['), line.indexOf(']') -1);
                line = line.replace(id, "");
                id = id.replace('[', '').replace(']', '');
            }

            sections = line.split(' ');
            var query = sections[0];
            classNames = '';
            var hasClass = false;

            query = query.replace('#', '');

            if (query.includes('->')) {
                // we have a class modifier
                hasClass = true;
                var classes = query.split('>')[1];
                classes = classes.split(',');

                for (var c = 0; c < classes.length; c++) {
                    classNames += processSection(classes[c]);
                }

                // remove the last bit of whitespace
                classNames = classNames.substr(0, classNames.length - 1);

                query = query.substr(0, query.indexOf('-'));
            }


            if (isKnownElement(query)) {
                var elm;

                if (hasClass) {
                    elm = "<" + query.toString() + " class=\"" + classNames + "\"";
                } else {
                    elm = "<" + query.toString();
                }

                if (id != undefined) {
                  elm = elm + " id=\"" + id + "\">";
                } else {
                  elm = elm + ">";
                }

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

        id = undefined;
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
    var elements = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'label', 'span'];

    return elements.includes(query);
}

function removeWhitespace(subject) {
    return subject.replace(/\s/g,'');
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
