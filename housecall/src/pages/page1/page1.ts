import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import {Page2} from '../page2/page2';

import {Storage}from '@ionic/storage';



@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html',
  providers: [Storage]
})

export class Page1 {

storage: Storage;

myhousecalls = [];

  constructor(public navCtrl: NavController, storage: Storage) {
  
this.storage = storage;
this.storage.get("user-appointments").then((val) => {
    if(val != null) {
        this.myhousecalls = JSON.parse(val);  
        }
    });
}
  
placehousecall(event) {
console.log('Called');
this.navCtrl.push(Page2);
}

deletehousecall(event, item) {


}


}
