jQuery.sap.require("libs.linq");
sap.ui.controller("Reader1.view.Main", {
    albumFragment: null,
    htmlFragment: null,
    rootMenuItems: null,
    menuControl: null,

    initMenu: function () {
        var self = this;
        if (self.rootMenuItems !== null) return;

        var url = "localService/mockdata/TermSet.json";
        jQuery.ajax({
            url: url,
            async: true,
            success: function (data) {
                self.rootMenuItems = Enumerable.from(data)
                    .orderBy(function (x) {
                        return x.name;
                    })
                    .toArray();
                self.createMenu();
            },
        });
    },

    createMenu: function () {
        var self = this;
        var navigationList = self.getView().byId("contentMenu");

        for(var i=0; i<self.rootMenuItems.length; i++)
        {
            var item = new sap.tnt.NavigationListItem();
            item.setText(self.rootMenuItems[i].name);
            item.setIcon("sap-icon://feed");
            item.setBindingContext(self.rootMenuItems[i]);
            navigationList.addItem(item);

            if(self.rootMenuItems[i].items !== undefined){
                self.addChildren(item, self.rootMenuItems[i].items);
            }
        }
    },

    addChildren: function (parentItem, childItems) {
        for(var i=0; i<childItems.length; i++){
            var item = new sap.tnt.NavigationListItem();
            item.setText(childItems[i].name);
            item.setBindingContext(childItems[i]);

            parentItem.addItem(item);
        }
    },
    /**
     * Called when a controller is instantiated and its View controls (if available) are already created.
     * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
     * @memberOf Reader1.view.Main
     */
    onInit: function () {
        var self = this;
        self.initMenu();
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
        //this.showAlbumFragment(self);
        // this.showHtmlFragment(self);
    },

    /**
     * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
     * @memberOf Reader1.view.Main
     */
    onExit: function () {

    },
    /***************************************************************************/

    addTerms: function (node, items) {

        for (var i = 0; i < items.size; i++) {
            var name = items[i].name;
            var icon = 'sap-icon://employee';
            var item = new sap.tnt.NavigationListItem({
                'text': name,
                'icon': icon
            });
            node.addItem(item);
        }
    },

    setNavList: function (taxonomyName, taxonomyId) {
        var navList = new sap.tnt.NavigationListItem({
            // textDirection: sap.ui.core.TextDirection.RTL,
            'text': taxonomyName,
            'expanded': true,
            'icon': 'sap-icon://',
            'items': []
        });
    },

    onToggleMenu: function () {
        var navigationList = this.getView().byId('contentMenu');
        var expanded = !navigationList.getExpanded();

        navigationList.setExpanded(expanded);
    }
});