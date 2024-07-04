import { Injectable, inject } from '@angular/core';
import { User } from '../interfaces/user';
import {
  Firestore,
  collection,
  doc,
  onSnapshot,
  addDoc,
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

  async addUser(item: User) {
    await addDoc(this.getUsers(), item)
      .catch((err) => {
        console.error(err);
      })
      .then((user) => {
        console.log('User added:', user);
      });
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

  // read data from DB
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
