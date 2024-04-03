import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponentBase } from 'src/app/app-component-base';
import { UtilityService } from 'src/app/utility/utility.service';
import { AuthServiceService } from 'src/app/ui/service/auth-service.service';
import { EncryptDecryptService } from 'src/app/ui/service/encrypt-decrypt.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent extends AppComponentBase {    
    valCheck: string[] = ['remember'];
    UserName: string;
    Password: string;
    invalidLogin: Boolean = false;
    constructor(
        public _AuthServices: AuthServiceService,
        private router: Router,
         private _UtilityService: UtilityService, 
        private _EncryptDecryptService:EncryptDecryptService
    ) { 
        super();
    }


    ValidateLogin() {
        if (this.UserName == null || this.UserName == undefined || this.UserName?.trim() == '')
        {
            this._UtilityService.showWarningAlert("please enter login id");
            return;
        }
        if (this.Password == null || this.Password == undefined || this.Password?.trim() == '')
        {
            this._UtilityService.showWarningAlert("please enter password"); 
            return;
        }
        //this.router.navigateByUrl("/uicare");
        this.Password=this._EncryptDecryptService.encryptUsingAES256(this.Password);
        this._UtilityService.showSpinner();
        this.unsubscribe.add = this._AuthServices.Login(this.UserName, this.Password)
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                        var tdata = JSON.parse(data.actionResult.result);
                        tdata = tdata ? tdata : [];
                        sessionStorage.clear();
                        localStorage.clear();

                        localStorage.setItem('token', data.actionResult.AuthenticationToken);
                        localStorage.setItem('userTypeId', data.actionResult.userTypeId);
                        localStorage.setItem('userId', data.actionResult.userId);
                        localStorage.setItem('HomeMasterId', tdata.HomeMasterId);
                        localStorage.setItem('FirstName', tdata.FirstName == null ? '' : tdata.FirstName);
                        localStorage.setItem('LastName', tdata.LastName == null ? '' : tdata.LastName);
                        localStorage.setItem('Gender', tdata.Gender);
                        localStorage.setItem('ProfileImage', tdata.ProfileImage);
                        //this._dymservice.loadMenu();
                        this.router.navigateByUrl("/");
                    }
                    else {
                        this.invalidLogin = true;
                        this._UtilityService.showWarningAlert("Invalid credentials.");                       
                    }
                },
                error: (e) => {
                    this._UtilityService.hideSpinner();
                    this._UtilityService.showErrorAlert(e.message);                    
                }
            }
            );
    }
}
