import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiConsume } from '../../providers/api-consume/api-consume';
import { MusicalGenre } from '../../app/models/musical-genre';
import { MusicianDetailsPage } from '../musician-details/musician-details';
import { ProjectDetailPage } from '../project-detail/project-detail';

/**
 * Generated class for the SearchProjectsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-search-projects',
  templateUrl: 'search-projects.html',
})
export class SearchProjectsPage {

  items: any = [];
  showMessageNotFound: boolean = false;
  musical_genres: Array<MusicalGenre> = new Array<MusicalGenre>();

  constructor(public navCtrl: NavController, public navParams: NavParams, private apiConsume: ApiConsume) {
    this.getMusicalGenres();
  }

  onItemClick(item: any) {
    this.navCtrl.push(ProjectDetailPage, { musical_project_id: item })
  }

  search(val: any) {
    this.apiConsume.post('musicalproject/search-by-musical-genre', { musical_genre_id: val }, (data) => {
      this.items = [];
      data.forEach(element => {
        this.items.push(element);
      });
      console.log('this.items.length', this.items.length);
      if (this.items.length == 0) {
        this.showMessageNotFound = true;
      } else {
        this.showMessageNotFound = false;
      }
    }, null, false);
  }

  getMusicalGenres() {
    this.apiConsume.get('/musicalgenre', undefined, (data: any): void => {
      data.forEach(element => {
        let genre = new MusicalGenre();

        genre.id = element.id;
        genre.name = element.name;

        this.musical_genres.push(genre);

      });
    }, (error: any): void => {

    }, false);
  }

}
