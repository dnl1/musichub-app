import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiConsume } from '../../providers/api-consume/api-consume';

/**
 * Generated class for the MusiciansPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-musicians',
  templateUrl: 'musicians.html',
})
export class MusiciansPage {
  items : Array<string> = new Array<string>();

  constructor(public navCtrl: NavController, public navParams: NavParams, private apiConsume: ApiConsume) {
    this.apiConsume.get("/musician", {}, (data) =>{
      data.forEach(element => {
        this.items.push(element.name);
      });
    }, (err) => {
      console.log('err',err);
    })
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}
