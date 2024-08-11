import {
    Component,
    ComponentRef,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import {
    ConstantsService,
    CustomDateFormat,
    FormTypes,
} from 'src/app/ui/service/constants.service';
import { MasterService } from 'src/app/ui/service/master.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { AppComponentBase } from 'src/app/app-component-base';
import { ActivatedRoute } from '@angular/router';
import { Calendar } from 'primeng/calendar';
import { DatePipe } from '@angular/common';
import { UserService } from 'src/app/ui/service/user.service';
import { ResidentProfileService } from '../../resident-profile/resident-profile.service';

@Component({
    selector: 'app-forms-dashboard',
    templateUrl: './forms-dashboard.component.html',
    styleUrls: ['./forms-dashboard.component.scss'],
})
export class FormsDashboardComponent
    extends AppComponentBase
    implements OnInit
{
    @Input() residentAdmissionInfoId: string = null;
    @Input() userId: any = null;

    @ViewChild('Forms',{static : false}) childRef : ElementRef;
    @ViewChild('formContainer', { read: ViewContainerRef }) formRef : ViewContainerRef;
    @Input() isViewForms: boolean;
    @Input() lstResidents: any[];
    
    public lstMaster: any[] = [];
    public formDashboardList: any[] = [];
    customDateFormat = CustomDateFormat;
    
    selectedFormMasterId: string;
    selectedFormData: any;
    selectedFormId: string;

    rangeDates: Date[] | undefined;
    FormTypes = FormTypes;
    ShowChildComponent: boolean = false;
    
    selectedOption: string;
    selectedResidentUserId: any;
    filteritems: any[] = [];

    constructor(
        private _ConstantServices: ConstantsService,
        private _MasterServices: MasterService,  
        private _UserServices: UserService,
        private _UtilityService: UtilityService,
        private route: ActivatedRoute,
        private datepipe: DatePipe,
        private sharedStateService: ResidentProfileService
    ) {
        super();
       // this._ConstantServices.ActiveMenuName = 'Form Dashboard';
    }

    ngOnInit() {
        if(!this.isViewForms)
            {
                this._ConstantServices.ActiveMenuName = 'Form Dashboard';
            }
        this.GetformMaster();
        this.ResetModel();
    }
    dateRangeChange(calendar: Calendar) {
        if (this.rangeDates[0] !== null && this.rangeDates[1] !== null) {
            calendar.overlayVisible = false;
            this.SearchForm();
        }
    }

    GetformMaster() {
        let importData: any = <any>{};   
        importData.StatusType=true;
        this._UtilityService.showSpinner();
        this.unsubscribe.add = this._MasterServices.GetFormMaster(importData)
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                        var tdata = JSON.parse(data.actionResult.result);
                        tdata = tdata ? tdata : [];
                        this.lstMaster = tdata;
                    } else {
                        this.lstMaster = [];
                    }
                },
                error: (e) => {
                    this._UtilityService.hideSpinner();
                    this._UtilityService.showErrorAlert(e.message);
                },
            });
    }

    SearchForm() {
        this.sharedStateService.tranferValu(true);
        this.ShowChildComponent = false;
        this._UtilityService.showSpinner();
        const residentAdmissionInfoId = this.residentAdmissionInfoId;
        const formMasterId = this.selectedFormMasterId;

        //Date conversions
        var dFrom = null;
        var dTo = null;
        if (this.rangeDates != null) {
            if (this.rangeDates[0] != null) {
                dFrom = this.datepipe.transform(
                    this.rangeDates[0],
                    'yyyy-MM-dd'
                );
            }
            if (this.rangeDates[1] != null) {
                dTo = this.datepipe.transform(this.rangeDates[1], 'yyyy-MM-dd');
            }
        }
        if(this.isViewForms && !this.selectedResidentUserId)
            {
                this._UtilityService.showErrorAlert('Select Resident');
                this.selectedFormMasterId='';

            }
        // Call the API
        this._UserServices
            .GetFormDasboardList(
                residentAdmissionInfoId,
                formMasterId,
                dFrom,
                dTo
            )
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                        var tdata = JSON.parse(data.actionResult.result);
                        tdata = tdata ? tdata : [];
                        this.formDashboardList = tdata;
                        
                    } else {
                        this.formDashboardList = [];
                    }
                },
                error: (e) => {
                    this._UtilityService.hideSpinner();
                    this._UtilityService.showErrorAlert(e.message);
                },
            });
    }

    //View/Edit Form
    OpenForm(        
        selectedFormMasterId: string,
        selectedFormdata: any = <any>{},
        isEditable = true
    ) {
        if (selectedFormMasterId != null) {
            this.selectedFormMasterId = selectedFormMasterId;
            this.selectedFormData = {
                formMasterId: selectedFormMasterId,
                selectedFormID: selectedFormdata.FormId,
                residentAdmissionInfoId: this.residentAdmissionInfoId,
                userId: this.userId,
                isEditable: isEditable,
                IsCompleted: selectedFormdata.IsCompleted,
                StartedBy: selectedFormdata.StartedBy,
                StartedByDesignation: selectedFormdata.StartedByDesignation,
                StartedOn: selectedFormdata.StartedOn,
                ModifiedBy: selectedFormdata.ModifiedBy,
                ModifiedByDesignation: selectedFormdata.ModifiedByDesignation,
                ModifiedOn: selectedFormdata.ModifiedOn,
            };
            this.ShowModel();
            setTimeout(() => {
                this.childRef.nativeElement.scrollIntoView({ behavior: 'smooth' });
            },200);
        } 
        else if (this.isViewForms && !this.selectedResidentUserId) {
            this._UtilityService.showErrorAlert('Select Resident');
        }   
        else{
            this._UtilityService.showErrorAlert('Kindly select an Assessment Form');
        }
    }

    ShowModel() {
        this.ShowChildComponent = true;
    }

    ResetModel() {
        this.formDashboardList =null;
        this.rangeDates =null;
        this.selectedFormMasterId = null;
        this.selectedFormId = null;
        this.selectedFormData = null;
        if(this.isViewForms==true)
            {
                this.selectedResidentUserId = '';
                this.lstMaster=null;
            }
    }
    EmitUpdateForm(event) {
        this.SearchForm();
    }

    onResidentChange(event: any) {
        this.selectedResidentUserId = event.value;
    
        this.filteritems = this.lstResidents.filter(
          (x) => x.UserId === this.selectedResidentUserId
        );
    
        setTimeout(() => {
            if (this.filteritems.length > 0) {
                this.residentAdmissionInfoId = this.filteritems[0].ResidentAdmissionInfoId;
                this.userId = this.filteritems[0].UserId;               
                this.GetformMaster();  
                this.selectedFormMasterId = null;     
                this.formDashboardList=[];       
              }
            }, 0);
          }
}
