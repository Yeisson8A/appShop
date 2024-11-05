import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private baseUrl = 'https://api.escuelajs.co/api/v1/';
  // Lista carrito
  private myList: Product[] = [];
  // Carrito observable
  private myCart = new BehaviorSubject<Product[]>([]);
  myCart$ = this.myCart.asObservable();

  constructor(private httpClient: HttpClient) { }

  getAllProducts(): Observable<Product[]> {
    const response = this.httpClient.get<Product[]>(this.baseUrl + 'products');
    return response;
  }

  addProductToCart(product: Product) {
    if (this.myList.length === 0) {
      product.cantidad = 1;
      this.myList.push(product);
      this.myCart.next(this.myList);
    }
    else {
      const productMod = this.myList.find((element) => element.id === product.id);

      if (productMod) {
        productMod.cantidad++;
      }
      else {
        product.cantidad = 1;
        this.myList.push(product);
      }
      this.myCart.next(this.myList);
    }
  }

  deleteProductFromCart(id: string) {
    this.myList = this.myList.filter((product) => product.id != id);
    this.myCart.next(this.myList);
  }

  updateUnitsProductInCart(operation: string, id: string) {
    const product = this.myList.find((element) => element.id === id);

    if (product) {
      if (operation === 'minus' && product.cantidad > 0) {
        product.cantidad--;
        this.myCart.next(this.myList);
      }
      if (operation === 'minus' && product.cantidad === 0) {
        this.deleteProductFromCart(id);
      }
      if (operation === 'plus') {
        product.cantidad++;
        this.myCart.next(this.myList);
      }
    }
  }

  totalCart() {
    const total = this.myList.reduce((acc, product) => acc + (product.price * product.cantidad), 0);
    return total;
  }

  totalProductsInCart() {
    const total = this.myList.length;
    return total;
  }
}
