import {
  waitForAsync,
  ComponentFixture,
  TestBed,
  getTestBed,
} from '@angular/core/testing';

import { ForgotPasswordComponent } from './forgot-password.component';
import { Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { Observable, of } from 'rxjs';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthServiceService } from 'src/app/ui/service/auth-service.service';

const fakeAuth = {
  email: 'admin@demo.com',
  password: 'demo',
};

class FakeAuthService {
  forgotPassword(email: string): Observable<boolean> {
    const isChecked = email.toLowerCase() === fakeAuth.email.toLowerCase();
    return of(isChecked);
  }
}

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let injector;
  let authService: AuthServiceService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule],
      declarations: [ForgotPasswordComponent],
      providers: [
        {
          provide: AuthServiceService,
          useClass: FakeAuthService,
        },
      ],
    }).compileComponents();

    injector = getTestBed();
    authService = injector.get(AuthServiceService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
