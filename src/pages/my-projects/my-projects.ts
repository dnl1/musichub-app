import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiConsume } from '../../providers/api-consume/api-consume';
import { MusicalProject } from '../../app/models/musical-project';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private apiConsume : ApiConsume) {
    this.apiConsume.get('musicalproject/my-projects', {}, (data) => {
      data.forEach(element => {
        this.items.push(element);
      });

      console.log(this.items);
    }, null);
  }

  onItemClick(item : any) {
    console.log(item);
  }

}
