import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from "../services/product.service";
import { ActionSheetController } from '@ionic/angular';
import { InfiniteScroll } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { FilterComponent } from "../filter/filter.component";
@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;

  public products: any;
  public filterData: any;
  public page: any;
  public finalPage: any;
  public search: string;
  public heading_title: string;
  public pagination: any;
  public sorts: any;
  public limits: any;
  public sort;
  public order;
  constructor(
    public productService: ProductService,
    public actionSheetController: ActionSheetController,
    public popoverController: PopoverController
  ) {
    this.page = 1;
    this.products = [];
  }

  ngOnInit() {
    this.getItems();
  }


  async sortActionSheet() {
    let customButtons = [];
    for (let index = 0; index < this.sorts.length; index++) {
      var sortsButtons = {
        text: this.productService.decodeEntities(this.sorts[index].text),
        handler: () => {
          this.sorts = this.sorts[index].value;
          let sortArray = this.sorts.split("-");

          this.sort = sortArray[0];
          this.order = sortArray[1];
          this.products = [];
          this.page = 1;
          this.getItems();
        }
      };
      customButtons.push(sortsButtons);
    }

    let actionSheet = await this.actionSheetController.create({
      header: 'Sort',
      buttons: customButtons
    });

    actionSheet.present();
  }


  loadData(event) {

    if (this.pagination) {
      this.pagination.forEach(element => {
        this.finalPage = element;
      });
    }

    if (this.page != this.finalPage) {
      this.page++;
      this.getItems();
      setTimeout(() => {
        event.target.complete();
      }, 500);
    } else {
      event.target.complete();
    }


  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      this.page = 1;
      this.products = [];
      this.search = '';
      this.getItems();
      event.target.complete();
    }, 2000);
  }

  public searchItems(ev) {
    this.page = 1;
    this.search = ev.target.value;
    this.products = [];
    this.getItems();
  }

  public getItems() {
    this.filterData = {
      'search': this.search,
      'page': this.page,
      'sort': this.sort,
      'order': this.order,
    };
    this.productService.search(this.filterData).subscribe(
      response => {
        this.heading_title = response.heading_title;

        this.pagination = response.pagination;
        this.sorts = response.sorts;
        this.limits = response.limits;

        if (response.products) {
          response.products.forEach(element => {
            this.products.push({
              product_id: element.product_id,
              thumb: element.thumb,
              name: element.name,
              description: element.description,
              price: element.price,
              special: element.special,
              tax: element.tax,
              minimum: element.minimum,
              rating: element.rating,
            })
          });
        }
      },
      err => console.error(err),
      () => {

      }
    );
  }

  async presentFilterPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: FilterComponent,
      event: ev,
      translucent: false
    });
    return await popover.present();
  }

  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
