sap.ui.controller("Reader1.view.Main", {
    albumFragment: null,
    htmlFragment: null,

    /**
     * Called when a controller is instantiated and its View controls (if available) are already created.
     * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
     * @memberOf Reader1.view.Main
     */
    onInit: function () {

    },

    /**
     * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
     * (NOT before the first rendering! onInit() is used for that one!).
     * @memberOf Reader1.view.Main
     */
    //	onBeforeRendering: function() {
    //
    //	},

    showHtmlFragment: function (self) {
        if (self.htmlFragment === null) {
            self.htmlFragment = sap.ui.xmlfragment(self.getView().getId(), "Reader1.view.HtmlContent");
            self.getView().addDependent(self.htmlFragment);
            self.byId('_panelContent').addContent(self.htmlFragment);
        }
    }, showAlbumFragment: function (self) {
        if (self.albumFragment === null) {
            self.albumFragment = sap.ui.xmlfragment(self.getView().getId(), "Reader1.view.Album");
            self.getView().addDependent(self.albumFragment);
            self.byId('_panelContent').addContent(self.albumFragment);
        }
    }, /**
     * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
     * This hook is the same one that SAPUI5 controls get after being rendered.
     * @memberOf Reader1.view.Main
     */
    onAfterRendering: function () {
        var self = this;
        this.showAlbumFragment(self);
        // this.showHtmlFragment(self);
    },

    /**
     * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
     * @memberOf Reader1.view.Main
     */
    onExit: function () {

    }

});