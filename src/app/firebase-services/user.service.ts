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
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: User[] = [];
  singleUser: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(
    null
  );
  userId: string | undefined;

  unsubUser;

  firestore: Firestore = inject(Firestore);

  constructor() {
    this.unsubUser = this.subUser();
  }

  ngOnDestroy() {
    this.unsubUser();
  }

  async updateUser(user: User, userId: string) {
    if (userId) {
      let userRef = this.getSingleUser(userId);
      await updateDoc(userRef, this.getCleanJson(user)).catch((err) => {
        console.log(err);
      });
    }
  }

  getCleanJson(user: User): {} {
    return {
      id: user.id ? user.id : '',
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
  async addUser(user: User) {
    await addDoc(this.getUsers(), user)
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
        this.users.push(this.setUserObject(user.data(), user.id));
      });
    });
  }

  // read data from DB
  subSingleUser(userId: string) {
    return onSnapshot(this.getSingleUser(userId), (user) => {
      this.singleUser.next(this.setUserObject(user.data(), user.id));
      console.log('singleUser: ', this.singleUser);
    });
  }

  getUsers() {
    return collection(this.firestore, 'users');
  }

  getSingleUser(userId: string) {
    return doc(this.getUsers(), userId);
  }
}
