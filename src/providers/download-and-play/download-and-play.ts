import { Injectable } from '@angular/core';
import { File, FileEntry } from '@ionic-native/file';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { Media, MediaObject } from '@ionic-native/media';

/*
  Generated class for the DownloadAndPlayProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DownloadAndPlayProvider {

  constructor(public file: File, public txfr: FileTransfer, public audio: Media) { }

  public download(url: string) {
    let ft: FileTransferObject = this.txfr.create();
    let fn = this.file.dataDirectory + url.substring(url.lastIndexOf('/') + 1);

    let options = {
      headers: this.getHeaders()
    };

    ft.download(url, fn, true, options).then(
      (fe: FileEntry) => {
        console.log('fe', fe);
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
