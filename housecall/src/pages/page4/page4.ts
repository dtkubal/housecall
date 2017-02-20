import { Component } from '@angular/core';

import {  NavParams,ViewController } from 'ionic-angular';

import {Storage}from '@ionic/storage';

@Component({
  selector: 'page-page4',
  templateUrl: 'page4.html',
  providers : [Storage]
})


export class Page4 {

  test = {};
  
  isDisabled : boolean = true;

  storage: Storage;

  constructor( storage: Storage, public params: NavParams,public viewCtrl: ViewController) {
    this.storage = storage;
     this.test = JSON.parse(this.params.get('itemstring'));

  }

    
  dismiss() {
    this.viewCtrl.dismiss();
}


}




  

  
  

