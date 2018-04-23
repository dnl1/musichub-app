import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http'
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../providers/auth-service/auth-service';
import { EnvironmentsModule } from './enviroment-variables/environment-variables.module';
import { RegisterPageModule } from '../pages/register/register.module';
import { ApiConsume } from '../providers/api-consume/api-consume';
import { Alert } from '../providers/alert/alert';
import { MusiciansPage } from '../pages/musicians/musicians';
import { ProfilePage } from '../pages/profile/profile';
import { ProjectsPage } from '../pages/projects/projects';
import { NewProjectPage } from '../pages/new-project/new-project';
import { MediaCapture } from '@ionic-native/media-capture';
import { MyProjectsPage } from '../pages/my-projects/my-projects';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    MusiciansPage,
    ProfilePage,
    ProjectsPage,
    NewProjectPage,
    MyProjectsPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    EnvironmentsModule,
    RegisterPageModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    MusiciansPage,
    ProfilePage,
    ProjectsPage,
    NewProjectPage,
    MyProjectsPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    ApiConsume,
    Alert,
    MediaCapture
  ]
})
export class AppModule {}
