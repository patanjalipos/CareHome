import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { NgxUiLoaderConfig, NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable({
    providedIn: 'root',
})
export class UtilityService {
    public isSpinner = new BehaviorSubject<boolean>(false);
    public isConfirm = new BehaviorSubject<boolean>(false);
    castConfirm = this.isConfirm.asObservable();
    castSpinner = this.isSpinner.asObservable();
    public message = new BehaviorSubject<string>('');
    castSpinnerText = this.message.asObservable();
    SpinnerText: string = '';
    count:number=0;
    config: NgxUiLoaderConfig;
    constructor(private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private ngxService: NgxUiLoaderService,
        ) {
            this.config = this.ngxService.getDefaultConfig();
        }
    showSpinnerWithMsg(msg: string) {
        this.count++;
        // this.isSpinner.next(true);
        // this.message.next(msg);
        this.config.text=msg;
        this.ngxService.start();
    }
    showSpinner() {
        this.count++;
        this.config.text="";
        this.ngxService.start();
        //this.isSpinner.next(true);
        
    }
    hideSpinner() {
        this.count--;
        if (this.count <= 0) {
            this.count = 0;
            // this.isSpinner.next(false);
            // this.message.next('');
            this.ngxService.stop();
        }
    }
    showAlert(_summary: string, _detail: string, _severity: string) {
        this.messageService.add({
            key: 'primeNGAlertMsg',
            severity: _severity,
            summary: _summary,
            detail: _detail,
        });
    }
    showSuccessAlert(_detail: string) {
        this.messageService.add({
            key: 'primeNGAlertMsg',
            severity: 'success',
            summary: 'Success',
            detail: _detail,
        });
    }
    showWarningAlert(_detail: string) {
        this.messageService.add({
            key: 'primeNGAlertMsg',
            severity: 'warn',
            summary: 'Warning',
            detail: _detail,
        });
    }
    showInfoAlert(_detail: string) {
        this.messageService.add({
            key: 'primeNGAlertMsg',
            severity: 'info',
            summary: 'Information',
            detail: _detail,
        });
    }
    showErrorAlert(_detail: string) {
        this.messageService.add({
            key: 'primeNGAlertMsg',
            severity: 'error',
            summary: 'Error',
            detail: _detail,
        });
    }

    showConfirm(_message: string,_header: string="Confirmation",  _icon: string="pi pi-exclamation-triangle") {
        this.confirmationService.confirm({
            header:_header,
            message: _message,
            icon: _icon,
            accept: () => 
            {
                this.isConfirm.next(true);
            },
            reject: () => {
                this.isConfirm.next(false);
            }
          });   
    }
      //Get Extension from Base64
  getFileExtension(base64String: string): string | null {
    const binaryString = atob(base64String);
    const bytes = new Uint8Array(binaryString.length);
    
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const hexString = Array.from(bytes.slice(0, 4)).map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();    

    if (hexString.startsWith('FFD8FF')) {
      return 'jpg'; // JPEG/JPG files
    } 
    else if (hexString.startsWith('89504E47')) {
      return 'png'; // PNG files
    } 
    else if (hexString.startsWith('47494638')) {
       return 'gif';  // GIF
     }
     else if (hexString.startsWith('25504446')) {
       return 'pdf';  // PDF files
     }
     else if (hexString.startsWith('D0CF11E0')) {
       return 'xls';  // XLS files 
     }     
     else if (hexString.startsWith('504B0304')) {
       return 'xlsx'; // XLSX files 
     }
     else if (hexString.startsWith('D0CF11E0')) {
       return 'doc';  // DOC files 
     }     
     else if (hexString.startsWith('504B0304')) {
       return 'docx'; // DOCX files 
     }else {
     return null; // Unknown file type
    }
  }
}
