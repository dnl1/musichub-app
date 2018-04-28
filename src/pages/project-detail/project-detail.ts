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
import { DownloadAndPlayProvider } from '../../providers/download-and-play/download-and-play';
import { EnvVariables } from '../../app/enviroment-variables/environment-variables.token';

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
  instruments: any[] = [];
  baseInstrument: Instrument = new Instrument();
  ownProject: boolean = true;
  showContributions: boolean = false;
  contributions: any;
  hideFinishButton: boolean = true;
  hidePlayAudio: boolean = true;

  private musical_project_id

  constructor(public navCtrl: NavController, public navParams: NavParams, private apiConsume: ApiConsume,
    private actionSheetCtrl: ActionSheetController, @Inject(Alert) private alert: Alert,
    @Inject(DownloadAndPlayProvider) private downloadAndPlay: DownloadAndPlayProvider,
    @Inject(EnvVariables) private envVars) {
    this.musical_project_id = navParams.get('musical_project_id');

    this.apiConsume.get(`musicalproject/${this.musical_project_id}`, {}, (data: MusicalProject) => {
      this.project = data;

      this.hidePlayAudio = !(this.project.finish == 1);

      this.getOwner(data.owner_id);
      this.getMusicalGenre(data.musical_genre_id);
    }, null, false);
  }

  getOwner(owner_id: any): any {
    this.apiConsume.get(`musician/${owner_id}`, {}, (data: User) => {
      this.owner = data;
      if (this.owner.id != new User().id) {
        this.ownProject = false;
        this.getProjectInstruments();

      }
      else {
        this.apiConsume.get(`musicalproject/${this.project.id}/contributions`, {}, (data) => {
          this.showContributions = data && data.length > 0;
          this.contributions = data;

          this.getProjectInstruments();
        }, null, false);
      }

    }, null, false);
  }

  getMusicalGenre(musical_genre_id: any): any {
    this.apiConsume.get(`musicalgenre/${musical_genre_id}`, {}, (data: MusicalGenre) => {
      this.genre = data;
    }, null, false);
  }

  getProjectInstruments(): any {
    this.apiConsume.get(`musicalproject/${this.project.id}/instruments`, {}, (data: any) => {
      this.getInstruments(data);
    }, null, false);
  }

  getInstruments(musicalProjectInstruments) {
    this.apiConsume.get('instrument', undefined, (data: any): void => {

      // PEGA A CORRELACAO DO INSTRUMENTO BASE
      var base_instrument = musicalProjectInstruments.filter((item) => {
        return item.is_base_instrument;
      })[0];

      //MONTA OBJETO QUE MOSTRARA NA TELA
      data.filter((item) => {
        let retorno: boolean = false;

        musicalProjectInstruments.forEach(element => {
          if (element.instrument_id == item.id && !element.is_base_instrument)
            retorno = true;
        });
        return retorno;
      }).
        forEach(element => {
          var instrument = {
            id: element.id,
            name: element.name,
            color: 'default'
          };

          this.instruments.push(instrument);
        });

      //SETA O INSTRUMENTO BASE
      data.forEach((item) => {
        if (item.id == base_instrument.instrument_id) {
          this.baseInstrument = item;
        }
      });

      //CONFIG HIGHLIGHT
      if (this.showContributions) {
        var qtInstruments = musicalProjectInstruments.length
        var qtContributionsOK = 0;

        this.contributions.forEach((item) => {
          if (item.status_id == 2) {

            let mpi = musicalProjectInstruments.filter((item1) => {
              return item1.id == item.musical_project_instrument_id;
            })[0];

            var filteredInstruments = this.instruments.filter((item1) => {
              return item1.id == mpi.instrument_id;
            });

            filteredInstruments.forEach((listItem) => {
              listItem.color = 'secondary'
            })


            qtContributionsOK++;
          }
        });

        //SO APRESENTA O BOTAO DE FINALIZAR SE A QTD DE CONTRIBUIÇOES APROVADAS FOR A MESMA DE INSTRUMENTOS 
        if (qtInstruments == qtContributionsOK && this.project.finish != 1) {
          this.hideFinishButton = false;
        }
      }

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

    if(this.project.finish != 1)
      actionSheet.present();
  }

  onFinishProjectClick() {
    this.apiConsume.post(`musicalproject/${this.project.id}/finish`, {}, (data) => {
      this.alert.showSuccess('Your project has finished with success!');
    }, null, false);
  }

  onPlayAudioClick() {
    var url = `${this.envVars.apiEndpoint}musicalproject/${this.project.id}/download`;
    this.downloadAndPlay.download(url, this.project.id);
  }

}
