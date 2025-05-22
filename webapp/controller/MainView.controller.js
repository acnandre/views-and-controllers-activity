sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageToast) {

    "use strict";

    return Controller.extend("com.training.exer1dumandan.controller.MainView", {
        onInit() {
            //Floating footer
            this._Page = this.byId("page");
			this._Page.setFloatingFooter(!this._Page.getFloatingFooter());
        },
        onAddItem: function (){
            var oTextBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            var sMsg = oTextBundle.getText("addButtonMsg");
            this.fnDisplayMsg(sMsg);
        },
        fnDisplayMsg: function (sMsg){
            MessageToast.show(sMsg);
        },
        onChangeMOP: function (oEvent) {
            var sSelectedKey = oEvent.getParameter("selectedItem").getProperty("key");
            var oMobileLabel = this.getView().byId("idLblPhone");
            var oMobileInput = this.getView().byId("idInputPhone");
            var oCCDetailsLabel = this.getView().byId("idLblCC");
            var oCCDetailsInput = this.getView().byId("idInputCC");

            if (sSelectedKey === "GCASH"){
                // show the mobile field
                oMobileLabel.setVisible(true);
                oMobileInput.setVisible(true);
            } 
            else {
                oMobileLabel.setVisible(false);
                oMobileInput.setVisible(false);
            }
            //Logic for credit card details
            if(sSelectedKey === "CC"){
                oCCDetailsLabel.setVisible(true);
                oCCDetailsInput.setVisible(true);
            }
            else {
                oCCDetailsLabel.setVisible(false);
                oCCDetailsInput.setVisible(false);
            }
            this.fnDisplayMsg(oEvent.getParameter("selectedItem").getProperty("text"));
        },
        onPressCheckout: function (){
            var oInputFNameValue = this.getView().byId("idInptFName").getValue();
            var oInputLNameValue = this.getView().byId("idInptLName").getValue();

            // Check if first name AND last name is blank
            if (oInputFNameValue === "" && oInputLNameValue === ""){
                var oTextBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
                var sMsg = oTextBundle.getText("fieldBlankMsg");
                sap.m.MessageToast.show(sMsg); 
            }
        },

    });
});