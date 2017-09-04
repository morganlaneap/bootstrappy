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
        }
    }

    result.text(markup);
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