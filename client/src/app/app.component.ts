import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormControl, FormGroup} from '@angular/forms';

import { APIUtilService } from '../services/apiUtils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  products: any[]
  productPrices: any[]

  public loading: boolean
  public loadingPrices: boolean

  constructor(
    private http: HttpClient,
    private apiService: APIUtilService
  ) { }

  ngOnInit() {
    this.getProducts()
  }

  getProducts(): void {
    this.loading = true
    this.apiService.getProducts()
      .subscribe(data => {
        this.products = data.products
        this.loading = false
      })
      // this.loading = false
  }

  // getUsers(): void {
  //   this.loading = true
  //   this.userService.getUsers()
  //     .subscribe(users => this.users = users);
  //     this.loading = false
  // }

  getProductPrices(formData): void {
    this.loadingPrices = true
    this.apiService.getProductPrices(formData.productId)
      .subscribe(data => {
        this.productPrices = data.response
        this.loadingPrices = false
      })
      
  }
}
