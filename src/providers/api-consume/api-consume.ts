import { Inject } from '@angular/core';
import { EnvVariables } from "../../app/enviroment-variables/environment-variables.token";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Alert } from '../../providers/alert/alert'

/*
  Generated class for the ApiConsumeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
export class HeaderAuth {

  private _access_token: string;
  public get access_token(): string {
    return this._access_token;
  }
  public set access_token(access_token: string) {
    this._access_token = access_token;
  }


  private _client_id: string;
  public get client_id(): string {
    return this._client_id;
  }
  public set client_id(client_id: string) {
    this._client_id = client_id;
  }


  private _uid: string;
  public get uid(): string {
    return this._uid;
  }
  public set uid(uid: string) {
    this._uid = uid;
  }
}

export class ApiConsume {

  private BASE_URL: string
  constructor(@Inject(EnvVariables) private envVars, @Inject(HttpClient) private http: HttpClient, @Inject(Alert) private alert: Alert) {
    this.BASE_URL = envVars.apiEndpoint;
  }

  public get(pUrl: string, onSuccessCallback, onFailCallback, showLoading: boolean = true) {
    let url = this.getUrl(pUrl);
    let headers = this.getHeaders()

    if (showLoading) this.alert.showLoading();
    this.http.get(url, {
      headers: headers,
      observe: 'response'
    }).subscribe(data => { if (showLoading) this.alert.hideLoading(); if (onSuccessCallback) onSuccessCallback(data.body) }, data => { if (showLoading) this.alert.hideLoading(); if (onFailCallback) onFailCallback(data) });
  }

  public post(pUrl: string, body: any, onSuccessCallback, onFailCallback, showLoading: boolean = true) {
    let url = this.getUrl(pUrl);
    let headers = this.getHeaders();

    if (showLoading) this.alert.showLoading();
    this.http.post(url, body, {
      headers: headers,
      observe: 'response'
    })
      .subscribe(data => {
        console.log('data', data);
        console.log(data.headers.get('access_token'))
        this.parseHeaders(data.headers);
        if (showLoading) this.alert.hideLoading();
        if (onSuccessCallback)
          onSuccessCallback(data.body);
      }, data => {
        if (showLoading) this.alert.hideLoading();
        if (onFailCallback) onFailCallback(data)
      });
  }

  private getUrl(url: string): string {
    return this.BASE_URL + url
  }

  private getHeaders(): HttpHeaders {
    let json = localStorage.getItem('headerAuth');

    let headerAuth: HttpHeaders = null
    try {
      let objHeader = JSON.parse(json);
      headerAuth = new HttpHeaders(objHeader);
    }
    catch (e) { }

    return headerAuth;
  }

  private saveHeaders(headers) {
    let json = JSON.stringify(headers);
    localStorage.setItem('headerAuth', json);
  }

  private parseHeaders(headers: HttpHeaders) {
    let headerAuth: HttpHeaders = null
    var tempHeader = {};
    console.log('keys', headers.keys());
    if (headers != undefined) {
      tempHeader = {
        'access_token': headers.get('access_token'),
        'client_id': headers.get('client_id'),
        'uid': headers.get('uid')
      }
    }
    headerAuth = new HttpHeaders(tempHeader);
    this.saveHeaders(tempHeader);
  }

}
