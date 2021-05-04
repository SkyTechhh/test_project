import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  id: number;
  product = [];

  constructor(private _route: ActivatedRoute,
              private _productService: AppService,) { }

  ngOnInit(): void {
    this.id = +this._route.snapshot.paramMap.get('id')

     this._productService.getProduct(this.id)
      .subscribe(
        data => {
          this.product = data
          console.log(data,'product');

        },
        err => console.log(err)
      )
  }

}
