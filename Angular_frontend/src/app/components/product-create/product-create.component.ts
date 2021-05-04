import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  contentData = {
    CategoryID: '',
    productName: '',
  }

  constructor(private _productService: AppService,
              private _router: Router,) { }

  ngOnInit(): void {
  }

  createTweet() {
    this._productService.create(this.contentData)
      .subscribe(
        res => {
          console.log(res)
          this._router.navigate(['/list'])
        },
        err => console.log(err)
      )
  }

}
