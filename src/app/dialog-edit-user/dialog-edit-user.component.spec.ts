import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogEditUserComponent } from './dialog-edit-user.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { Firestore } from '@angular/fire/firestore';
import { UserService } from '../firebase-services/user.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { environment } from '../../environments/environment';

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

const userServiceMock = {
  updateUser: jasmine
    .createSpy('updateUser')
    .and.returnValue(Promise.resolve()),
};

describe('DialogEditUserComponent', () => {
  let component: DialogEditUserComponent;
  let fixture: ComponentFixture<DialogEditUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatDialogModule,
        FormsModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        DialogEditUserComponent,
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: Firestore, useValue: firestoreMock },
        { provide: UserService, useValue: userServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogEditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
