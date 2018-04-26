import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiConsume } from '../../providers/api-consume/api-consume';
import { ProjectDetailPage } from '../project-detail/project-detail';

/**
 * Generated class for the MyProjectsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-my-projects',
  templateUrl: 'my-projects.html',
})
export class MyProjectsPage {
  items : any = [];
  fullItems : any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private apiConsume : ApiConsume) {
    this.apiConsume.get('musicalproject/my-projects', {}, (data) => {
      data.forEach(element => {
        this.items.push(element);
      });

      this.fullItems = this.items;
      console.log(this.items);
    }, null, false);
  }

  onItemClick(item : any) {
    this.navCtrl.push(ProjectDetailPage, { musical_project_id: item });
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
