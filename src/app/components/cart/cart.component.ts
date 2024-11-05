import { StoreService } from './../../services/store.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  myCart$ = this.storeService.myCart$;

  constructor(private storeService: StoreService) {    
  }

  totalProduct(price: number, units: number) {
    return price * units;
  }

  deleteProductFromCart(id: string) {
    this.storeService.deleteProductFromCart(id);
  }

  updateUnitsProductInCart(operation: string, id: string) {
    this.storeService.updateUnitsProductInCart(operation, id);
  }

  totalCart() {
    const result = this.storeService.totalCart();
    return result;
  }
}
