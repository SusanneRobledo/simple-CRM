import { Injectable, inject } from '@angular/core';
import { User } from '../interfaces/user';
import { Firestore, collection, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: User[] = [];

  firestore: Firestore = inject(Firestore);

  constructor() {}
  getUsers() {
    return collection(this.firestore, 'users');
  }

  getUserId(docId: string) {
    return doc(collection(this.firestore, 'users'), docId);
  }
}
