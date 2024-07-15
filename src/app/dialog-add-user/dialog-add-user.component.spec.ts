import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { DialogAddUserComponent } from './dialog-add-user.component';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../../environments/environment';
import {
  MatDialogModule,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { UserService } from '../firebase-services/user.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';

const mockDialogRef = {
  close: jasmine.createSpy('close'),
};

const firestoreMock = {
  collection: (name: string) => ({
    valueChanges: () =>
      jasmine.createSpy('valueChanges').and.returnValue(Promise.resolve([])),
    doc: () => ({
      valueChanges: () =>
        jasmine.createSpy('valueChanges').and.returnValue(Promise.resolve({})),
      set: jasmine.createSpy('set').and.returnValue(Promise.resolve()),
    }),
  }),
};

describe('DialogAddUserComponent', () => {
  let component: DialogAddUserComponent;
  let fixture: ComponentFixture<DialogAddUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DialogAddUserComponent,
        MatDialogModule,
        RouterModule.forRoot([]),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        RouterModule.forRoot([]),
        provideFirebaseApp(() => initializeApp(environment.firebase)),
      ],
      providers: [
        { provide: Firestore, useValue: firestoreMock },
        { provide: MatDialog, useValue: {} },
        { provide: MatDialogRef, useValue: mockDialogRef }, // Provide mock for MatDialogRef
        { provide: UserService, useValue: { users: [] } }, // Mock your user service if needed
      ],
      schemas: [NO_ERRORS_SCHEMA], // Use schemas to ignore unknown elements/attributes if any
    }).compileComponents();

    fixture = TestBed.createComponent(DialogAddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
