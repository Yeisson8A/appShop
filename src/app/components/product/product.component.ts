import { StoreService } from './../../services/store.service';
import { Product } from './../../interfaces/product.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];

  constructor(private storeService: StoreService) {
  }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.storeService.getAllProducts().subscribe((data) => {
      this.products = data;
    });
  }

  addProductToCart(product: Product) {
    this.storeService.addProductToCart(product);
  }

  getProductImage(product: Product) {
    return product.images[0].replace(/[\[\]\"]/g, '');
  }
}
