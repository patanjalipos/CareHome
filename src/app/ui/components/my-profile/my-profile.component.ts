import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';
import { ConstantsService, CustomDateFormat} from '../../service/constants.service';
import { Router } from '@angular/router';
import { AppComponentBase } from 'src/app/app-component-base';
import { UtilityService } from 'src/app/utility/utility.service';
import { AuthServiceService } from '../../service/auth-service.service';
import { EncryptDecryptService } from '../../service/encrypt-decrypt.service';
import { UserService } from '../../service/user.service';
import { FileUpload } from 'primeng/fileupload';
declare var $: any;

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent extends AppComponentBase implements OnInit {
  @ViewChild('fileInput') fileInput: FileUpload; 
  customDateFormat = CustomDateFormat;
  lsttitle: any[];
  lstgender: any[];
  lstbloodgrp: any[];
  lstHomeMaster: any[] = [];
  lstUser: any;
  imageSrc: any;
  todayDate = new Date();
  public MyProfileModel: any = <any>{};  
  CalculatedDOB?:Date=null;
  IsDOB:boolean = false;

  fileUploadFormAWB: FormGroup;
  fileInputLabelAWB: string;
  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  }); 
  userId:string=localStorage.getItem('userId');
  constructor(
    private router: Router,
    private _ConstantServices: ConstantsService,
    private _UserServices: UserService,
    private _UtilityService : UtilityService,
    private _EncryptDecryptService:EncryptDecryptService,

    private formBuilder: FormBuilder,
    //private _fbnew:FormBuilder,
  ) { 
    super();
    this._ConstantServices.ActiveMenuName = "My Profile";
    this.lsttitle = [
      { name: 'Mr.', code: 'Mr.' },
      { name: 'Mrs.', code: 'Mrs.' },
      { name: 'Ms.', code: 'Ms.' },
      { name: 'Master', code: 'Master' }
    ];
    this.lstgender = [
      { name: 'Male', code: 'Male' },
      { name: 'Female', code: 'Female' },
      { name: 'Other', code: 'Other' }
    ];
    this.lstbloodgrp = [
      { name: 'A+ve', code: 'A+ve' },
      { name: 'A-ve', code: 'A-ve' },
      { name: 'B+ve', code: 'B+ve' },
      { name: 'B-ve', code: 'B-ve' },
      { name: 'AB+ve', code: 'AB+ve' },
      { name: 'AB-ve', code: 'AB-ve' },
      { name: 'O+ve', code: 'O+ve' },
      { name: 'O-ve', code: 'O-ve' }
    ];
  }

  ngOnInit(): void {
    this.fileUploadFormAWB = this.formBuilder.group({
      myfileAWB: ['']
    });
    console.log(this.userId);
    this.LoadUserDetails(this.userId);
  }

  //Profile Image

  onFileSelectAWB(event) {
    let af = ['.jpg', '.png', '.jpeg']
    if (event.target.files?.length > 0) {
      const file = event.target.files[0];
      //console.log(file.size);
      if (!af.includes('.' + file.type.split('/')[1])) {
        $('#customFileAWB').val("");
        this._UtilityService.showWarningAlert("Only jpg and png Allowed!");
      }
      else if (file.size > 204800) {
        $('#customFileAWB').val("");
        this._UtilityService.showWarningAlert("Maximum upload size is 200KB. Please compress and upload it again.");
      }
      else {
        this.fileInputLabelAWB = file.name;
        this.fileUploadFormAWB.get('myfileAWB').setValue(file);
      }
      const reader = new FileReader();
      if (event.target.files && event.target.files?.length) {
        const [file] = event.target.files;
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.imageSrc = reader.result as string;
          this.myForm.patchValue({
            fileSource: reader.result as string
          });
        };
        var selectedFile = [];
        for (let file of event.target.files) {
          selectedFile.push(file);
        }
      }
    }
  }

  ClearProfile()
  {
   this.imageSrc=null;
   this.MyProfileModel.ProfileImage=null;
  }

   // Get user-profile
   LoadUserDetails(UserId: string) {
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._UserServices.GerUserDetailsById(UserId)
      .subscribe({
        next: (data) => {
          this._UtilityService.hideSpinner();
          if (data.actionResult.success == true) {
            var tdata = JSON.parse(data.actionResult.result);
            tdata = tdata ? tdata : [];   
            this.lstUser=tdata; 
            console.log(this.lstUser);
            this.MyProfileModel.Title= this.lstUser[0].Title;
              this.MyProfileModel.FirstName= this.lstUser[0].FirstName;
              this.MyProfileModel.LastName= this.lstUser[0].LastName;                             
              this.MyProfileModel.HomeName= this.lstUser[0].HomeName; 
              this.MyProfileModel.PreferredName= this.lstUser[0].PreferredName; 
              this.MyProfileModel.DateOfBirth=new Date(this.lstUser[0].DateOfBirth);
              this.MyProfileModel.Designation= this.lstUser[0].Designation;                
              if (this.lstUser[0].EmploymentDate != undefined && this.lstUser[0].EmploymentDate != null && this.lstUser[0].EmploymentDate != '')
                {
                  this.MyProfileModel.EmploymentDate= new Date(this.lstUser[0].EmploymentDate); 
                 }
              if (this.lstUser[0].ProfileImage != undefined && this.lstUser[0].ProfileImage != null && this.lstUser[0].ProfileImage != '')
                {
                  var imageFormat=this._UtilityService.getFileExtension(this.lstUser[0].ProfileImage);
                  this.imageSrc = "data:image/" + imageFormat + ";base64," + this.lstUser[0].ProfileImage;
                }
          }

        }, error: (e) => {
          this._UtilityService.hideSpinner();
        },
      });
  }

  // Update user-profile

  UpdateUserDetails()
  {  
    this.MyProfileModel.ModifiedBy = this.userId;
    this.MyProfileModel.UserId = this.userId;
    this.MyProfileModel.ProfileImage=this.imageSrc;   
    this._UtilityService.showSpinner();
      this._UserServices.UpdateUserDetailsById(this.MyProfileModel)
        .subscribe({
          next: (data) => {
            this._UtilityService.hideSpinner();
            this._UtilityService.showSuccessAlert(data.actionResult.errMsg);
            if (data.actionResult.success == true)
              this.LoadUserDetails(this.userId);

          }, error: (e) => {
            this._UtilityService.hideSpinner();
          },
        });
  }


}
