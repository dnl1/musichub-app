import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MyProjectsPage } from '../my-projects/my-projects';
import { SearchProjectsPage } from '../search-projects/search-projects';

/**
 * Generated class for the ProjectsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-projects',
  templateUrl: 'projects.html',
})
export class ProjectsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  public myProjectsClick(){
    this.navCtrl.push(MyProjectsPage);
  }

  public searchProjectsClick(){
    this.navCtrl.push(SearchProjectsPage);
  }
}
