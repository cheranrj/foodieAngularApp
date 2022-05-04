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

  saveOutlet(params: any, headers: any = {}): Observable<any> {
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

  updateOutlet(params: any, id: number, headers: any = {}): Observable<any> {
    // const token = this.gfService.getCookie('token');
    // if (token) {
    //   headers.token = token;
    // }
    headers = this.gfService.JSONMerge(headers, this.headers);
    delete headers['Content-Type'];
    const api = this.appInit.configuration.API_URL + '' + this.appInit.configuration.API_PREFIX + `login/${id}`;
    const options = {
      headers: new HttpHeaders(headers)
    };
    return this.http.put(api, params, options);
  }

  getOutletDetail(id: number, headers: any = {}): Observable<any> {
    // const token = this.gfService.getCookie('token');
    // if (token) {
    //   headers.token = token;
    // }
    headers = this.gfService.JSONMerge(headers, this.headers);
    const api =
      this.appInit.configuration.API_URL + '' + this.appInit.configuration.API_PREFIX + `outlet/${id}`;
    const options = {
      headers: new HttpHeaders(headers)
    };
    return this.http.get(api, options);
  }


  saveDish(params: any, headers: any = {}): Observable<any> {
    // const token = this.gfService.getCookie('token');
    // if (token) {
    //   headers.token = token;
    // }
    headers = this.gfService.JSONMerge(headers, this.headers);
    delete headers['Content-Type'];
    const api = this.appInit.configuration.API_URL + '' + this.appInit.configuration.API_PREFIX + `save_dish`;
    const options = {
      headers: new HttpHeaders(headers)
    };
    return this.http.post(api, params, options);
  }

  updateDish(params: any, id: number, headers: any = {}): Observable<any> {
    // const token = this.gfService.getCookie('token');
    // if (token) {
    //   headers.token = token;
    // }
    headers = this.gfService.JSONMerge(headers, this.headers);
    delete headers['Content-Type'];
    const api = this.appInit.configuration.API_URL + '' + this.appInit.configuration.API_PREFIX + `update_dish/${id}`;
    const options = {
      headers: new HttpHeaders(headers)
    };
    return this.http.put(api, params, options);
  }

  getDishDetail(id: number, headers: any = {}): Observable<any> {
    // const token = this.gfService.getCookie('token');
    // if (token) {
    //   headers.token = token;
    // }
    headers = this.gfService.JSONMerge(headers, this.headers);
    const api =
      this.appInit.configuration.API_URL + '' + this.appInit.configuration.API_PREFIX + `outlet/dish/${id}`;
    const options = {
      headers: new HttpHeaders(headers)
    };
    return this.http.get(api, options);
  }

  getDishList(params: any = {}, headers: any = {}): Observable<any> {
    // const token = this.gfService.getCookie('token');
    // if (token) {
    //   headers.token = token;
    // }
    headers = this.gfService.JSONMerge(headers, this.headers);
    const api =
      this.appInit.configuration.API_URL + '' + this.appInit.configuration.API_PREFIX + `dish`;
    const options = {
      headers: new HttpHeaders(headers),
      params
    };
    return this.http.get(api, options);
  }

  getOutletList(params: any = {}, headers: any = {}): Observable<any> {
    // const token = this.gfService.getCookie('token');
    // if (token) {
    //   headers.token = token;
    // }
    headers = this.gfService.JSONMerge(headers, this.headers);
    const api =
      this.appInit.configuration.API_URL + '' + this.appInit.configuration.API_PREFIX + `outlet`;
    const options = {
      headers: new HttpHeaders(headers),
      params
    };
    return this.http.get(api, options);
  }

  getOrderList(params: any = {}, headers: any = {}): Observable<any> {
    // const token = this.gfService.getCookie('token');
    // if (token) {
    //   headers.token = token;
    // }
    headers = this.gfService.JSONMerge(headers, this.headers);
    const api =
      this.appInit.configuration.API_URL + '' + this.appInit.configuration.API_PREFIX + `outlet`;
    const options = {
      headers: new HttpHeaders(headers),
      params
    };
    return this.http.get(api, options);
  }

  updateOrder(params: any, id: number, headers: any = {}): Observable<any> {
    // const token = this.gfService.getCookie('token');
    // if (token) {
    //   headers.token = token;
    // }
    headers = this.gfService.JSONMerge(headers, this.headers);
    delete headers['Content-Type'];
    const api = this.appInit.configuration.API_URL + '' + this.appInit.configuration.API_PREFIX + `order/${id}`;
    const options = {
      headers: new HttpHeaders(headers)
    };
    return this.http.put(api, params, options);
  }


  saveOrder(params: any, headers: any = {}): Observable<any> {
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
}
