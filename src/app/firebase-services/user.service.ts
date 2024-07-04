import { Injectable, inject } from '@angular/core';
import { User } from '../interfaces/user';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: User[] = [];

  firestore: Firestore = inject(Firestore);
  constructor() {}
}
