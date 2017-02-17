import { Component } from '@angular/core';

import { NavController, NavParams,ToastController } from 'ionic-angular';

import {Storage}from '@ionic/storage';

import {Page1} from '../page1/page1';

import { Geolocation } from 'ionic-native';

import {Http} from '@angular/http';

@Component({
  selector: 'page-page3',
  templateUrl: 'page3.html',
    providers : [Storage]

})




export class Page3 {
  
    housecallappointment;
    storage: Storage;
    selectedtest: Array<{title: string, selected: Boolean, id: Number}> = [];
    
  constructor(public navCtrl: NavController, public navParams: NavParams, storage: Storage,public toastCtrl:ToastController, public http: Http) {
  
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
this.presentToast("Done");
    this.navCtrl.setRoot(Page1);

  });  
}

cancel(event) {
this.navCtrl.setRoot(Page1);


}
  
  getaddressbygeolocation() {
  
  Geolocation.getCurrentPosition().then((resp) => {
 console.log(resp.coords.latitude);
 console.log(resp.coords.longitude);
 let url = "http://maps.googleapis.com/maps/api/geocode/json?latlng="+resp.coords.latitude + "," + resp.coords.longitude + "&sensor=true";
  this.http.get(url).subscribe((respadd)=>{
  let jobj = JSON.parse(respadd["_body"]);
//city
this.housecallappointment.city = jobj.results[0].address_components[jobj.results[0].address_components.length-4].short_name;   
for(let comp of jobj.results[0].address_components)
{
 
console.log(comp);
switch(comp.types[0])
{
    case "route" :
          this.housecallappointment.line1 = comp.short_name;
          break;
    case "political" :
          this.housecallappointment.line2 += " " + comp.short_name;
          break;
    case "locality" :
         this.housecallappointment.city = comp.short_name;
         break;
    case "postal_code" :
          this.housecallappointment.zip = comp.short_name;
          break;
    case "administrative_area_level_1" :
          this.housecallappointment.state = comp.short_name;
          break;
   default: 
          break;
}

//   if(comp.types[0] == "route")
// {
//   this.housecallappointment.line1 = comp.short_name;
// }

//   if(comp.types[0] == "political")
// {
//   this.housecallappointment.line2 += " " + comp.short_name;
// }
//   if(comp.types[0] == "locality")
// {
//   this.housecallappointment.city = comp.short_name;
// }
//   if(comp.types[0] == "postal_code")
// {
//   this.housecallappointment.zip = comp.short_name;
// }
//   if(comp.types[0] == "administrative_area_level_1")
// {
//   this.housecallappointment.state = comp.short_name;
// }



}

//console.log(jobj.results[0].formatted_address);
  });
 // resp.coords.latitude
 // resp.coords.longitude
}).catch((error) => {
  console.log('Error getting location', error.toString());
});
  
  }
  
  
  
presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
  
}
