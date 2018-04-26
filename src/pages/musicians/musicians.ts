import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiConsume } from '../../providers/api-consume/api-consume';
import { User } from '../../app/models/user';
import { ActionSheetController } from 'ionic-angular';
import { MusicianDetailsPage } from '../musician-details/musician-details';

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
  fullItems : any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private apiConsume: ApiConsume, public actionSheetCtrl: ActionSheetController) {
    this.apiConsume.get("/musician", {}, (data) =>{
      let user : User = new User();
      user.pop();

      data.forEach(element => {
        if(user.id != element.id)
          this.items.push(element);
      });
      this.fullItems = this.items;      
    }, (err) => {
      console.log('err',err);
    }, false)
  }

  onItemClick(item : any) {
    this.navCtrl.push(MusicianDetailsPage, {
      musicianId: item
    });
  }

  presentActionSheet(id : number) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Ações',
      buttons: [
        {
          text: 'Rate musician',
          role: 'rate',
          handler: () => {
            this.navCtrl.push(MusicianDetailsPage, {
              musicianId: id
            })
          }
        }
      ]
    });
    actionSheet.present();
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.fullItems.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
    }else{
      this.items = this.fullItems;
    }
  }

}
