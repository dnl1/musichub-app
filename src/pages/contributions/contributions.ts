import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { MusicalProject } from '../../app/models/musical-project';
import { ApiConsume } from '../../providers/api-consume/api-consume';
import { Alert } from '../../providers/alert/alert';

/**
 * Generated class for the ContributionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-contributions',
  templateUrl: 'contributions.html',
})
export class ContributionsPage {
  project: MusicalProject = new MusicalProject();
  contributions: any;
  dataTable : any[] = [];

  private musical_project_id;
  private instrument_id;
  private instrument_name;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private apiConsume : ApiConsume, private actionSheetCtrl: ActionSheetController,  @Inject(Alert) private alert: Alert) {
    this.musical_project_id = navParams.get('musical_project_id');
    this.instrument_id = navParams.get('instrument_id');
    this.instrument_name = navParams.get('instrument_name');

    this.apiConsume.get(`musicalproject/${this.musical_project_id}`, {}, (data: MusicalProject) => {
      this.project = data;
    }, null, false);

    this.apiConsume.get(`musicalproject/${this.musical_project_id}/contributions/${this.instrument_id}`, {}, (data) => {
      this.contributions = data;

      data.forEach(element => {
        this.apiConsume.get(`musician/${element.musician_id}`, {}, (data1) => {
          this.dataTable.push({contribution_id: element.id, musician_name: data1.name});
        }, undefined, false)

        console.log('this.dataTable', this.dataTable);
      });
    }, null, false);
  }

  onItemClick(item){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose an action',
      buttons: [
        {
          text: 'Approve',
          handler: () => {
            this.apiConsume.post(`contribution/${item.contribution_id}/approve`, {}, (data) => {
              this.alert.showSuccess('This contribution is now approved on your project.');
              this.navCtrl.pop();
            }, undefined, false);
          }
        }
      ]
    });
    actionSheet.present();
  }
}
