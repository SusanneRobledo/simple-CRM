import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import {
  MatDatepicker,
  MatDatepickerModule,
  MatDatepickerToggle,
} from '@angular/material/datepicker';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatProgressBar } from '@angular/material/progress-bar';
import { User } from '../interfaces/user';
import { UserService } from '../firebase-services/user.service';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-dialog-edit-user',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressBar,
    MatDialogContent,
    MatFormField,
    MatLabel,
    MatDatepickerModule,
    MatDatepicker,
    MatInput,
    MatDatepickerToggle,
    MatDialogActions,
    MatButton,
    FormsModule,
  ],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss',
})
export class DialogEditUserComponent {
  user!: User;
  loading = false;

  /* birthDate!: Date;
  firstName = '';
  lastName = '';
  email = ''; */

  constructor(
    public dialogRef: MatDialogRef<DialogEditUserComponent>,
    private userService: UserService
  ) {}

  editUser() {}
}
