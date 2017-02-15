import { Component } from '@angular/core';

import { NavController, NavParams,ToastController } from 'ionic-angular';

import {Storage}from '@ionic/storage';


@Component({
  selector: 'page-page3',
  templateUrl: 'page3.html',
    providers : [Storage]

})




export class Page3 {
  
    housecallappointment;
    storage: Storage;
    selectedtest: Array<{title: string, selected: Boolean, id: Number}> = [];
    
  constructor(public navCtrl: NavController, public navParams: NavParams, storage: Storage) {
  
  this.housecallappointment = { line1: '', line2:'', city:'', state:'', zip:''};
  this.storage = storage;
  this.storage.get("user-selectedtest").then((val)=> {
   this.selectedtest = JSON.parse(val);
  });
  
  }
  
  sethomeaddress(event) {
  let defaultaddress = this.gethomeaddress();
 this.housecallappointment.line1 = defaultaddress.line1;
  this.housecallappointment.line2 = defaultaddress.line2;
  this.housecallappointment.city = defaultaddress.city;  
this.housecallappointment.state = defaultaddress.state;
  this.housecallappointment.zip = defaultaddress.zip;
  
  }
  
  
  gethomeaddress () 
  {
  //TODO: This will be replaced by actual defualt home address set up in profile.
  return {line1: "536 Hamilton St", line2:"",  city:"Allentown", state: "PA", zip : "18101"};
  
  }
  
  save() {
  let housecall = {Id: new Date().valueOf(), Address: {line1: this.housecallappointment.line1, line2:this.housecallappointment.line2, city:this.housecallappointment.city, state: this.housecallappointment.state, zip: this.housecallappointment.zip}, AppointmentDate: this.housecallappointment.Date, Time: this.housecallappointment.Time, Test : this.selectedtest};
  
  this.storage.get("user-appointments").then((val)=> {
  let savedapptment = [];
  if(val != null) {
    savedapptment = JSON.parse(val);   
  }
savedapptment.push(housecall);
let strval = JSON.stringify(savedapptment);
this.storage.set("user-appointments",strval );
  });  
  }  
  
}
