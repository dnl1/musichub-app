import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http'
import { MyApp } from './app.component';

// Import ionic2-rating module
import { Ionic2RatingModule } from 'ionic2-rating';

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
import { SearchProjectsPage } from '../pages/search-projects/search-projects';
import { MusicianDetailsPage } from '../pages/musician-details/musician-details';
import { ProjectDetailPage } from '../pages/project-detail/project-detail';
import { ContributionsPage } from '../pages/contributions/contributions';
import { DownloadAndPlayProvider } from '../providers/download-and-play/download-and-play';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Media } from '@ionic-native/media';

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
    MusicianDetailsPage,
    SearchProjectsPage,    
    ProjectDetailPage,
    ContributionsPage,    
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    EnvironmentsModule,
    RegisterPageModule,
    HttpClientModule,
    Ionic2RatingModule
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
    MusicianDetailsPage,
    SearchProjectsPage,
    ProjectDetailPage,
    ContributionsPage,    
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    ApiConsume,
    Alert,
    MediaCapture,
    FileTransfer,
    File,
    Media,
    DownloadAndPlayProvider
  ]
})
export class AppModule {}
