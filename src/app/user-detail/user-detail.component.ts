import { Component, OnInit, inject } from '@angular/core';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { User } from '../interfaces/user';
import { UserService } from '../firebase-services/user.service';
import { CommonModule } from '@angular/common';
import { Firestore, onSnapshot } from '@angular/fire/firestore';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, MatCard, MatCardHeader, MatCardTitle, MatCardContent],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent implements OnInit {
  userId: any = '';

  user: any = {};

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
}
