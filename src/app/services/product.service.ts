import { Injectable } from '@angular/core';
import { ConfigService } from "./config.service";
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public headers = new HttpHeaders();
  public formData: FormData = new FormData();
  public responseData: any;
  private url;

  constructor(public config: ConfigService, public http: HttpClient) {

  }

  search(data: any) {
    this.formData = new FormData();
    this.url = this.config.base_url + '?route=restapi/product/search';

    if (data.page) {
      this.url += '&page=' + data.page;
    }
    if (data.sort) {
      this.url += '&sort=' + data.sort;
    }
    if (data.order) {
      this.url += '&order=' + data.order;
    }
    if (data.search) {
      this.url += '&search=' + data.search;
    }

    if (data.category_filter) {
      this.url += '&category_filter=' + data.category_filter;
    }

    if (data.brand_filter) {
      this.url += '&brand_filter=' + data.brand_filter;
    }

    if (data.country_origin_filter) {
      this.url += '&country_origin_filter=' + data.country_origin_filter;
    }

    if (data.price_filter) {
      this.url += '&pr=' + data.price_filter;
    }

    return this.http.get<any>(this.url,
      {
        headers: this.headers,
      }
    );
  }

  public decodeEntities(encodedString) {
    var parser = new DOMParser;
    var dom = parser.parseFromString(
      '<!doctype html><body>' + encodedString,
      'text/html');
    var decodedString = dom.body.textContent;
    return decodedString;
  }



  categories() {
    this.formData = new FormData();
    this.url = this.config.base_url + '?route=restapi/product/category';
    return this.http.get<any>(this.url,
      {
        headers: this.headers,
      }
    );
  }


}
