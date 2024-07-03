import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideNativeDateAdapter } from '@angular/material/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'simple-crm-d435f',
        appId: '1:751357978978:web:3492a51bcbc6f1d096e43b',
        storageBucket: 'simple-crm-d435f.appspot.com',
        apiKey: 'AIzaSyCcaflE2X851JkAgW8AYXcym5xzNHJtZ70',
        authDomain: 'simple-crm-d435f.firebaseapp.com',
        messagingSenderId: '751357978978',
      })
    ),
    provideFirestore(() => getFirestore()),
  ],
};
