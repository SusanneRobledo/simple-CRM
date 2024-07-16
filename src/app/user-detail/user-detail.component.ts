import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../firebase-services/user.service';
import { CommonModule } from '@angular/common';
import { Firestore } from '@angular/fire/firestore';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { User } from '../interfaces/user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatIcon,
    MatMenu,
    MatMenuTrigger,
    MatMenuItem,
    MatIconButton,
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent implements OnInit, OnDestroy {
  userId: string = '';
  user: User = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    birthDate: 0,
    street: '',
    zipCode: 12345,
    city: '',
  };

  readonly dialog = inject(MatDialog);
  firestore: Firestore = inject(Firestore);

  private unsubSingleUser: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getSingleUser();
  }

  ngOnDestroy(): void {
    if (this.unsubSingleUser) {
      this.unsubSingleUser.unsubscribe();
    }
  }

  editUserDetails() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = { ...this.user }; //copy of the User Object
    dialog.componentInstance.userId = this.userId;
  }

  editAddress() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = { ...this.user };
    dialog.componentInstance.userId = this.userId;
  }

  getUserId() {
    this.userId = this.route.snapshot.params['id'];
    console.log('id =', this.userId);
    return this.userId;
  }

  getSingleUser() {
    this.userId = this.getUserId();
    this.unsubSingleUser = this.userService.singleUser.subscribe((user) => {
      if (user) {
        this.user = user;
        console.log('Updated user: ', this.user);
      }
    });
    this.userService.subSingleUser(this.userId);
  }
}
