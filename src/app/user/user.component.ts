import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { MatCard, MatCardContent } from '@angular/material/card';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatButtonModule, MatIcon, MatTooltip, MatCardContent, MatCard],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  users: Observable<any[]>;

  constructor(private firestore: Firestore) {}

  ngOnInit(): void {
    const usersCollection = collection(this.firestore, 'users');
    this.users = collectionData(usersCollection);
    this.users.subscribe((changes: any) => {
      console.log('received changes from DB', changes);
    });
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}
