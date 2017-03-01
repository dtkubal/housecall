import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import {Page2} from '../page2/page2';

import {Storage}from '@ionic/storage';

import { SocialSharing } from 'ionic-native';

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

shareonemail (event) {
SocialSharing.canShareViaEmail().then(() => {
  // Sharing via email is possible
  let emails = ['recipient@example.org'] 
  SocialSharing.shareViaEmail('Body', 'Subject',emails) .then(() => {
  // Success!
  console.log("Email Success");
}).catch(() => {
  console.log("Email Share is not working");
});
}).catch(() => {
  console.log("Email Share is disable");

});

}

// /////////////
//   public lineChartData:Array<any> = [
//     [65, 59, 80, 81, 56, 55, 40],[28, 48, 40, 19, 86, 27, 90],[18, 48, 77, 9, 100, 27, 40]
//   ];
  
public lineChartData: any[] = [
    { data: [130, 0, 0, 0, 0, 203, 0], label: 'Glucose' },
    { data: [120, 0, 0, 0, 0, 125, 0], label: 'Calcium' },
        { data: [130, 0, 0, 0, 0, 120, 0], label: 'Albumin' }

  ];

  public lineChartLabels:Array<any> = ['Mon', 'Tue','Wed', 'Thu','Fri', 'Sat','Sun'];


  public lineChartType:string = 'bar';
  public series: Array<any> = ['Se1','Se2','Se3'];
  public graphtype : string = 'Weekly';

  private lineChartOptions = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
responsive: true
  };

 public MonthlyChartData:Array<any> = [
 { data: [130, 0, 100, 0], label: 'Glucose' },
    { data: [120, 0, 120, 0], label: 'Calcium' },
        { data: [100, 0, 103, 0], label: 'Albumin' }    
  ];
  public MonthlyLabels:Array<any> = ['Week1', 'Week2', 'Week3', 'Week4'];
  public MonthlyChartType:string = 'line';

 public AllChartData:Array<any> = [
    { data: [100, 200, 230, 250], label: 'Glucose' },
    { data: [120, 120, 120, 100], label: 'Calcium' },
        { data: [100, 100, 130, 100], label: 'Albumin' }  
    
  ];
  public AllLabels:Array<any> = ['Nov', 'Dec', 'Jan', 'Feb'];
  public AlllChartType:string = 'line';
 
setgraph (grapselcted) {
  console.log(this.graphtype);

switch(grapselcted) 
{
case "line" : 
        if(this.graphtype == "Weekly" ) 
        {
          this.lineChartType = "line";
        }
          if(this.graphtype == "Monthly" ) 
        {
          this.MonthlyChartType = "line";
        }
          if(this.graphtype == "All" ) 
        {
          this.AlllChartType = "line";
        }
break;

case "bar" : 
   if(this.graphtype == "Weekly" ) 
           {
          this.lineChartType = "bar";
        }
          if(this.graphtype == "Monthly" ) 
        {
          this.MonthlyChartType = "bar";
        }
          if(this.graphtype == "All" ) 
        {
          this.AlllChartType = "bar";
        }
        
break;

case "doughnut" :
if(this.graphtype == "Weekly" ) 
           {
          this.lineChartType = "doughnut";
        }
          if(this.graphtype == "Monthly" ) 
        {
          this.MonthlyChartType = "doughnut";
        }
          if(this.graphtype == "All" ) 
        {
          this.AlllChartType = "doughnut";
        }
break;
}

}


}
