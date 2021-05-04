import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products = []
  page: number = 0;
  pageNum: number;
  pageSize: number;
  constructor(private _productService: AppService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    let pageNum = this.route.snapshot.queryParamMap;
    this.page = (pageNum['params']['page'] as number)
    console.log(this.page, 'page');

    this.getProducts(this.page);
  }

  getProducts(pageNum: number) {
    this._productService.getAll(pageNum)
      .subscribe(
        res => {
          this.products = res.data
          this.pageNum = res.page
          this.pageSize = res.pageSize
          console.log(pageNum,'pageNum')
        },
        err => console.log(err)
      )
  }

  nextPage(pageNum: number) {
    this.page = (+pageNum) + (+1)
    if(this.page > this.pageSize){
      this.page = this.pageSize
    }
    this.getProducts(this.page);
    this.router.navigate(['/list'],
         {queryParams: {page: this.page}});
  }
  prevPage(pageNum: number) {
    this.page = (pageNum*1) - (1*1)
    if(this.page == 0){
      this.page = 1
    }
    this.getProducts(this.page);
    this.router.navigate(['/list'],
         {queryParams: {page: this.page}});
  }
}
