import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

import {Page1} from '../page1/page1';


// import {PatientPage} from '../patient/patient';
// import {InsuranceInfoPage} from '../insurance-info/insurance-info';
// import {PaymentPage} from '../payment/payment';
// import {SharedAccountPage} from '../shared-account/shared-account';
// import {NotificationsPage} from '../notifications/notifications';
// import {WellnessPage} from '../wellness/wellness';
// import { InAppBrowser } from 'ionic-native';


/*
  Generated class for the MyProfile page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-faq-tiles',
  templateUrl: 'faq-tiles.html'
})

export class FaqTilesPage {

grid: Array<Array<{Key:string, Title: string, CssClass:string}>>; //array of arrays

  

  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams) {
this.grid = Array(3);

this.grid[0] = Array(2);

this.grid[0][0] = {Key: "BillsPaymentFaq",  Title: "Bills and Payments", CssClass:"square square_violet"};
this.grid[0][1] = {Key: "Insurance", Title: "Insurance", CssClass:"square square_green"};

this.grid[1] = Array(2);


this.grid[1][0] = {Key: "TestResults", Title: "Test Results", CssClass:"square square_blue"};
this.grid[1][1] = {Key: "Registration", Title: "Registration", CssClass:"square square_reddish"};

this.grid[2] = Array(2);

this.grid[2][0] = {Key: "Login",  Title: "Login", CssClass:"square square_yellowish"};
this.grid[2][1] = {Key: "GeneralQuestion", Title: "General Questions", CssClass:"square square_red"};


  }

//TODO: Need to add logic for redirection of other pages
 showPage(event, key)  
 {
switch(key) {
case "BillsPaymentFaq" : 
 this.navCtrl.push(Page1);

break;
}

 } 
  
}
