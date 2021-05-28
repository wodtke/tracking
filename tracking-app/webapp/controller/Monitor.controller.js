sap.ui.define([
	"trackingapp/controller/BaseController",
	"trackingapp/utils/formatter",
	'sap/ui/model/json/JSONModel',
	'sap/m/library'	
], function(BaseController, formatter, JSONModel, mobileLibrary) {
	"use strict";

	var PopinLayout = mobileLibrary.PopinLayout;

	return BaseController.extend("trackingapp.controller.Monitor", {
		formatter: formatter,
		
		onInit: function () {
			// set explored app's demo model on this sample
			var oModel = new JSONModel(sap.ui.require.toUrl("trackingapp/mockdata/products.json"));
			this.getView().setModel(oModel);
		},

		onPopinLayoutChanged: function() {
			var oTable = this.byId("idProductsTable");
			var oComboBox = this.byId("idPopinLayout");
			var sPopinLayout = oComboBox.getSelectedKey();
			switch (sPopinLayout) {
				case "Block":
					oTable.setPopinLayout(PopinLayout.Block);
					break;
				case "GridLarge":
					oTable.setPopinLayout(PopinLayout.GridLarge);
					break;
				case "GridSmall":
					oTable.setPopinLayout(PopinLayout.GridSmall);
					break;
				default:
					oTable.setPopinLayout(PopinLayout.Block);
					break;
			}
		},

		onSelect: function(oEvent) {
			var bSelected = oEvent.getParameter("selected"),
				sText = oEvent.getSource().getText(),
				oTable = this.byId("idProductsTable"),
				aSticky = oTable.getSticky() || [];

			if (bSelected) {
				aSticky.push(sText);
			} else if (aSticky.length) {
				var iElementIndex = aSticky.indexOf(sText);
				aSticky.splice(iElementIndex, 1);
			}

			oTable.setSticky(aSticky);
		},

		onToggleInfoToolbar: function(oEvent) {
			var oTable = this.byId("idProductsTable");
			oTable.getInfoToolbar().setVisible(!oEvent.getParameter("pressed"));
		}


	});
});