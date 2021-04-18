/*
 * vim:sw=4 ts=4 et:
 * Copyright (c) 2015 Torchbox Ltd.
 * felicity@torchbox.com 2015-09-14
 *
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely. This software is provided 'as-is', without any express or implied
 * warranty.
 */

/*
 * Used to initialize Simple MDE when Markdown blocks are used in StreamFields
 */
function easymdeAttach(id) {
    var mde = new EasyMDE({
        element: document.getElementById(id),
        autofocus: false,
        toolbar: ["bold", "italic", "heading-1",
            {
                name: "start meeting",
                action: startMeeting,
                className: "fa fa-play", // Look for a suitable icon
                title: "start meeting (Ctrl/Cmd-Alt-R)",
            }
        ],
    });
    mde.render();

    mde.codemirror.on("change", function () {
        $('#' + id).val(mde.value());
    });
}

/*
* Used to initialize Simple MDE when MarkdownFields are used on a page.
*/
$(document).ready(function () {
    $(".object.markdown textarea").each(function (index, elem) {
        easymdeAttach(elem.id);
    });
});

/*
* Used to initialize content when MarkdownFields are used in admin panels.
*/
$(document).on('shown.bs.tab', function (e) {
    $('.CodeMirror').each(function (i, el) {
        setTimeout(
            function () {
                el.CodeMirror.refresh();
            }, 100
        );
    });
});

// Custom button actions

function startMeeting(editor) {

    var cm = editor.codemirror;
    var output = '';
    var selectedText = cm.getSelection();
    var text = selectedText || 'placeholder';

    output = "|start|(" + new Date().toLocaleTimeString() + ")" ;
    cm.replaceSelection(output);
}