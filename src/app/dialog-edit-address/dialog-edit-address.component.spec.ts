import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditAddressComponent } from './dialog-edit-address.component';
import { environment } from '../../environments/environment';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import {
  provideFirestore,
  getFirestore,
  FirestoreModule,
} from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

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

describe('DialogEditAddressComponent', () => {
  let component: DialogEditAddressComponent;
  let fixture: ComponentFixture<DialogEditAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DialogEditAddressComponent,
        CommonModule,
        FirestoreModule,
        MatDialogModule,
        provideFirestore(() => getFirestore()),
        provideFirebaseApp(() => initializeApp(environment.firebase)),
      ],
      providers: [{ provide: MatDialogRef, useValue: mockDialogRef }],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogEditAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
