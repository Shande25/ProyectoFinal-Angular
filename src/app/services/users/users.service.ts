import { Injectable } from '@angular/core';
import { doc, docData, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private firestore: Firestore, private authService: AuthService) { }

  async loadUserInFirebase(firstName?: string, lastName?: string, age?: number) {
    const user = this.authService.getCurrentUser();
    if (!user) return;

    const userRef = doc(this.firestore, "users", user.uid);
    const userData = await getDoc(userRef); 

    if (userData.exists()) {
        console.log("El usuario ya existe en Firestore:", user.uid);
        return;
    }

    try {
        const userPayload: any = {
            email: user.email,
            photoURL: user.photoURL || '',  
            displayName: user.displayName || '',  
            role: "user",

            firstName: firstName || '',  
            lastName: lastName || '', 
            age: age || null  
        };

        await setDoc(userRef, userPayload);
        console.log("Usuario guardado en Firestore:", user.uid);
    } catch (error) {
        console.error("Error guardando el usuario en Firestore:", error);
    }
}


  getCurrentUser() {
    const user = this.authService.getCurrentUser();
    if (!user) return null;
    const userRef = doc(this.firestore, "users", user.uid);
    return getDoc(userRef).then(doc => doc.data());
  }
}
