import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideNativeDateAdapter } from '@angular/material/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

const firebase = {
  apiKey: 'AIzaSyCcaflE2X851JkAgW8AYXcym5xzNHJtZ70',
  authDomain: 'simple-crm-d435f.firebaseapp.com',
  projectId: 'simple-crm-d435f',
  storageBucket: 'simple-crm-d435f.appspot.com',
  messagingSenderId: '751357978978',
  appId: '1:751357978978:web:3492a51bcbc6f1d096e43b',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
  ],
};
