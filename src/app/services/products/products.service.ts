import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../types/products';
import { collection, collectionData, doc, docData, Firestore, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private url = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient, private firestore: Firestore) { }

  getProducts(): Observable<Product[]> {
    // return this.http.get<Product[]>(this.url);
    const productsRef = collection(this.firestore, "products");
    return collectionData(productsRef) as Observable<Product[]>;
  }

  getProduct(id: number): Observable<Product> {
    // return this.http.get<Product>(`${this.url}/${id}`);
    const productRef = doc(this.firestore, "products", id.toString());
    return docData(productRef) as Observable<Product>;
  }

  loadProductstoFirebase() {
    this.getProducts().subscribe(products => {
      products.forEach(product => {
        const productRef = doc(this.firestore, "products", product.id.toString());
        setDoc(productRef, product);
      })
    });
  }
}
