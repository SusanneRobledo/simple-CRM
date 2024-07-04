import { Injectable, inject } from '@angular/core';
import { User } from '../interfaces/user';
import {
  Firestore,
  collection,
  doc,
  onSnapshot,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: User[] = [];

  unsubUser;

  firestore: Firestore = inject(Firestore);

  constructor() {
    this.unsubUser = this.subUser();
  }

  setUserObject(obj: any): User {
    return {
      firstName: obj.firstName || '',
      lastName: obj.lastName || '',
      email: obj.email || '',
      birthDate: obj.birthDate || '',
      street: obj.street || '',
      zipCode: obj.zipCode || '',
      city: obj.city || '',
    };
  }

  subUser() {
    return onSnapshot(this.getUsers(), (list) => {
      this.users = [];
      list.forEach((element) => {
        this.users.push(this.setUserObject(element.data()));
      });
    });
  }

  ngOnDestroy() {
    this.unsubUser();
  }

  getUsers() {
    return collection(this.firestore, 'users');
  }

  getUserId(docId: string) {
    return doc(collection(this.firestore, 'users'), docId);
  }
}
