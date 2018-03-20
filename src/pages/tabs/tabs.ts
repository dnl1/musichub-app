import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { NavController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { ProjectsPage } from '../projects/projects';
import { MusiciansPage } from '../musicians/musicians';
import { NewProjectPage } from '../new-project/new-project';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ProjectsPage;
  tab3Root = NewProjectPage;
  tab4Root = MusiciansPage;
  tab5Root = ProfilePage;
  
  /**
   * logout
   */

  constructor(public navCtrl: NavController) {

  }
}
