import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public base_url: string = 'http://localhost/opencart/beauty/index.php';
  constructor() { }
}
