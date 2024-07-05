import { Injectable, inject } from '@angular/core';
import { User } from '../interfaces/user';
import {
  Firestore,
  collection,
  doc,
  onSnapshot,
  addDoc,
  updateDoc,
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

  async updateUser(user: User) {
    if (user.id) {
      let userRef = this.getSingleUser(user.id);
      await updateDoc(userRef, this.getCleanJson(user)).catch((err) => {
        console.log(err);
      });
    }
  }

  getCleanJson(user: User): {} {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      birthDate: user.birthDate,
      street: user.street,
      zipCode: user.zipCode,
      city: user.city,
    };
  }

  // write data into DB
  async addUser(item: User) {
    await addDoc(this.getUsers(), item)
      .catch((err) => {
        console.error(err);
      })
      .then((docRef) => {
        console.log('Document written with ID:', docRef);
      });
  }

  setUserObject(obj: any, id: string): User {
    return {
      id: id || '',
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
      list.forEach((user) => {
        console.log(this.setUserObject(user.data(), user.id));
        this.users.push(this.setUserObject(user.data(), user.id));
      });
    });
  }

  ngOnDestroy() {
    this.unsubUser();
  }

  getUsers() {
    return collection(this.firestore, 'users');
  }

  getSingleUser(docId: string) {
    return doc(collection(this.firestore, 'users'), docId);
  }
}
