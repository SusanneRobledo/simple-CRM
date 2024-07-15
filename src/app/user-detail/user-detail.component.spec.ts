import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Firestore } from '@angular/fire/firestore';
import { RouterModule } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UserDetailComponent } from './user-detail.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../../environments/environment';
import { UserService } from '../firebase-services/user.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

const mockDialogRef = {
  close: jasmine.createSpy('close'),
};

const activatedRouteMock = {
  paramMap: of(new Map([['id', '123']])),
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

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UserDetailComponent,
        CommonModule,
        RouterModule.forRoot([]),
        AngularFirestoreModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
      ],
      providers: [
        { provide: Firestore, useValue: firestoreMock },
        { provide: MatDialog, useValue: mockDialogRef },
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: UserService, useValue: { users: [] } }, // Mock your user service if needed
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
