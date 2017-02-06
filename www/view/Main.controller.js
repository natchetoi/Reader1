sap.ui.controller("Reader1.view.Main", {

	/**
	 * Called when a controller is instantiated and its View controls (if available) are already created.
	 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
	 * @memberOf Reader1.view.Main
	 */
		onInit: function() {	
					
		},

	/**
	 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
	 * (NOT before the first rendering! onInit() is used for that one!).
	 * @memberOf Reader1.view.Main
	 */
	//	onBeforeRendering: function() {
	//
	//	},

	/**
	 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
	 * This hook is the same one that SAPUI5 controls get after being rendered.
	 * @memberOf Reader1.view.Main
	 */
		onAfterRendering: function() {
			var content = this.byId("content");
			
			content.visible = true;
			var html1 = this.byId("html1");
			
/*			
			var html2 = new new sap.ui.core.HTML("html1", { content: 
				"&lt;p&gt;Hello World&lt;/p&gt;", 
				preferDOM : false,
				afterRendering : function(e) {
					alert('Rendered');
				}			
			});
*/			

			var gallery = this.byId("gallery");
			
			var img1 = new Image("img1", { src : "img/1.jpg" });
			
//			gallery.addPage( img1 );
			gallery.visible = true;
	//		html1.visible = false;
		},

	/**
	 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
	 * @memberOf Reader1.view.Main
	 */
		onExit: function() {
	
		},
		
	addTerms: function( node, items ) {
		
		for(var i=0; i< items.size; i++) {
			var text = items[i].name;
			var icon = 'sap-icon://employee';
			var item = new sap.tnt.NavigationListItem({
					'text': text,
					'icon': icon
				});
			node.addItem(item);	
		}
	},
	
	setNavList: function(taxonomyId) {
		
		var navList = new sap.tnt.NavigationList({
			expanded: true,
			items: [] });
			
		
	}

});