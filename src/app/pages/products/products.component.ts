import { Component } from '@angular/core';
import { Product } from '../../types/products';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products: Product[] = [
    {
      id: 1,
      title: 'Producto 1',
      price: 109.95,
      description:
        'descripción',
      category: "category",
      image: 'https://via.placeholder.com/150',
      rating: { rate: 3.9, count: 120 }
    },
    {
      id: 2,
      title: 'Producto 2',
      price: 99.95,
      description:
        'descripción',      
      category: "category",
      image: 'https://via.placeholder.com/150',
      rating: { rate: 4.9, count: 120 }
    },
  ];

  constructor(private router: Router) {}

  goToProduct(id: number) {
    this.router.navigate(['/products', id]);
  }
}
