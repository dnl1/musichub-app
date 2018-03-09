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

  public get(pUrl: string, body: any, onSuccessCallback, onFailCallback, showLoading: boolean = true) {
    this.request('post', pUrl, body, onSuccessCallback, onFailCallback, showLoading);
  }

  public post(pUrl: string, body: any, onSuccessCallback, onFailCallback, showLoading: boolean = true) {
    this.request('post', pUrl, body, onSuccessCallback, onFailCallback, showLoading);
  }

  public put(pUrl: string, body: any, onSuccessCallback, onFailCallback, showLoading: boolean = true) {
    this.request('put', pUrl, body, onSuccessCallback, onFailCallback, showLoading);
  }

  private request(method: string, pUrl: string, body: any, onSuccessCallback, onFailCallback, showLoading: boolean = true) {
    let url = this.getUrl(pUrl);
    let headers = this.getHeaders();
    if (showLoading) this.alert.showLoading();
    this.http.request(method, url, {
      body: body,
      headers: headers,
      observe: 'response'
    })
      .subscribe(data => {
        this.parseHeaders(data.headers);
        if (showLoading) this.alert.hideLoading();
        if (onSuccessCallback)
          onSuccessCallback(data.body);
      }, data => {
        if (showLoading) this.alert.hideLoading();
        if (onFailCallback) onFailCallback(data);
        console.log('Request Error', data);
        if (data.error.Message) {
          this.alert.showError(data.error.Message);
        }
      });
  }

  private getUrl(url: string): string {
    return this.BASE_URL + url
  }

  private getHeaders(): HttpHeaders {
    let json = localStorage.getItem('headerAuth');

    let headerAuth: HttpHeaders = new HttpHeaders();

    try {
      let objHeader = JSON.parse(json);
      headerAuth = new HttpHeaders(objHeader);
    }
    catch (e) { }

    headerAuth.set('Content-Type', 'application/json');

    return headerAuth;
  }

  private saveHeaders(headers) {
    let json = JSON.stringify(headers);
    localStorage.setItem('headerAuth', json);
  }

  private parseHeaders(headers: HttpHeaders) {
    let headerAuth: HttpHeaders = null
    var tempHeader = {};
    if (headers != undefined) {
      tempHeader = {
        'access_token': headers.get('access_token'),
        'client': headers.get('client'),
        'uid': headers.get('uid')
      }
    }
    headerAuth = new HttpHeaders(tempHeader);
    this.saveHeaders(tempHeader);
  }

}
