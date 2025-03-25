import { Component } from '@angular/core';
import { Product } from '../../types/products';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  product: Product | undefined;
  productId: number = 0;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(){
    this.activatedRoute.params.subscribe(params => {
      this.productId = params['id'];
    })
  }
}
