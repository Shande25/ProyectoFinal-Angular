import { Component, ElementRef, ViewChild } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { Product } from '../../types/products';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  
  @ViewChild('cartItems') cartItems!: ElementRef;

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
  printCart() {
    const doc = new jsPDF.default(); 

    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const imagePromises: any[] = []; 


    this.getProducts().forEach((product, index) => {
      if (product.image) {
        const img = new Image();
        img.src = product.image2;

        const imagePromise = new Promise<void>((resolve, reject) => {
          img.onload = () => {
            const imageWidth = pageWidth;
            const imageHeight = pageHeight;

            const xPosition = (pageWidth - imageWidth) / 2;
            const yPosition = (pageHeight - imageHeight) / 2;


            if (index > 0) {
              doc.addPage(); 
            }

            doc.addImage(img, 'JPEG', xPosition, yPosition, imageWidth, imageHeight);

            resolve(); 
          };

          img.onerror = reject;
        });

        imagePromises.push(imagePromise); 
      }
    });


    Promise.all(imagePromises)
      .then(() => {
        doc.save('carrito.pdf'); 
      })
      .catch((error) => {
        console.error('Error al cargar las imágenes:', error);
      });
}


}
