import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { ApiConsume } from '../../providers/api-consume/api-consume';
import { User } from '../../app/models/user';
import { MusicalGenre } from '../../app/models/musical-genre';
import { MusicalProject } from '../../app/models/musical-project';
import { Instrument } from '../../app/models/instrument';
import { Alert } from '../../providers/alert/alert';
import { SearchProjectsPage } from '../search-projects/search-projects';
import { ContributionsPage } from '../contributions/contributions';

/**
 * Generated class for the ProjectDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-project-detail',
  templateUrl: 'project-detail.html',
})
export class ProjectDetailPage {
  owner: User = new User(false);
  genre: MusicalGenre = new MusicalGenre();
  project: MusicalProject = new MusicalProject();
  instruments: Instrument[] = new Array<Instrument>();
  baseInstrument: Instrument = new Instrument();
  ownProject: boolean = true;
  showContributions: boolean = false;
  contributions: any;

  private musical_project_id

  constructor(public navCtrl: NavController, public navParams: NavParams, private apiConsume: ApiConsume, private actionSheetCtrl: ActionSheetController, @Inject(Alert) private alert: Alert) {
    this.musical_project_id = navParams.get('musical_project_id');

    this.apiConsume.get(`musicalproject/${this.musical_project_id}`, {}, (data: MusicalProject) => {
      this.project = data;

      this.getOwner(data.owner_id);
    }, null, false);
  }

  getOwner(owner_id: any): any {
    this.apiConsume.get(`musician/${owner_id}`, {}, (data: User) => {
      this.owner = data;
      if (this.owner.id != new User().id) {
        this.ownProject = false;
      }
      else {
        this.apiConsume.get(`musicalproject/${this.project.id}/contributions`, {}, (data) => {
          this.showContributions = data && data.length > 0;
          this.contributions = data;

          console.log('showContributions', this.showContributions);
        }, null, false);
      }

      this.getMusicalGenre(this.project.musical_genre_id);
    }, null, false);
  }

  getMusicalGenre(musical_genre_id: any): any {
    this.apiConsume.get(`musicalgenre/${musical_genre_id}`, {}, (data: MusicalGenre) => {
      this.genre = data;
      this.getProjectInstruments();
    }, null, false);
  }

  getProjectInstruments(): any {
    this.apiConsume.get(`musicalproject/${this.project.id}/instruments`, {}, (data: any) => {
      this.getInstruments(data);
    }, null, false);
  }

  getInstruments(instruments) {
    this.apiConsume.get('instrument', undefined, (data: any): void => {
      var filteredData = data.filter((item) => {
        let retorno: boolean = false;

        instruments.forEach(element => {
          if (element.instrument_id == item.id && !element.is_base_instrument)
            retorno = true;
        });
        return retorno;
      });

      var base_instrument = instruments.filter((item) => {
        return item.is_base_instrument;
      })[0];

      filteredData.forEach(element => {
        let instrument = new Instrument();

        instrument.id = element.id;
        instrument.name = element.name;

        this.instruments.push(instrument);
      });

      data.forEach((item) => {
        if (item.id == base_instrument.instrument_id) {
          this.baseInstrument = item;
        }
      });

    }, (error: any): void => {

    }, false);
  }

  onComposableInstrumentClick(item) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose an action',
      buttons: [
        {
          text: 'Add contribution',
          handler: () => {
            this.apiConsume.post('contribution', { musical_project_id: this.project.id, base_instrument: false, instrument_id: item.id }, (data) => {
              this.alert.showSuccess('Added contribution with success!');
              this.navCtrl.push(SearchProjectsPage);
            }, null, false);
          }
        }
      ]
    });
    actionSheet.present();
  }

  onContributeInstrumentClick(item) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose an action',
      buttons: [
        {
          text: 'Contributions',
          handler: () => {
            this.navCtrl.push(ContributionsPage, { musical_project_id: this.musical_project_id, instrument_id: item.id, instrument_name: item.name });
          }
        }
      ]
    });
    actionSheet.present();
  }

}
