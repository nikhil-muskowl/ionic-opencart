import { Component, OnInit } from '@angular/core';
import { ProductService } from "../services/product.service";
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  categories: any;
  constructor(public productService: ProductService) { }

  public manufacturer() {
    this.productService.categories().subscribe(
      response => {
        this.categories = response.categories;
      },
      err => console.error(err),
      () => {
      }
    );
  }

  ngOnInit() {
    this.manufacturer();
  }

}
