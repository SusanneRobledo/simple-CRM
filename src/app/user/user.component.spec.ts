import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { UserService } from '../firebase-services/user.service';
import { ActivatedRoute } from '@angular/router';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { environment } from '../../environments/environment';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let dialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    const dialogMock = jasmine.createSpyObj('MatDialog', ['open']);

    // Initialisieren Sie den Benutzer mit spezifischen Daten, um sicherzustellen, dass er vorhanden ist
    const dialogRefStub = {
      componentInstance: {
        user: undefined,
      },
    };

    dialogMock.open.and.returnValue(dialogRefStub as MatDialogRef<any, any>);

    await TestBed.configureTestingModule({
      imports: [
        UserComponent,
        DialogAddUserComponent,
        BrowserAnimationsModule,
        MatDialogModule,
      ],
      providers: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
        UserService,
        { provide: MatDialogRef, useValue: {} },
        { provide: MatDialog, useValue: dialogMock },
        { provide: ActivatedRoute, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open the dialog and pass the user data', () => {
    component.user = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      birthDate: 12031988,
      street: 'Examplestreet',
      city: 'Portland',
    }; // Beispielnutzer
    component.openDialog();

    expect(dialog.open).toHaveBeenCalled();
    expect(dialog.open).toHaveBeenCalledWith(DialogAddUserComponent);
    const dialogRef = dialog.open.calls.mostRecent()
      .returnValue as MatDialogRef<DialogAddUserComponent, any>;
    expect(dialogRef.componentInstance.user).toEqual(component.user);
  });
});
