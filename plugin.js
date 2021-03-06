tinymce.PluginManager.add('maxchars', function(editor) {
    //set a default value for the maxChars peroperty
    editor.maxChars = editor.settings.charLimit || 500;

    var label = null;

    function init() {
        //add a custom style which will be injected into the iframe
        editor.contentStyles.push(".maxchars {color: red !important;}");

        //try and add label to to the status bar
        var statusbar = editor.theme.panel && editor.theme.panel.find('#statusbar')[0];

        if (statusbar) {
            statusbar.insert({
                type: 'label',
                name: 'maxcharslabel',
                style: "color:red;",
                classes: 'wordcount' //this puts it on the right
            }, 0);

            //cache the newly created element
            label = statusbar.find('#maxcharslabel')
        }

        //console.log("Max chars inititilaized: limit = %d", editor.maxChars);
        updateStyle(); //check if the initial content is valid
    };

    function updateMsg(show) {
        if (!label) {
            return;
        }
        var msg = show ? editor.maxChars + " chars max" : "";
        //console.log(panel);
        label.text(msg);
    }

    function updateStyle() {
        var content = editor.getContent({
            format: 'text'
        });
        var $body = editor.$('.mce-content-body');

        //add class to content body based on content length
        if (content.length > editor.maxChars) {
            $body.addClass("maxchars");
            updateMsg(true);

        } else {
            $body.removeClass("maxchars");
            updateMsg(false);
        }

    };
    editor.on('init', init);
    editor.on("change keyUp", updateStyle);
});

