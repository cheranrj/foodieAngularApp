import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppInitializerService } from 'src/app/app-initializer.service';
import { GlobalFunctionService } from 'src/app/system/services/global-function.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  headers: any = {
    'Content-Type': 'application/json'
  };

  constructor(
    private http: HttpClient,
    private gfService: GlobalFunctionService,
    private appInit: AppInitializerService
  ) { }

  saveUser(params: any, headers: any = {}): Observable<any> {
    // const token = this.gfService.getCookie('token');
    // if (token) {
    //   headers.token = token;
    // }
    headers = this.gfService.JSONMerge(headers, this.headers);
    delete headers['Content-Type'];
    const api = this.appInit.configuration.API_URL + '' + this.appInit.configuration.API_PREFIX + `save_user`;
    const options = {
      headers: new HttpHeaders(headers)
    };
    return this.http.post(api, params, options);
  }

  login(params: any, headers: any = {}): Observable<any> {
    // const token = this.gfService.getCookie('token');
    // if (token) {
    //   headers.token = token;
    // }
    headers = this.gfService.JSONMerge(headers, this.headers);
    delete headers['Content-Type'];
    const api = this.appInit.configuration.API_URL + '' + this.appInit.configuration.API_PREFIX + `login`;
    const options = {
      headers: new HttpHeaders(headers)
    };
    return this.http.post(api, params, options);
  }
}
