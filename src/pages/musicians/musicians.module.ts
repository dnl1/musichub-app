import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MusiciansPage } from './musicians';

@NgModule({
  declarations: [
    MusiciansPage,
  ],
  imports: [
    IonicPageModule.forChild(MusiciansPage),
  ],
})
export class MusiciansPageModule {}
