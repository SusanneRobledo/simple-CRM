import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Firestore } from '@angular/fire/firestore';
import { RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../../environments/environment';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { UserService } from '../firebase-services/user.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';

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

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UserComponent,
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        MatCardModule,
        MatDialogModule,
        AngularFirestoreModule,
        RouterModule.forRoot([]),
        provideFirebaseApp(() => initializeApp(environment.firebase)),
      ],
      providers: [
        { provide: Firestore, useValue: firestoreMock },
        { provide: MatDialog, useValue: {} },
        { provide: UserService, useValue: { users: [] } }, // Mock your user service if needed
      ],
      schemas: [NO_ERRORS_SCHEMA], // Use schemas to ignore unknown elements/attributes if any
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
