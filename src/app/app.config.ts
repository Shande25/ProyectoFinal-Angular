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
    }), provideFirebaseApp(() => initializeApp({"projectId":"finalnucleo","appId":"1:435537655718:web:52425a7e6766b8f9698167","storageBucket":"finalnucleo.firebasestorage.app","apiKey":"AIzaSyCM4Waw1zJplo0VbsIQlQXOUdVZZTlK8lI","authDomain":"finalnucleo.firebaseapp.com","messagingSenderId":"435537655718"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), 
  ]
};
