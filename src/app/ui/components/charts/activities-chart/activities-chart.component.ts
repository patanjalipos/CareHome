import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import { AppComponentBase } from 'src/app/app-component-base';
import { MasterService } from 'src/app/ui/service/master.service';
import { OptionService } from 'src/app/ui/service/option.service';
import { UtilityModule } from 'src/app/utility/utility.module';
import { UtilityService } from 'src/app/utility/utility.service';
import { ActivityChartService } from './activity-chart.service';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';
import {
    ChartTypes,
    ConstantsService,
    CustomDateFormat,
} from 'src/app/ui/service/constants.service';
import { UserService } from 'src/app/ui/service/user.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-activities-chart',
    templateUrl: './activities-chart.component.html',
    styleUrls: ['./activities-chart.component.scss'],
})
export class ActivitiesChartComponent
    extends AppComponentBase
    implements OnInit
{
    @Input() preSelectedChartData: any = <any>{};
    @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

    customDateFormat = CustomDateFormat;
    inputFields: boolean = false;
    ActivitiesChartFormData: any = <any>{};
    isEditable: boolean;
    loginId: any;
    residentAdmissionInfoId: any;
    userId: any;
    StatementType: string = null;

    lstActivity: any[] = [];
    lstPurposeOfActivity: any[] = [];

    //Static Options
    stLstYesNoOptions: any[] = [];
    stLstAttendanceOptions: any[] = [];

    constructor(
        private optionService: OptionService,
        private _UtilityService: UtilityService,
        private _UserService: UserService,
        private datePipte: DatePipe,
        private _ActivityChartServices: ActivityChartService,
        private _ConstantServices: ConstantsService,
        private route: ActivatedRoute
    ) {
        super();
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
        this.isEditable = this.preSelectedChartData.isEditable;
        if (this.preSelectedChartData.selectedChartID != null) {
            this.ActivitiesChartFormData = <any>{};
            this.GetActivitiesChartDetails(
                this.preSelectedChartData.selectedChartID
            );
            this.StatementType = 'Update';
        } else {
            this.ResetModel();
        }
    }

    ngOnInit(): void {
        this.userId = this.preSelectedChartData.userId;
        this.residentAdmissionInfoId =
            this.preSelectedChartData.residentAdmissionInfoId;

        this.optionService.getstLstYesNoOptions().subscribe((data) => {
            this.stLstYesNoOptions = data;
        });

        this.optionService.getstLstAttendaceOptions().subscribe((data) => {
            this.stLstAttendanceOptions = data;
        });

        const collectionNames = ['Activity', 'PurposeofActivity'];

        forkJoin(
            collectionNames.map((collectionName) =>
                this.GetChartDropDownMasterList(
                    ChartTypes.ActivitiesChart,
                    collectionName,
                    1
                )
            )
        ).subscribe((responses: any[]) => {
            this.lstActivity = responses[0];
            this.lstPurposeOfActivity = responses[1];
        });
    }

    ClearAllfeilds() {
        if (this.preSelectedChartData.selectedChartID) {
            this.ActivitiesChartFormData = <any>{};
            this.ActivitiesChartFormData.activitiesChartId =
                this.preSelectedChartData.selectedChartID;
        }
    }

    GetActivitiesChartDetails(chartId: string) {
        this._UtilityService.showSpinner();
        this.unsubscribe.add = this._ActivityChartServices
            .GetActivitiesChartById(chartId)
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                        var tdata = JSON.parse(data.actionResult.result);
                        tdata = tdata ? tdata : {};
                        this.ActivitiesChartFormData = tdata;
                        this.ActivitiesChartFormData.DateAndTime =
                            this.datePipte.transform(
                                this.ActivitiesChartFormData.DateAndTime,
                                'dd-MM-yyyy HH:mm'
                            );
                        this.openAndClose();
                    } else {
                        this.ActivitiesChartFormData = {};
                    }
                },
                error: (e) => {
                    this._UtilityService.hideSpinner();
                    this._UtilityService.showErrorAlert(e.message);
                },
            });
    }

    openAndClose() {
        if (this.ActivitiesChartFormData.CareGiven == 'Yes') {
            this.inputFields = true;
        } else {
            this.inputFields = false;
        }
    }

    GetChartDropDownMasterList(
        chartMasterId: string,
        dropdownName: string,
        status: number
    ): Observable<any> {
        this._UtilityService.showSpinner();
        return this._UserService
            .GetChartDropDownMasterList(chartMasterId, dropdownName, status)
            .pipe(
                map((response) => {
                    this._UtilityService.hideSpinner();
                    if (response.actionResult.success) {
                        return JSON.parse(response.actionResult.result);
                    } else {
                        return [];
                    }
                }),
                catchError((error) => {
                    this._UtilityService.hideSpinner();
                    this._UtilityService.showErrorAlert(error.message);
                    alert(error.message);
                    return of([]); // Returning empty array in case of error
                })
            );
    }

    Save() {
        if (
            this.userId != null &&
            this.residentAdmissionInfoId != null &&
            this.loginId != null
        ) {
            this.ActivitiesChartFormData.userId = this.userId;
            this.ActivitiesChartFormData.StartedBy = this.loginId;
            this.ActivitiesChartFormData.LastEnteredBy = this.loginId;
            this.ActivitiesChartFormData.ResidentAdmissionInfoId =
                this.residentAdmissionInfoId;

            if (this.ActivitiesChartFormData.DateAndTime) {
                if (
                    this.StatementType == 'Update' &&
                    typeof this.ActivitiesChartFormData.DateAndTime === 'string'
                ) {
                    //Pare dateTime
                    const dateParts =
                        this.ActivitiesChartFormData.DateAndTime.split(/[- :]/);
                    const parsedDate = new Date(
                        +dateParts[2],
                        dateParts[1] - 1,
                        +dateParts[0],
                        +dateParts[3],
                        +dateParts[4]
                    );
                    this.ActivitiesChartFormData.DateAndTime = parsedDate;
                }
                this.ActivitiesChartFormData.DateAndTime =
                    this.datePipte.transform(
                        this.ActivitiesChartFormData.DateAndTime,
                        'yyyy-MM-ddTHH:mm'
                    );
            }

            const objectBody: any = {
                StatementType: this.StatementType,
                activitiesChartData: this.ActivitiesChartFormData,
            };

            this._UtilityService.showSpinner();
            this.unsubscribe.add = this._ActivityChartServices
                .AddInsertUpdateActivityChartForm(objectBody)
                .subscribe({
                    next: (data) => {
                        this._UtilityService.hideSpinner();
                        if (data.actionResult.success == true) {
                            this.EmitUpdateForm.emit(true);
                            this.ResetModel();
                            this._UtilityService.showSuccessAlert(
                                data.actionResult.errMsg
                            );
                        } else
                            this._UtilityService.showWarningAlert(
                                data.actionResult.errMsg
                            );
                    },
                    error: (e) => {
                        this._UtilityService.hideSpinner();
                        this._UtilityService.showErrorAlert(e.message);
                    },
                });
        } else {
            this._UtilityService.showWarningAlert('Activities Chart');
        }
    }

    ResetModel() {
        this.isEditable = true;
        this.ActivitiesChartFormData = <any>{};
        this.StatementType = 'Insert';
    }
}
