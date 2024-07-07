import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatProgressBar } from '@angular/material/progress-bar';
import { User } from '../interfaces/user';
import { UserService } from '../firebase-services/user.service';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-dialog-edit-address',
  standalone: true,
  imports: [
    MatButton,
    MatInput,
    CommonModule,
    MatProgressBar,
    MatDialogContent,
    MatFormField,
    MatLabel,
    MatDialogActions,
    FormsModule,
    MatDialogClose,
  ],
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss',
})
export class DialogEditAddressComponent {
  user!: User;

  loading = false;

  constructor(
    public dialogRef: MatDialogRef<DialogEditAddressComponent>,
    private userService: UserService
  ) {}

  addUser() {}
}
