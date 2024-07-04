import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { MatProgressBar } from '@angular/material/progress-bar';
import { UserService } from '../firebase-services/user.service';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogTitle,
    MatButton,
    MatDialogClose,
    MatFormField,
    MatLabel,
    MatIcon,
    MatHint,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    MatProgressBar,
  ],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss',
})
export class DialogAddUserComponent {
  birthDate: Date = new Date();
  loading = false;

  firstName = '';
  lastName = '';
  email = '';
  street = '';
  zipCode?: number;
  city = '';

  constructor(
    public dialogRef: MatDialogRef<DialogAddUserComponent>,
    private userService: UserService
  ) {}

  async addUser() {
    let user: User = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      birthDate: this.birthDate.getTime(),
      street: this.street,
      zipCode: this.zipCode,
      city: this.city,
    };
    this.loading = true;
    await this.userService.addUser(user);
    this.loading = false;
    this.dialogRef.close();
  }
}
