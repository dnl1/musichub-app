import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { ProjectsPage } from '../projects/projects';
import { MusiciansPage } from '../musicians/musicians';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ProfilePage;
  tab3Root = ProjectsPage;
  tab4Root = MusiciansPage;
  
  /**
   * logout
   */
  public logout() {
    this.navCtrl.setRoot(LoginPage);
  }

  constructor(public navCtrl: NavController) {

  }
}
