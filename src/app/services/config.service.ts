import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  public base_url: string = 'http://beauty.muskowl.com/index.php';
  constructor() { }
}
