import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient
    ) {

  }

  apiUrl: string = environment.baseUrl;
 
  headers() {
    let headers = {};
 

    return new HttpHeaders({
      "Content-Type": "application/json",
      'check-x-token': 'true',
      ...headers
    });
  }

  /**
   * for using get method.
   * @param url : url where request will be sent
   * @param params
   */
  get(url: string, params?: object) {
    const apiUrl = `${this.apiUrl}${url}`;
    return this.http.get(apiUrl, {
      headers: this.headers()
    });
  }

  /**
   * for using put method
   * @param url : url where request will be send
   * @param data : body part of post data
   * @param params : Query params 
   */
  put(url: string, data?: any, params?: object) {
    const apiUrl = `${this.apiUrl}${url}`;
    return this.http.put(apiUrl, data, {
      headers: this.headers()
    });
  }

  /**
   * for using put method
   * @param url : url where request will be send
   * @param data : body part of post data
   * @param params : Query params 
   */
  post(url: string, data?: any, params?: object) {
    const apiUrl = `${this.apiUrl}${url}`;
    return this.http.post(apiUrl, data, {
      headers: this.headers()
    });
  }

  /**
   * delete method does not have any body part
   * passes object id as parameter
   * also passes token in header part
   * @param url : url where request will be send
   */
  delete(url: string) {
    const apiUrl = `${this.apiUrl}${url}`;
    return this.http.delete(apiUrl, {
      headers: this.headers()
    });
  }

 
}