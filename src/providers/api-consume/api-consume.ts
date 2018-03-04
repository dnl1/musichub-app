import { Inject } from '@angular/core';
import { EnvVariables } from "../../app/enviroment-variables/environment-variables.token";
import { HttpClient } from '@angular/common/http';
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
  constructor(@Inject(EnvVariables) private envVars, @Inject(HttpClient) private http : HttpClient, @Inject(Alert) private alert : Alert) {
    this.BASE_URL = envVars.apiEndpoint;
  }

  public get(pUrl: string, onSuccessCallback, onFailCallback, showLoading: boolean = true) {
    let url = this.getUrl(pUrl);
    let headers = this.getHeaders()

    if(showLoading) this.alert.showLoading();
    this.http.get(url, {
      headers: headers as any,
    }).subscribe(data => { if(showLoading)this.alert.hideLoading(); if(onSuccessCallback) onSuccessCallback(data) }, data => { if(showLoading)this.alert.hideLoading(); if(onFailCallback)onFailCallback(data) });
  }

  public post(pUrl: string, body: any, onSuccessCallback, onFailCallback, showLoading: boolean = true) {
    let url = this.getUrl(pUrl);
    let headers = this.getHeaders()

    if(showLoading) this.alert.showLoading();
    this.http.post(url, body, {
      headers: headers as any
    }).subscribe(data => { this.parseHeaders(data); if(showLoading)this.alert.hideLoading(); if(onSuccessCallback) onSuccessCallback(data) }, data => { if(showLoading)this.alert.hideLoading(); if(onFailCallback)onFailCallback(data) });
  }

  private getUrl(url: string): string {
    return this.BASE_URL + url
  }

  private getHeaders(): HeaderAuth {
    let json = localStorage.getItem('headerAuth');
    let headerAuth: HeaderAuth = JSON.parse(json);

    return headerAuth;
  }

  private saveHeaders(headers: HeaderAuth) {
    let json = JSON.stringify(headers);
    localStorage.setItem('headerAuth', json);
  }

  private parseHeaders(obj) {
    let headers = obj.headers;
    let headerAuth: HeaderAuth;

    headerAuth.access_token = headers['access_token'];
    headerAuth.client_id = headers['client_id'];
    headerAuth.uid = headers['uid'];

    this.saveHeaders(headerAuth);
  }

}
