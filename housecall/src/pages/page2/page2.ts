import { Component } from '@angular/core';

import { NavController,ToastController , NavParams } from 'ionic-angular';

import {Page3} from '../page3/page3';

import {Storage}from '@ionic/storage';

@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html',
  providers : [Storage]
})


export class Page2 {

  avilabletest: Array<{title: string, selected: Boolean, id: Number}>;

  housecallappointment = {};
  
  isDisabled : boolean = true;

  storage: Storage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl:ToastController, storage: Storage) {
    this.storage = storage;
this.getavilabletests();
  }

itemSelected(event,item) {
item.selected = !item.selected;
this.checktestselected();
this.presentToast(item.title,item.selected);
}

movenext(event) {
  let selectedtest: Array<{title: string, selected: Boolean, id: Number}> = [];
for(let entry of this.avilabletest) {
if(entry.selected){

selectedtest.push(entry);
}
let val = JSON.stringify(selectedtest);
     this.storage.set("user-selectedtest", val);


}
this.navCtrl.push(Page3);
}

checktestselected() {
this.isDisabled = true;
for(let entry of this.avilabletest) {
if(entry.selected)
    {
    
    this.isDisabled = false;
    }
} 
}

presentToast(name, isaddedd) {
    let toast = this.toastCtrl.create({
      message: name + (isaddedd ? " added" : " removed"),
      duration: 2000
    });
    toast.present();
  }
  
  getavilabletests() {
  //TODO: This will be from store / API
  this.avilabletest = [];
    this.avilabletest.push({title: "Blood Typing Profile", selected: false, id: 1});
     this.avilabletest.push({title: "Complete Blood Count", selected: false, id: 2});
      this.avilabletest.push({title: "Diabetes Profile", selected: false, id: 3});
       this.avilabletest.push({title: "Hepatitis B Profile", selected: false, id: 4});
       this.avilabletest.push({title: "Hepatitis C Profile", selected: false, id: 5});
       this.avilabletest.push({title: "Hemoglobin Test", selected: false, id: 6});
       this.avilabletest.push({title: "Lipid Profile", selected: false, id: 7});
              this.avilabletest.push({title: "Specimen Collection", selected: false, id: 8});
              this.avilabletest.push({title: "Other", selected: false, id: 9});
  }
  
  
}
