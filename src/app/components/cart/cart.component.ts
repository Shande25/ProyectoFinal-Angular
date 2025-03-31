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
    const doc = new jsPDF.default(); // Crear una instancia de jsPDF

    // Tamaño de la página A4 en px (595x842)
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const imagePromises: any[] = []; // Array para almacenar las promesas de carga de imágenes

    // Iterar sobre los productos en el carrito
    this.getProducts().forEach((product, index) => {
      if (product.image) {
        const img = new Image();
        img.src = product.image2;

        // Promesa para cargar la imagen
        const imagePromise = new Promise<void>((resolve, reject) => {
          img.onload = () => {
            // Calcular el ancho y alto de la imagen para que ocupe toda la página
            const imageWidth = pageWidth;
            const imageHeight = pageHeight;

            // Calcular la posición X para centrar la imagen
            const xPosition = (pageWidth - imageWidth) / 2;
            const yPosition = (pageHeight - imageHeight) / 2;

            // Si no es el primer producto, añadir una nueva página para cada imagen
            if (index > 0) {
              doc.addPage(); // Añadir nueva página en el PDF
            }

            // Añadir la imagen al PDF
            doc.addImage(img, 'JPEG', xPosition, yPosition, imageWidth, imageHeight);

            resolve(); // Resolvemos la promesa cuando la imagen se ha cargado y agregado
          };

          img.onerror = reject; // En caso de error al cargar la imagen
        });

        imagePromises.push(imagePromise); // Agregar la promesa al array
      }
    });

    // Esperar a que todas las promesas se resuelvan antes de generar el PDF
    Promise.all(imagePromises)
      .then(() => {
        doc.save('carrito.pdf'); // Guardar el archivo PDF con el nombre 'carrito.pdf'
      })
      .catch((error) => {
        console.error('Error al cargar las imágenes:', error);
      });
}


}
