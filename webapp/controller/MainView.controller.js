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
            var oInputFName = this.getView().byId("idInptFName");
            var oInputLName = this.getView().byId("idInptLName");
            var oInputFNameValue = oInputFName.getValue();
            var oInputLNameValue = oInputLName.getValue();
            var oRouter = this.getOwnerComponent().getRouter();

            // Check if first name and last name is blank
            if (oInputFNameValue === "" || oInputLNameValue === ""){
               
            // set value state to Error
                oInputFName.setValueState("Error");
                oInputLName.setValueState("Error");
            } else {
                oInputFName.setValueState("None");
                oInputLName.setValueState("None");

                //Navigate to review page passing first
                oRouter.navTo("RouteReviewPage", {
                    firstName: oInputFNameValue
                });

            }
        },


        onAddItem: function (){
            // Comment this code for now
            // var oTextBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            // var sMsg = oTextBundle.getText("addButtonMsg");
            // this.fnDisplayMsg(sMsg);

            // Instantiate the fragment

            // create dialog lazily
            if (!this.oDialog) {
                // By using loadFragment, we are adding the fragment as a dependent to the View
                // By doing so, we can use the functions inside the view's controller
                this.oDialog = this.loadFragment({
                    name: "com.training.exer1dumandan.fragment.ProductDialog"
                });
            } 
            this.oDialog.then(function(oDialog) {
                oDialog.open();
            });
        },

        onCloseDialog: function (){
            this.getView().byId("idProductDialog").close();
        },


    });
});