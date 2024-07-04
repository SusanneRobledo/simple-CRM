import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { MatCard, MatCardContent } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { UserService } from '../firebase-services/user.service';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIcon,
    MatTooltip,
    MatCardContent,
    MatCard,
    CommonModule,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  readonly dialog = inject(MatDialog);

  constructor(private userService: UserService) {}

  getUsers(): User[] {
    return this.userService.users;
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}
