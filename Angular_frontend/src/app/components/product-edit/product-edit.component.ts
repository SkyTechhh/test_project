import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  id: number;
  contentData = {
    CategoryID: '',
    productName: ''
  };

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _productService: AppService) { }

  ngOnInit(): void {
    this.id = +this._route.snapshot.paramMap.get('id')  // one way to get route params
    console.log(this.id,'id');


    this._productService.getProduct(this.id)
      .subscribe(
        data => {
          for (let i = 0; i < data.length; i++) {
            const product = data[i];
            console.log(data[i])
            if (this.id === product.id) {
              this.contentData = {
                  CategoryID: product.CategoryID,
                  productName: product.productName
              }
            }
          }
        },
        err => console.log(err)
      )



  }

  editProduct() {
      console.log(this.contentData,this.id,'contentData');

      this._productService.productEdit(this.contentData, this.id)
        .subscribe(
          res => {
            this._router.navigate(['/list'])
            console.log(res,'put')
          },
          err => console.log(err)
        )
    }

    deleteProduct() {
      alert("Are you sure you want to delete?")
      this._productService.productDelete(this.id)
        .subscribe(
          res => {
            this._router.navigate(['/list'])
            console.log(res,'del')
          },
          err => console.log(err)
        )
    }

}
