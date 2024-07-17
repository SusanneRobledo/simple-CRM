import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../../environments/environment';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
        UserService,
      ],
    });

    service = TestBed.inject(UserService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});
