import { Injectable, Inject } from '@angular/core';
import { File, FileEntry } from '@ionic-native/file';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { Media, MediaObject } from '@ionic-native/media';
import { EnvVariables } from '../../app/enviroment-variables/environment-variables.token';

/*
  Generated class for the DownloadAndPlayProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DownloadAndPlayProvider {

  constructor(public file: File, public txfr: FileTransfer, public audio: Media, @Inject(EnvVariables) private envVars) { }

  public download(url: string, id: number) {
    url = this.envVars.apiEndpoint + url;
    
    let ft: FileTransferObject = this.txfr.create();
    let fn = this.file.dataDirectory + id.toString() + '.mp3';

    let options = {
      headers: this.getHeaders()
    };

    console.log('start download');
    ft.download(url, fn, true, options).then(
      (fe: FileEntry) => {
        let song: MediaObject = this.audio.create(fe.nativeURL);
        song.play();
      },
      err => {
        console.log(err);
      }
    );
  }

  private getHeaders(): any {
    let json = localStorage.getItem('headerAuth');

    try {
      let objHeader = JSON.parse(json);
      return objHeader;
    }
    catch (e) { }

  }

}
