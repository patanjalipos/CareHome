import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MessageService} from 'primeng/api'; 
import { ConstantsService } from '../../service/constants.service';
import { Router } from '@angular/router';
import { AppComponentBase } from 'src/app/app-component-base';
import { UtilityService } from 'src/app/utility/utility.service';
import { AuthServiceService } from '../../service/auth-service.service';
import { EncryptDecryptService } from '../../service/encrypt-decrypt.service';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  
})
export class ChangePasswordComponent extends AppComponentBase implements OnInit {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;

  showOldPwd: boolean = false;
  showNewPwd: boolean = false;
  showConfirmPwd: boolean = false;

  constructor(
    private router: Router,
    private _ConstantServices: ConstantsService,
    private _AuthServices: AuthServiceService,
    private _UtilityService : UtilityService,
    private _EncryptDecryptService:EncryptDecryptService,
  ) { 
    super();
    this._ConstantServices.ActiveMenuName = "Change Password";

  }
  profileForm = new FormGroup({
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  });
  ngOnInit(): void {
 
  }
  changePwd() {
    this.oldPassword=this._EncryptDecryptService.encryptUsingAES256(this.oldPassword);
    this.newPassword=this._EncryptDecryptService.encryptUsingAES256(this.newPassword);
    this.confirmPassword=this._EncryptDecryptService.encryptUsingAES256(this.confirmPassword);
    
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._AuthServices.ChangePassword(this.oldPassword, this.newPassword)
      .subscribe
      (
        data => {
          this._UtilityService.hideSpinner();          
          this._UtilityService.showWarningAlert(data.actionResult.errMsg);
          this.ResetModel();
          if (data.actionResult.success == true) {
            this.logout();
          }          
        }
      );
  }

  ResetModel() {
    this.profileForm.reset({
      'oldPassword': '',
      'newPassword': '',
      'confirmPassword': ''
    });
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login'], {
      queryParams: {},
    });
  }
}
