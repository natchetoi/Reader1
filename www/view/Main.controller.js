jQuery.sap.require("libs.linq");
sap.ui.controller("Reader1.view.Main", {
    albumFragment: null,
    htmlFragment: null,
    menuItems: null,
    rootMenuItems: null,
    termsListFragment: null,


    initMenu: function () {
        var self = this;
        if (self.menuItems !== null) return;

        var url = "localService/mockdata/TermSet.json";
        jQuery.ajax({
            url: url,
            async: true,
            success: function (data) {
                self.menuItems = [];
                self.rootMenuItems = [];

                var rootItems = Enumerable.from(data).toArray();
                for (var i = 0; i < rootItems.length; i++) {
                    self.saveMenuItem(rootItems[i]);
                    self.rootMenuItems.push(rootItems[i]);
                }
                self.createMenu();
            },
        });
    },

    createMenu: function () {
        var self = this;
        var navigationList = self.getView().byId("contentMenu");

        var rootMenuItems = self.rootMenuItems;

        for (var i = 0; i < rootMenuItems.length; i++) {
            var item = new sap.tnt.NavigationListItem();
            item.setText(rootMenuItems[i].name);
            item.setIcon("sap-icon://feed");
            item.setBindingContext(rootMenuItems[i]);
            navigationList.addItem(item);

            if (rootMenuItems[i].items !== undefined) {
                self.addChildrenMenuItems(item, rootMenuItems[i].items);
            }
        }
    },

    saveMenuItem: function (item) {
        var self = this;

        self.menuItems.push(item);
        if (item.items !== undefined) {
            for (var i = 0; i < item.items.length; i++) {
                self.saveMenuItem(item.items[i]);
            }
        }

    },

    addChildrenMenuItems: function (parentItem, childItems) {
        for (var i = 0; i < childItems.length; i++) {
            var item = new sap.tnt.NavigationListItem();
            item.setText(childItems[i].name);
            item.setBindingContext(childItems[i]);

            parentItem.addItem(item);
        }
    },

    onMenuItemSelected: function (item) {
        var self = this;
        var selectedTerm = item.getParameters().item.getBindingContext();
        if (selectedTerm.items !== undefined) {
            self.showReadItems(selectedTerm);
        }
    },

    showContent: function (selectedTerm) {
        var self = this;
        var url = "localService/mockdata/ContentSet.json";
        jQuery.ajax({
            url: url,
            async: true,
            success: function (data) {
                var contentItem = Enumerable.from(data)
                    .where(function(x){
                       return Enumerable.from(x.TermSet).any(function(y){
                           return y.TermID === selectedTerm.TermID;
                       });
                    }).firstOrDefault();
                if(contentItem != null){
                    if(contentItem.type === "art"){
                        self.showArticle(self, contentItem);
                        return;
                    }
                    if(contentItem.type === "alb"){
                        self.showAlbum(self, contentItem);
                        return;
                    }
                }
            },
        });
    },


    showReadItems: function (term) {
        var self = this;
        if (self.termsListFragment === null) {
            self.termsListFragment = sap.ui.xmlfragment(self.getView().getId(), "Reader1.view.TermsList", this);
        }

        self.byId("_panelContent").removeAllContent();
        self.getView().addDependent(self.termsListFragment);
        self.byId("_panelContent").addContent(self.termsListFragment);

        var termsModel = new sap.ui.model.json.JSONModel();
        termsModel.setData(term);
        self.getView().setModel(termsModel, "term");
        self.setMenuExpanded(false);
    },

    onReadListItemSelected: function (item) {
        var self = this;
        var selectedTerm = item.getSource().getBindingContext("term").getObject();

        if (selectedTerm.items !== undefined) {
            self.showReadItems(selectedTerm);
        } else {
            self.showContent(selectedTerm);
        }
    },

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
    },


    showArticle: function (context, contentItem) {
        if (context.htmlFragment === null) {
            context.htmlFragment = sap.ui.xmlfragment(context.getView().getId(), "Reader1.view.HtmlContent", context);
            context.getView().addDependent(context.htmlFragment);
        }
        context.byId("_panelContent").removeAllContent();
        context.byId('_panelContent').addContent(context.htmlFragment);
        context.getView().byId("htmlContent").setContent('<div>' + contentItem.body + '</div>');

        var carousel = context.getView().byId("galleryContent");
        carousel.removeAllPages();
        for(var i=0; i<contentItem.ImageSet.length; i++){
            carousel.addPage(new sap.m.Image({
                src : contentItem.ImageSet[i].src,
                alt : "img" + i
            }));
        }
    },

    showAlbum: function (context, contentItem) {
        if (context.albumFragment === null) {
            context.albumFragment = sap.ui.xmlfragment(context.getView().getId(), "Reader1.view.Album", context);
            context.getView().addDependent(context.albumFragment);
        }
        context.byId("_panelContent").removeAllContent();
        context.byId('_panelContent').addContent(context.albumFragment);
        context.getView().byId("albumHeader").setText(contentItem.body);


        var carousel = context.getView().byId("gallery");
        carousel.removeAllPages();
        for(var i=0; i<contentItem.ImageSet.length; i++){
            carousel.addPage(new sap.m.Image({
                src : contentItem.ImageSet[i].src,
                alt : "imgalt" + i
            }));
        }
    },

    onAfterRendering: function () {

    },

    onExit: function () {

    },

    onToggleMenu: function () {
        var navigationList = this.getView().byId('contentMenu');
        var expanded = !navigationList.getExpanded();
        this.setMenuExpanded(expanded);
    },

    setMenuExpanded: function (expanded) {
        var navigationList = this.getView().byId('contentMenu');
        navigationList.setExpanded(expanded);
    },

    onBtnListBackClick: function () {
        var self = this;
        var currentTerm = self.getView().getModel("term").getData();
        var parentItem = Enumerable.from(self.menuItems)
            .where(function (x) {
                return Enumerable.from(x.items)
                    .any(function (y) {
                        return y.TermID === currentTerm.TermID;
                    });
            })
            .firstOrDefault();
        if (parentItem != null) {
            self.showReadItems(parentItem);
        }

    }
});