import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponentBase } from 'src/app/app-component-base';
import {
    ConstantsService,
    CustomDateFormat,
} from 'src/app/ui/service/constants.service';
import { MasterService } from 'src/app/ui/service/master.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { CareContinencePromotionService } from './care-continence-promotion.service';

@Component({
    selector: 'app-care-continence-promotion',
    templateUrl: './care-continence-promotion.component.html',
    styleUrls: ['./care-continence-promotion.component.scss'],
})
export class CareContinencePromotionComponent
    extends AppComponentBase
    implements OnInit
{
    customDateFormat = CustomDateFormat;
    CareContinencePromotionFormsData: any = <any>{};

    //Form which is selected to edit or view
    isEditable: boolean;
    //Need to be passed from form Dashboard
    StatementType: string = null;

    //Patient Details
    userId: any;
    residentAdmissionInfoId: any;

    //CreatedBy or ModifiedBy
    loginId: any;

    @Input() preSelectedFormData: any = <any>{};
    @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        private _ConstantServices: ConstantsService,
        private route: ActivatedRoute,
        private _UtilityService: UtilityService,
        private _FormService: CareContinencePromotionService
    ) {
        super();
        this._ConstantServices.ActiveMenuName =
            'Care Assessment - Continence Promotion Form';
        this.loginId = localStorage.getItem('userId');

        this.unsubscribe.add = this.route.queryParams.subscribe((params) => {
            var ParamsArray = this._ConstantServices.GetParmasVal(params['q']);

            if (ParamsArray?.length > 0) {
                this.userId =
                    ParamsArray.find((e) => e.FieldStr == 'id')?.FieldVal ||
                    null;
                this.residentAdmissionInfoId =
                    ParamsArray.find((e) => e.FieldStr == 'admissionid')
                        ?.FieldVal || null;
            }
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.isEditable = this.preSelectedFormData.isEditable;

        if (this.preSelectedFormData.selectedFormID != null) {
            this.CareContinencePromotionFormsData = <any>{};

            // get preselected form data

            this.StatementType = 'Update';
        } else {
            this.ResetModel();
        }
    }

    ngOnInit(): void {
        //Fetch Dropdown values

        interface DropdownLists {
            [key: string]: any[];
        }

        const dropdownLists: DropdownLists = {};

        const options = [
            'ContPromCatheterCareOptions',
            'ContPromClinicalObservationsOptions',
            'ContPromContinenceAidBestPracticeGuidanceOptions',
            'ContPromIdentifiedRisksOptions',
            'ContPromInsightIntoContinenceNeedsOptions',
            'ContPromLegDrainageBagChangeOptions',
            'ContPromNightDrainageBagRemovalOptions',
            'ContPromResidentColostomyIleostomyOptions',
            'ContPromRiskManagementOptions',
            'ContPromSupportRequiredForColostomyOptions',
            'ContPromoteHealthyBladderAndBowelOptions',
        ];

        //function to initialize the dropdown lists
        function initializeDropdownLists(options: string[]): void {
            // Iterate through the options array
            options.forEach((option) => {
                // Initialize each dropdown list and assign it to the corresponding key
                dropdownLists[`Lst${option}`] =
                    this.getDropdownMasterLists(option);
            });
        }

        initializeDropdownLists(options);
        //this.getDropdownMasterLists("ContPromCatheterCareOptions");

        this.isEditable = this.preSelectedFormData.isEditable;

        if (this.preSelectedFormData.selectedFormID != null) {
            this.CareContinencePromotionFormsData = <any>{};

            // get preselected form data

            this.StatementType = 'Update';
        } else {
            this.ResetModel();
        }
    }

    getDropdownMasterLists(CollectionName: string): any {
        this._UtilityService.showSpinner();
        this.unsubscribe.add = this._FormService
            .getDropdownMasterList(CollectionName, 1)
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                        var tdata = JSON.parse(data.actionResult.result);
                        return tdata ? tdata : {};
                    } else {
                        return [];
                    }
                },
                error: (e) => {
                    this._UtilityService.hideSpinner();
                    this._UtilityService.showErrorAlert(e.message);
                },
            });
    }

    ResetModel() {
        this.preSelectedFormData = <any>{};
        this.isEditable = true;
        this.CareContinencePromotionFormsData = <any>{};
        this.StatementType = 'Insert';
    }
}
