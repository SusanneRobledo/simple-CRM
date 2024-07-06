import { Component, OnInit, inject } from '@angular/core';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../firebase-services/user.service';
import { CommonModule } from '@angular/common';
import { Firestore, onSnapshot } from '@angular/fire/firestore';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';

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
export class UserDetailComponent implements OnInit {
  userId: any = '';
  user: any = {};

  readonly dialog = inject(MatDialog);
  firestore: Firestore = inject(Firestore);

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    console.log('id =', this.userId);
    this.subSingleUser();
  }

  subSingleUser() {
    onSnapshot(this.userService.getSingleUser(this.userId), (user) => {
      this.user = user.data();
    });
  }

  editUserDetails() {
    this.dialog.open(DialogEditUserComponent);
  }

  editAddress() {
    this.dialog.open(DialogEditAddressComponent);
  }
}
