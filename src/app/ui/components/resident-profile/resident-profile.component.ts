import { Component, OnInit } from '@angular/core';
import { AdmissionStatus, ConstantsService, CustomDateFormat } from 'src/app/ui/service/constants.service';
import { MasterService } from '../../service/master.service'; import { UtilityService } from 'src/app/utility/utility.service';
import { AppComponentBase } from 'src/app/app-component-base';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UserService } from '../../service/user.service';
import { FallRiskAssessmentModule } from '../clinical/fall-risk-assessment/fall-risk-assessment.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resident-profile',
  templateUrl: './resident-profile.component.html',
  styleUrls: ['./resident-profile.component.scss']
})
export class ResidentProfileComponent extends AppComponentBase implements OnInit {
  customDateFormat = CustomDateFormat;
  admissionStatus = AdmissionStatus;
  selecteduserid: any = null; //"3325faff-558d-4067-9c56-02e78dd06b26";
  selectedadmissionid: any = null; //"a24a3830-1b5e-4ce7-a8cd-df6de925ffa9";
  healthcareMode: string = "view";
  public ResidentMaster: any = <any>{};
  allergies: string = "";
  profileUrl: string = environment.BaseURIFileServer + 'ProfileImage/';
  imageSrc: any;

  ProgressNote: boolean = false;
  CarePlan: boolean = false;
  Form: boolean = false;
  Chart: boolean = false;
  Alert: boolean = false;
  Action: boolean = false;
  Profile: boolean = false;
  visible: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private _ConstantServices: ConstantsService,
    private _MasterServices: MasterService,
    private _UserServices: UserService,
    private _UtilityService: UtilityService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private messageService: MessageService
  ) {
    super();
    this._ConstantServices.ActiveMenuName = "Resident Profile";
    this.unsubscribe.add = this.route.queryParams.subscribe(params => {
      var ParamsArray = this._ConstantServices.GetParmasVal(params['q']);
      if (ParamsArray?.length > 0) {
        //console.log('ParamsArray',ParamsArray);
        this.healthcareMode = ParamsArray.find(e => e.FieldStr == 'mode')?.FieldVal || 'view';
        this.selecteduserid = ParamsArray.find(e => e.FieldStr == 'id')?.FieldVal || null;
        this.selectedadmissionid = ParamsArray.find(e => e.FieldStr == 'admissionid')?.FieldVal || null;
      }
    });
  }

  ngOnInit(): void {
    this.Profile = true;
    if (this.selecteduserid != null)
      this.LoadResidentDetails(this.selecteduserid, this.selectedadmissionid);
  }

  confirm(event: Event, componentType: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to leave this page?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        if (componentType == 'Form') {
          this.Form = true;
          this.Chart = false;
          this.CarePlan = false;
          this.ProgressNote = false;
          this.Action = false;
          this.Profile = false;
          this.Alert = false;
        } else if (componentType == 'Chart') {
          this.Chart = true;
          this.Form = false;
          this.CarePlan = false;
          this.ProgressNote = false;
          this.Action = false;
          this.Alert = false;
          this.Profile = false;
        } else if (componentType == 'CarePlan') {
          this.CarePlan = true;
          this.Chart = false;
          this.Form = false;
          this.ProgressNote = false;
          this.Action = false;
          this.Alert = false;
          this.Profile = false;
        } else if (componentType == 'ProgressNote') {
          this.ProgressNote = true;
          this.Chart = false;
          this.CarePlan = false;
          this.Form = false;
          this.Action = false;
          this.Alert = false;
          this.Profile = false;
        } else if (componentType == 'Action') {
          this.Action = true;
          this.Chart = false;
          this.CarePlan = false;
          this.ProgressNote = false;
          this.Form = false;
          this.Alert = false;
          this.Profile = false;
        } else if (componentType == 'Alert') {
          this.Alert = true;
          this.Chart = false;
          this.CarePlan = false;
          this.ProgressNote = false;
          this.Action = false;
          this.Form = false;
          this.Profile = false;
        }
      },
      reject: () => {

        console.log(componentType);
        console.log(this.Profile + " " + this.Chart + " " + this.Form);
        if (this.Form==true) {
          this.Form = true;
          this.Chart = false;
          this.CarePlan = false;
          this.ProgressNote = false;
          this.Action = false;
          this.Profile = false;
          this.Alert = false;
        } else if (this.Chart==true) {
          this.Chart = true;
          this.Form = false;
          this.CarePlan = false;
          this.ProgressNote = false;
          this.Action = false;
          this.Alert = false;
          this.Profile = false;
        } else if (componentType == 'CarePlan') {
          this.CarePlan = true;
          this.Chart = false;
          this.Form = false;
          this.ProgressNote = false;
          this.Action = false;
          this.Alert = false;
          this.Profile = false;
        } else if (componentType == 'ProgressNote') {
          this.ProgressNote = true;
          this.Chart = false;
          this.CarePlan = false;
          this.Form = false;
          this.Action = false;
          this.Alert = false;
          this.Profile = false;
        } else if (componentType == 'Action') {
          this.Action = true;
          this.Chart = false;
          this.CarePlan = false;
          this.ProgressNote = false;
          this.Form = false;
          this.Alert = false;
          this.Profile = false;
        } else if (componentType == 'Alert') {
          this.Alert = true;
          this.Chart = false;
          this.CarePlan = false;
          this.ProgressNote = false;
          this.Action = false;
          this.Form = false;
          this.Profile = false;
        }
      }
    });
  }


  showProgressNote() {
    if (this.Chart || this.Form || this.Action || this.Alert || this.CarePlan) {
      // confirm("Are you sure To leave this page..");
      this.visible = true;

    } else {
      this.Profile = false;
      this.ProgressNote = true;
    }
  }

  showChart() {
    if (this.ProgressNote || this.Form || this.Action || this.Alert || this.CarePlan) {
      this.showDiscardPopup();
    } else {
      this.Profile = false;
      this.Chart = true;
    }
  }
  showForm() {
    if (this.Chart || this.CarePlan || this.Action || this.Alert || this.ProgressNote) {
      // confirm("Are you sure To leave this page..");
      this.showDiscardPopup();
    } else {
      this.Profile = false;
      this.Form = true;
    }
  }
  showAlert() {
    if (this.Chart || this.Form || this.Action || this.CarePlan || this.ProgressNote) {
      //confirm("Are you sure To leave this page..");
      this.showDiscardPopup();

    } else {
      this.Profile = false;
      this.Alert = true;
    }
  }
  showCarePlan() {
    if (this.Chart || this.Form || this.Action || this.Alert || this.ProgressNote) {
      // confirm("Are you sure To leave this page..");
      this.showDiscardPopup();
    } else {
      this.Profile = false;
      this.CarePlan = true;
    }
  }
  showAction() {
    if (this.Chart || this.Form || this.CarePlan || this.Alert || this.ProgressNote) {
      // confirm("Are you sure To leave this page..");
      this.showDiscardPopup();
    } else {
      this.Profile = false;
      this.Action = true;
    }
  }

  showDiscardPopup() {
    this.visible = true;
  }
  LoadResidentDetails(userid, admissionid) {
    this._UtilityService.showSpinner();
    this.unsubscribe.add = this._UserServices.GetResidentDetailsById(userid, admissionid)
      .subscribe
      ({
        next: (data) => {
          this._UtilityService.hideSpinner();
          if (data.actionResult.success == true) {
            var tdata = JSON.parse(data.actionResult.result);
            tdata = tdata ? tdata : [];
            this.ResidentMaster = tdata;
            if (this.ResidentMaster.ProfileImage != undefined && this.ResidentMaster.ProfileImage != null && this.ResidentMaster.ProfileImage != '') {
              // var imageFormat = this.ResidentMaster.ProfileImage.endsWith(".jpg") ||this.ResidentMaster.ProfileImage.endsWith(".jpeg") ? "jpeg" : "png";
              var imageFormat = this._UtilityService.getFileExtension(this.ResidentMaster.ProfileImage);
              this.imageSrc = "data:image/" + imageFormat + ";base64," + this.ResidentMaster.ProfileImage;
            }
            else {
              this.imageSrc = "";
            }
            if (data.actionResult.result2 != null && data.actionResult.result2 != undefined && data.actionResult.result2?.length > 0) {
              var tdata2 = JSON.parse(data.actionResult.result2);
              this.allergies = tdata2.AllergyNotes;
              if (tdata2.Allergen) {
                this.allergies = ((this.allergies != '' && this.allergies != null && this.allergies != undefined) ? (this.allergies + ', ') : this.allergies) + tdata2.Allergen;
              }

            }
            //console.log('this.ResidentMaster', this.ResidentMaster);           

          }

        },
        error: (e) => {
          this._UtilityService.hideSpinner();
          this._UtilityService.showErrorAlert(e.message);
        },
      });
  }
  calculateAge(birthday): number {
    if (birthday != undefined) {
      var curdate = new Date();
      var dob = new Date(birthday);
      var ageyear = curdate.getFullYear() - dob.getFullYear();
      var agemonth = curdate.getMonth() - dob.getMonth();
      var ageday = curdate.getDate() - dob.getDate();
      if (agemonth <= 0) {
        ageyear--;
        agemonth = (12 + agemonth);
      }
      if (curdate.getDate() < dob.getDate()) {
        agemonth--;
        ageday = 30 + ageday;
      } if (agemonth == 12) {
        ageyear = ageyear + 1;
        agemonth = 0;
      }
      return ageyear;
    }
    else
      return 0;
  }

}
