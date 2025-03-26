import { Component } from '@angular/core';
import { Product } from '../../types/products';
import { Router } from '@angular/router';
import { ProductsService } from '../../services/products/products.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products: Product[] = [];

  constructor(private router: Router, private productsService: ProductsService) {}

  ngOnInit(){
    this.getProducts();
  }

  goToProduct(id: number) {
    this.router.navigate(['/products', id]);
  }

  getProducts() {
    this.productsService.getProducts().subscribe(products => {
      this.products = products;
    });
  }
}
