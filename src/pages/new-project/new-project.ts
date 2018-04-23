import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ApiConsume } from '../../providers/api-consume/api-consume';
import { User } from '../../app/models/user';
import { MusicalProject } from '../../app/models/musical-project';
import { MusicalGenre } from '../../app/models/musical-genre';
import { Instrument } from '../../app/models/instrument';
import { Alert } from "../../providers/alert/alert";
import { Inject } from '@angular/core';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';

/**
 * Generated class for the NewProjectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-new-project',
  templateUrl: 'new-project.html',
})
export class NewProjectPage {
  user: User = new User();
  project: MusicalProject = new MusicalProject();
  musical_genres: Array<MusicalGenre> = new Array<MusicalGenre>();
  instruments: Instrument[] = new Array<Instrument>();
  selectedInstruments: Instrument[] = new Array<Instrument>();
  apiConsume: ApiConsume
  base_instrument_id: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, apiConsume: ApiConsume, @Inject(Alert) private alert : Alert, private mediaCapture: MediaCapture) {
    this.user.pop();
    this.apiConsume = apiConsume;

    this.getMusicalGenres();
  }

  post(){
    var model : any = this.project;

    model.instruments = this.instruments.map((instrument) => {
      return instrument.id;
    });
    model.base_instrument_id = this.base_instrument_id;

    this.apiConsume.post('/musicalproject/create', model, (data) => {

    }, null)
  }

  getMusicalGenres() {
    this.apiConsume.get('/musicalgenre', undefined, (data: any): void => {
      data.forEach(element => {
        let genre = new MusicalGenre();

        genre.id = element.id;
        genre.name = element.name;

        this.musical_genres.push(genre);
        
      });

      this.getInstruments();

    }, (error: any): void => {

    }, false);
  }

  getInstruments() {
    this.apiConsume.get('/instrument', undefined, (data: any): void => {
      data.forEach(element => {
        let instrument = new Instrument();

        instrument.id = element.id;
        instrument.name = element.name;

        this.instruments.push(instrument);
      });
    }, (error: any): void => {

    }, false);
  }
}
