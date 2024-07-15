import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { User } from '../interfaces/user';
import { UserService } from '../firebase-services/user.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-dialog-edit-user',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss',
})
export class DialogEditUserComponent {
  user!: User;
  userId!: string;
  loading = false;

  constructor(
    public dialogRef: MatDialogRef<DialogEditUserComponent>,
    private userService: UserService
  ) {}

  async saveChanges() {
    this.loading = true;
    await this.userService.updateUser(this.user, this.userId);
    this.loading = false;
    this.dialogRef.close();
  }
}
