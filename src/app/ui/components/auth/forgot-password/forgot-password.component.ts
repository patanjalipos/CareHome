import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/ui/service/auth-service.service';
import { UtilityService } from 'src/app/utility/utility.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  inputlogin: string = "";
  constructor(
    private _AuthServices: AuthServiceService,
    private _UtilityService: UtilityService,
  ) {

  }

  ngOnInit(): void {
  }

  submit() {
    if (this.inputlogin?.trim() == "" || this.inputlogin == null || this.inputlogin == undefined) {
      this._UtilityService.showWarningAlert('Please enter Login ID/MR No.');
      return;
    }
    else {
      this._UtilityService.showSpinner();
      this._AuthServices.GetForgotPassword(this.inputlogin)
        .subscribe({
          next: (data) => {
            this._UtilityService.hideSpinner();
            this._UtilityService.showSuccessAlert(data.actionResult.errMsg);
            this.inputlogin = '';
          }, error: (e) => {
            this._UtilityService.hideSpinner();
          },
        });
    }
  }
}
