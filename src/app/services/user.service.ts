import { Injectable } from '@angular/core';
import { ConfigService } from "./config.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  public headers = new HttpHeaders();
  public formData: FormData = new FormData();
  public responseData: any;
  private url;

  constructor(public config: ConfigService, public http: HttpClient) {

  }

  login(data: any) {
    this.formData = new FormData();
    this.url = this.config.base_url + '?route=restapi/account/login';

    this.formData.append('email', data.email);
    this.formData.append('password', data.password);

    return this.http.post<any>(this.url,
      this.formData,
      {
        headers: this.headers,
      }
    );
  }




}
