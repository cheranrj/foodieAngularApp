import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as Configurations from '../configuration.json';

@Injectable()
export class AppInitializerService {

  configuration = Configurations.configuration;
  sessionUser = null;
  constructor(
    private http: HttpClient,
  ) { }

  async preLoad() {
    // return new Promise<void>((resolve, reject) => {
    //   console.log("AppInitService.init() called");
    //   ////do your initialisation stuff here  
    //   console.log('AppInitService Finished');
    //   resolve();

    // });

    if (navigator.onLine) {
      // const config = await this.loadFile('/configuration.json');
      // this.configuration = config.configuration;
      // if (this.getCookie('token') && this.sessionUser === null) {
      await this.setSessionUser();
      // }
    }

  }

  private async loadFile(file): Promise<any> {
    return this.http.get(file).toPromise();
  }

  private async setSessionUser() {
    try {
      const apiData = {};
      const headers: any = {};
      // const response = await this.loadUser(apiData, headers);
      // this.sessionUser = response;
      this.sessionUser = {
        loginType: {
          caption: "Customer",
          key: "customer",
          value: 2
        },
        mobileNumber: null,
        password: "123456",
        userID: "admin@gmail.com"
      };
      console.log(this.sessionUser)
    } catch (error) {

    }

  }

  private loadUser(params: any = {}, headers: any = {}): Promise<any> {
    const token = this.getCookie('token');
    if (token) {
      headers.token = token;
    }
    // headers = this.JSONMerge(headers, this.headers);
    const api = this.configuration.API_URL + '' + this.configuration.API_PREFIX + `authentication/usersessiondetails`;
    const options = {
      headers: new HttpHeaders(headers),
      params
    };
    return this.http.get(api, options).toPromise();
  }

  private getCookie(name: string) {
    try {
      const ca: Array<string> = decodeURIComponent(document.cookie).split(';');
      const caLen: number = ca.length;
      const cookieName = `${name}=`;
      let c: string;
      for (let i = 0; i < caLen; i += 1) {
        c = ca[i].replace(/^\s+/g, '');
        if (c.indexOf(cookieName) === 0) {
          const returnData = c.substring(cookieName.length, c.length);
          if (returnData) {
            if (this.isJson(returnData)) {
              return JSON.parse(returnData);
            }
            return returnData;
          }
        }
      }
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  private isJson(item) {
    item = typeof item !== 'string' ? JSON.stringify(item) : item;
    try {
      item = JSON.parse(item);
    } catch (e) {
      // console.error(e);
      return false;
    }

    if (typeof item === 'object' && item !== null) {
      return true;
    }

    return false;
  }


}
