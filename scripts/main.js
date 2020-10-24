var firebaseConfig = {
    apiKey: "AIzaSyDQoIl-BiLfnW0fPxMP-qt7zGCm74muYUA",
    authDomain: "coffeerun-b7f85.firebaseapp.com",
    databaseURL: "https://coffeerun-b7f85.firebaseio.com",
    projectId: "coffeerun-b7f85",
    storageBucket: "coffeerun-b7f85.appspot.com",
    messagingSenderId: "244125049063",
    appId: "1:244125049063:web:85d73b7da8b8ec60c30242"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var databaseReference = firebase.database();

(function (window) {
    'use strict';
    var FORM_SELECTOR = '[data-coffee-order="form"]';
    var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';     // CHOOSE ONLY ONE...
//     var SERVER_URL = 'https://co.audstanley.com/coffeeorders';    // if running on the shared server
//     // var SERVER_URL = 'http://localhost:3000/coffeeorders';          // if running locally

    var App = window.App;
    var Truck = App.Truck;
    var DataStore = App.DataStore;
    var RemoteDataStore = App.RemoteDataStore;
    var FormHandler = App.FormHandler;
    var Validation = App.Validation;
    var CheckList = App.CheckList;

    var truck = new Truck('ncc-1701', new DataStore());
    //  var truck = new Truck('ncc-1701', new RemoteDataStore(SERVER_URL));

    window.truck = truck;
    var checkList = new CheckList(CHECKLIST_SELECTOR);
    checkList.addClickHandler(truck.deliverOrder.bind(truck));

    var formHandler = new FormHandler(FORM_SELECTOR);

    formHandler.addSubmitHandler(function(data){
        return databaseReference.ref('coffeeorders/').push(data).catch(function(error){
        }).then(function(){
            // this function gets executed when server call is finish i think not sure yet
            console.log("Successfully submitted data.");
            checkList.addRow.call(checkList, data);
        });
    });
    console.log(formHandler);

    formHandler.addInputHandler(Validation.isCompanyEmail);
    truck.printOrders(checkList.addRow.bind(checkList));

})(window);




