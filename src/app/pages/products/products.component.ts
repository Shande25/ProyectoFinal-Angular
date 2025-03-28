import { Component } from '@angular/core';
import { Product } from '../../types/products';
import { Router } from '@angular/router';
import { ProductsService } from '../../services/products/products.service';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products: Product[] = [];

  constructor(
    private router: Router, 
    private productsService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit(){
    this.getProducts();
    // this.productsService.loadProductstoFirebase();
  }

  goToProduct(id: number) {
    this.router.navigate(['/products', id]);
  }

  getProducts() {
    this.productsService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  addToCart(event: Event, product: Product) {
    event.stopPropagation();
    this.cartService.addProduct(product);
  }
}
