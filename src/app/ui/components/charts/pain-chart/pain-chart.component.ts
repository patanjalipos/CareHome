import { DatePipe } from '@angular/common';
import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { OptionService } from 'src/app/ui/service/option.service';
import { UserService } from 'src/app/ui/service/user.service';
import { UtilityService } from 'src/app/utility/utility.service';
import {
    ChartTypes,
    ConstantsService,
    CustomDateFormat,
} from 'src/app/ui/service/constants.service';
import { ActivatedRoute } from '@angular/router';
import { AppComponentBase } from 'src/app/app-component-base';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';
import { PainChartService } from './pain-chart.service';
import { StrikeThroughEntryComponent } from '../strike-through-entry/strike-through-entry.component';

interface BodyPart {
    name: string;
    top: number;
    left: number;
}

@Component({
    selector: 'app-pain-chart',
    templateUrl: './pain-chart.component.html',
    styleUrls: ['./pain-chart.component.scss'],
})
export class PainChartComponent extends AppComponentBase implements OnInit {
    @ViewChild('child') child: StrikeThroughEntryComponent;
    @Input() preSelectedChartData: any = <any>{};
    @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();
    
    customDateFormat = CustomDateFormat;
    loginId: any;
    userId: any;
    residentAdmissionInfoId: any;
    
    painChartFormData: any = <any>{};
    stLstYesNoOptions: any;
    isEditable: boolean;
    inputFields: boolean;
    StatementType: string;
    
    BodyPartsName: any[] = [];
    bodyDialogCount:number=0;
    painChartRecordData: any = <any>{};
    newlyBodyPart: any[] = [];
    RemovePainPartsCheck: boolean = false;
    NumberChecks: number = 0;
    UpdatedPartsCheck: any[] = [];

    //for carousel
    PainChartLst: any[] = [];
    pageNumber: number = 0;
    pageSize: number = 3;
    responsiveOptions: any[] | undefined;
    rightBtnCheck: boolean = false;
    isShowStrikeThroughPopup: boolean = false;
    StrikeThroughData: any = <any>{};

    evaluateIntervention: boolean = false;
    evaluateInterventionPopupData: any = <any>{}


    evaluateInterventionOption: any[] = [
        { name: 'Effective - Continue as planned', code: 'Effective - Continue as planned' },
        { name: 'Effectiveness - Undergoing Evaluation', code: 'Effectiveness - Undergoing Evaluation' },
        { name: 'Ineffective - New Intervation Required', code: 'Ineffective - New Intervation Required' },
    ];

    communicationOptions: any[] = [
        { label: 'Yes', value: 'Yes' },
        { label: 'No', value: 'No' },
        { label: 'Unsure', value: 'Unsure' },
    ];
    rangeOption: any[] = [
        { label: '0', value: '0' },
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
    ];
    intervalOption: any[] = [
        { label: 'Intermittent', value: 'Intermittent' },
        { label: 'Constant', value: 'Constant' },
    ];

    lstResponseToPain: any[] = [];
    lstReferrals: any[] = [];
    lstImpact: any[] = [];
    lstInterventions: any[] = [];
    lstTypeOfPain: any[] = [];
    stLstReason: any[] = [];

    //Body Map PopUp
    isShowBodyMap: boolean = false;
    isReadOnly: boolean = false;
    bodyMapData: any;
    selectedBodyParts: string[] = null;

    constructor(
        private optionService: OptionService,
        private _UtilityService: UtilityService,
        private _UserService: UserService,
        private datePipe: DatePipe,
        private _ConstantServices: ConstantsService,
        private route: ActivatedRoute,
        private _PainChartServices: PainChartService
    ) {
        super();
        this._ConstantServices.ActiveMenuName = 'Pain Chart';
        this.loginId = localStorage.getItem('userId');
    }

    ShowBodyMapPopUp(isReadOnly: boolean, preselectedBodyParts: BodyPart[] = null, bodyMapStatus = null) {
        this.bodyDialogCount++;
        this.isShowBodyMap = true;
        this.isReadOnly = isReadOnly;
        this.bodyMapData = {
            preselectedBodyParts: preselectedBodyParts,
            status: bodyMapStatus,
            count: this.bodyDialogCount,
            lastSelectedBodyPart: this.painChartRecordData,
            UpdatedParts: this.UpdatedPartsCheck.length == 0 ? [] : this.UpdatedPartsCheck,
            buttoncheck: isReadOnly
        }
    }

    onSelectedBodyParts(bodyMapData: any) {
        
        this.painChartFormData.selectedBodyParts = [...bodyMapData.selectedBodyParts];
        this.UpdatedPartsCheck = [];
        this.UpdatedPartsCheck.push(...bodyMapData.selectedBodyParts);
        this.painChartFormData.bodyMapStatus = bodyMapData.bodyMapStatus
    }

    extractBodyPainLocations(bodyParts: BodyPart[]): string {
        if (bodyParts) {
            return bodyParts.map(part => part.name).join(', ');
        }
        else return null;
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.isEditable = this.preSelectedChartData.isEditable;
        if (this.preSelectedChartData.selectedChartID != null) {
            this.painChartFormData = <any>{};
            this.GetPainChartDetails(this.preSelectedChartData.selectedChartID);
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
        this.optionService.getstLstReason().subscribe((data) => {
            this.stLstReason = data;
        });

        const collectionNames = [
            'TypeOfPain',
            'ResponseToPain',
            'Impact',
            'Interventions',
            'Referrals',
        ];

        forkJoin(
            collectionNames.map((collectionName) =>
                this.GetChartDropDownMasterList(
                    ChartTypes.PainChart,
                    collectionName,
                    1
                )
            )
        ).subscribe((responses: any[]) => {
            this.lstTypeOfPain = responses[0];
            this.lstResponseToPain = responses[1];
            this.lstImpact = responses[2];
            this.lstInterventions = responses[3];
            this.lstReferrals = responses[4];
        });
        this.chartOnChange();
        this.painChartFormData.DateAndTime = new Date();
        this.GetPainChartRecord();
        console.log("Record Data", this.painChartRecordData);
    }

    openAndClose() {
        if (this.painChartFormData.CareGiven == 'Yes') {
            this.inputFields = true;
        } else {
            this.inputFields = false;
        }

        if (this.painChartFormData.selectedBodyParts) {
            this.selectedBodyParts = this.painChartFormData.selectedBodyParts;
        }
    }

    Save() {
        if (
            this.userId != null &&
            this.residentAdmissionInfoId != null &&
            this.loginId != null
        ) {
            this.painChartFormData.userId = this.userId;
            this.painChartFormData.StartedBy = this.loginId;
            this.painChartFormData.LastEnteredBy = this.loginId;
            this.painChartFormData.ResidentAdmissionInfoId =
                this.residentAdmissionInfoId;
            if (this.painChartFormData.DateAndTime) {
                if (
                    this.StatementType == 'Update' &&
                    typeof this.painChartFormData.DateAndTime === 'string'
                ) {
                    //Pare dateTime
                    const dateParts =
                        this.painChartFormData.DateAndTime.split(/[- :]/);
                    const parsedDate = new Date(
                        +dateParts[2],
                        dateParts[1] - 1,
                        +dateParts[0],
                        +dateParts[3],
                        +dateParts[4]
                    );
                    this.painChartFormData.DateAndTime = parsedDate;
                }

                this.painChartFormData.DateAndTime = this.datePipe.transform(
                    this.painChartFormData.DateAndTime,
                    'yyyy-MM-ddTHH:mm'
                );
            }

            this.painChartFormData.NextReviewDate = this.datePipe.transform(
                this.painChartFormData.NextReviewDate,
                'yyyy-MM-dd'
            );

            const objectBody: any = {
                StatementType: this.StatementType,
                painChartData: this.painChartFormData,
            };

            this._UtilityService.showSpinner();
            this.unsubscribe.add = this._PainChartServices
                .AddInsertUpdatePainChartForm(objectBody)
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
            this._UtilityService.showWarningAlert('Pain Chart');
        }
    }
    ClearAllfeilds() {
        if (this.preSelectedChartData.chartMasterId) {
            this.painChartFormData = <any>{};
            this.painChartFormData.painChartId =
                this.preSelectedChartData.selectedChartID;
        }
    }

    GetPainChartDetails(chartId: string) {
        this._UtilityService.showSpinner();
        this.unsubscribe.add = this._PainChartServices
            .GetPainChartById(chartId)
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                        var tdata = JSON.parse(data.actionResult.result);
                        tdata = tdata ? tdata : {};
                        this.painChartFormData = tdata;
                        this.painChartFormData.DateAndTime =
                            this.datePipe.transform(
                                this.painChartFormData.DateAndTime,
                                'dd-MM-yyyy HH:mm'
                            );
                        this.painChartFormData.NextReviewDate =
                            this.datePipe.transform(
                                this.painChartFormData.NextReviewDate,
                                'MM/dd/yyyy'
                            );

                        this.openAndClose();
                    } else {
                        this.painChartFormData = {};
                    }
                },
                error: (e) => {
                    this._UtilityService.hideSpinner();
                    this._UtilityService.showErrorAlert(e.message);
                },
            });
    }

    GetPainChartRecord() {
        this._UtilityService.showSpinner();
        this.unsubscribe.add = this._PainChartServices
            .GetPainChartRecord()
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                        var tdata = JSON.parse(data.actionResult.result);
                        tdata = tdata ? tdata : {};
                        this.painChartRecordData = tdata;
                        console.log("Record Data",this.painChartRecordData.selectedBodyParts);
                        for(let i = 0; i<this.painChartRecordData.selectedBodyParts.length;i++) {
                            this.BodyPartsName.push(this.painChartRecordData.selectedBodyParts[i].name)
                        }
                        console.log(this.BodyPartsName);

                        this.openAndClose();
                    } else {
                        this.painChartFormData = {};
                    }
                },
                error: (e) => {
                    this._UtilityService.hideSpinner();
                    this._UtilityService.showErrorAlert(e.message);
                },
            });
    }

    commaSeparated(values: string[]): string {
        return values.join(', '); // Join with a space after each comma
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
                    return of([]); // Returning empty array in case of error
                })
            );
    }

    ResetModel() {
        this.isEditable = true;
        this.painChartFormData = <any>{};
        this.StatementType = 'Insert';
    }

    chartOnChange() {
        this.getChartDataById(this.preSelectedChartData.chartMasterId, this.preSelectedChartData.residentAdmissionInfoId, this.pageNumber, this.pageSize);
    }

    getChartDataById(chartId: any, residentAdmissionInfoId: any, pageNumber: number, pageSize: number) {
        this._UtilityService.showSpinner();
        this.unsubscribe.add = this._UserService
            .GetChartDataById(chartId, residentAdmissionInfoId, pageNumber, pageSize)
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                        var tdata = JSON.parse(data.actionResult.result);
                        tdata = tdata ? tdata : [];
                        this.PainChartLst = tdata;
                        if (this.PainChartLst.length < 3 || (((this.PainChartLst.length) * (this.pageNumber + 1)) >= this.PainChartLst[0].countRecords)) {
                            this.rightBtnCheck = true;
                        }
                        else {
                            this.rightBtnCheck = false;
                        }
                    } else {
                        this.PainChartLst = [];
                    }
                },
                error: (e) => {
                    this._UtilityService.hideSpinner();
                    this._UtilityService.showErrorAlert(e.message);
                },
            });
    }
    leftBtn() {
        if (this.pageNumber > 0) {
            this.pageNumber--;
            this.chartOnChange();
        }
    }

    rightBtn() {
        this.pageNumber++;
        this.chartOnChange();
    }

    showEvaluateInterventionPopup(chartId: string) {
        this.evaluateIntervention = true;
        this.evaluateInterventionPopupData.chartId = chartId;
    }

    closeEvaluateInterventionPopup() {
        this.evaluateIntervention = false;
        this.evaluateInterventionPopupData = {}
    }
    saveEvaluateInterventionPopupData() {
        this.evaluateInterventionPopupData.evaluateBy = this.userId;
        this.evaluateInterventionPopupData.selectedevaluate = this.evaluateInterventionPopupData.selectedevaluate.code;
        this.evaluateInterventionPopupData.isEvaluate = true;
        this.evaluateInterventionPopupData.chartMasterId = this.preSelectedChartData.chartMasterId;
        const objectBody: any = {
            ChartData: this.evaluateInterventionPopupData,
        };
        this._UtilityService.showSpinner();
        this.unsubscribe.add = this._PainChartServices
            .ChartEvaluate(objectBody)
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
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
        this.closeEvaluateInterventionPopup();
        this.chartOnChange();
    }


    showPopup(chartId, chart) {
        this.StrikeThroughData = {
            ChartMasterId: ChartTypes.PainChart,
            ChartId: chartId,
            ModifiedBy: this.loginId,
        };
        this.isShowStrikeThroughPopup = true;
    }

    Changes(value: boolean) {
        this.isShowStrikeThroughPopup = value;
        this.chartOnChange()
    }

}
