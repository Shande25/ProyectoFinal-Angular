import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideNgIconsConfig } from '@ng-icons/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(),
    provideNgIconsConfig({
      size: "1.5em",
    }), 
    provideFirebaseApp(() => initializeApp({
      "projectId":"app-nucleo-mar",
      "appId":"1:995672471006:web:7d4e5bde82dcaa6110d94f",
      "storageBucket":"app-nucleo-mar.firebasestorage.app",
      "apiKey":"AIzaSyByEJ-kA9ewPabbp7oSri0MTgHH2fyjeMU",
      "authDomain":"app-nucleo-mar.firebaseapp.com",
      "messagingSenderId":"995672471006"})), 
    provideAuth(() => getAuth()), 
    provideFirestore(() => getFirestore())
  ]
};
