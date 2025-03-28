import { Component } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { Product } from '../../types/products';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  constructor(private cartService: CartService) { }

  getProducts() {
    return this.cartService.getProducts();
  }

  removeProduct(product: Product) {
    this.cartService.removeProduct(product);
  }

  closeCart() {
    this.cartService.hideCart();
  }

  getTotal() {
    return this.cartService.getTotal();
  }
}
