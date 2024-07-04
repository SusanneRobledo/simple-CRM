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
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
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

  constructor(
    public dialogRef: MatDialogRef<DialogAddUserComponent>,
    private firestore: Firestore,
    private userService: UserService
  ) {}

  /*  async saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    console.log('current user is', this.user);
    this.loading = true;
    const users = collection(this.firestore, 'users'); // Get the collection reference
    try {
      const result = await addDoc(users, { ...this.user });
      console.log('user added', result);
      this.loading = false;
      this.dialogRef.close();
    } catch (error) {
      console.error('Error adding user: ', error);
    }
  }  */
}
