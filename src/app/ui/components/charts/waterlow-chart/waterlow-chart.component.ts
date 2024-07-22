import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { AppComponentBase } from 'src/app/app-component-base';
import { ChartTypes, ConstantsService, CustomDateFormat } from 'src/app/ui/service/constants.service';
import { WaterlowChartService } from './waterlow-chart.service';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { OptionService } from 'src/app/ui/service/option.service';
import { UserService } from 'src/app/ui/service/user.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { Observable, catchError, forkJoin, map, of } from 'rxjs';
import { Message } from 'primeng/api';

@Component({
    selector: 'app-waterlow-chart',
    templateUrl: './waterlow-chart.component.html',
    styleUrls: ['./waterlow-chart.component.scss']
})
export class WaterlowChartComponent extends AppComponentBase implements OnInit {
    @Input() preSelectedChartData: any = <any>{};
    @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

    inputFieldsCheck: boolean;
    customDateFormat = CustomDateFormat;
    isEditable: boolean;
    residentAdmissionInfoId: any;
    loginId: any;
    userId: any;
    WaterlowChartData: any = <any>{};
    StatementType: string = null;
    CareGivenCheck: boolean = false;
    ReasonCheck: boolean = false;
    messages: Message[] | undefined;
    messages1: Message[] | undefined;
    messages2: Message[] | undefined;
    messages3: Message[] | undefined;
    messages4: Message[] | undefined;
    messages5: Message[] | undefined;
    messages6: Message[] | undefined;
    messages7: Message[] | undefined;
    messages8: Message[] | undefined;
    NutritionScoreValue: number = 0;
    WaterlowScoreValue: number = 0;
    ClassificationValue: string = 'Normal';
    MalnutritionConfirmCheck: boolean = false;
    MalnutritionDeclineCheck: boolean = false;
    ScoreDropdownCheck: boolean = false;
    MedicationValueCheck: boolean = false;
    MalnutritionScreeningValue: number = 0;
    WeightLossScoreValue: number = 0;
    LackOfAppetiteValue: number = 0;
    BMIValue: number = 0;
    ContinenceValue: number = 0;
    SkinTypeValue: number = 0;
    MobilityValue: number = 0;
    GenderValue: number = 0;
    AgeValue: number = 0;
    SpecialRisksTissueValue: number = 0;
    SpecialRisksNeurologicalValue: number = 0;
    SpecialRisksSurgeryValue: number = 0;
    SpecialRisksMedicationScoreValue: number = 0;

    LstBMIValue: any[] = [];
    LstContinence: any[] = [];
    LstSkinType: any[] = [];
    LstMobility: any[] = [];
    LstAge: any[] = [];
    LstMalnutritionScreening: any[] = [];
    LstWeightLossScore: any[] = [];
    LstSpecialRisksTissue: any[] = [];
    LstSpecialRisksNeurological: any[] = [];
    LstSpecialRisksMajorSurgeryOrTrauma: any[] = [];
    LstSpecialRisksMedication: any[] = [];

    //Static Options
    stLstYesNoOptions: any[] = [];
    stLstReason: any[] = [];

    //for carousel
    WaterlowChartsLst: any[] = [];
    pageNumber: number = 0;
    pageSize: number = 3;
    responsiveOptions: any[] | undefined;
    rightBtnCheck: boolean = false;
    isShowStrikeThroughPopup: boolean = false;
    StrikeThroughData: any = <any>{};
    stLstErrorAndWarning: any = <any>{};
    result: any = <any>{};
    ChartName: string;

    GenderOption: any[] = [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' }
    ];
    LstLackOfAppetite: any[] = [
        { label: 'Yes(1)', value: 'Yes(1)' },
        { label: 'No(0)', value: 'No(0)' }
    ];
    LstScore: any[] = [
        { label: '4', value: '4' },
        { label: '5', value: '5' },
        { label: '6', value: '6' }
    ];
    LstSpecialRisksMedicationScore: any[] = [
        { label: '0', value: '0' },
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' }
    ];


    constructor(private _OptionService: OptionService,
        private _ConstantServices: ConstantsService,
        private _UtilityService: UtilityService,
        private _UserService: UserService,
        private _WaterlowService: WaterlowChartService,
        private _DatePipe: DatePipe,
        private _route: ActivatedRoute) {
        super();
        this.loginId = localStorage.getItem('userId');
        this.unsubscribe.add = this._route.queryParams.subscribe((params) => {
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
            this.WaterlowChartData = <any>{};
            this.GetWaterlowChartDetails(this.preSelectedChartData.selectedChartID);
            this.StatementType = 'Update';
        } else {
            this.ResetModel();
        }
    }

    ngOnInit(): void {

        this.messages7 = [
            { severity: 'secondary', detail: 'If >2 refer for nutrition assessment/intervention' }
        ];

        this.userId = this.preSelectedChartData.userId;
        this.residentAdmissionInfoId =
            this.preSelectedChartData.residentAdmissionInfoId;

        this._OptionService.getstLstYesNoOptions().subscribe((data) => {
            this.stLstYesNoOptions = data;
        });
        this._OptionService.getstLstReason().subscribe((data) => {
            this.stLstReason = data;
        });
        this._OptionService.getstLstErrorAndWarning().subscribe((data) => {
            this.stLstErrorAndWarning = data;
            this.result = this.stLstErrorAndWarning.Warnings.Components.Charts.find(i => i.ChartId === ChartTypes.WaterlowChart);
            this.ChartName = this.result["ChartName"];
            this._ConstantServices.ActiveMenuName = this.ChartName;
        });

        this.getChartDataById(this.preSelectedChartData.chartMasterId, this.preSelectedChartData.residentAdmissionInfoId, this.pageNumber, this.pageSize);
        this.responsiveOptions = [
            {
                breakpoint: '1199px',
                numVisible: 1,
                numScroll: 1
            },
            {
                breakpoint: '991px',
                numVisible: 2,
                numScroll: 1
            },
            {
                breakpoint: '767px',
                numVisible: 1,
                numScroll: 1
            }
        ];
        const collectionNames = [
            'BMIValueOptions',
            'ContinenceOptions',
            'SkinTypeOptions',
            'MobilityOptions',
            'AgeOptions',
            'MalnutritionScreeningOptions',
            'WeightLossScoreOptions',
            'SpecialRisksTissueOptions',
            'SpecialRisksNeurologicalOptions',
            'SpecialRisksMajorSurgeryOrTraumaOptions',
            'SpecialRisksMedicationOptions'
        ];

        forkJoin(
            collectionNames.map((collectionName) =>
                this.GetChartDropDownMasterList(
                    ChartTypes.WaterlowChart,
                    collectionName,
                    1
                )
            )
        ).subscribe((responses: any[]) => {
            this.LstBMIValue = responses[0];
            this.LstContinence = responses[1];
            this.LstSkinType = responses[2];
            this.LstMobility = responses[3];
            this.LstAge = responses[4];
            this.LstMalnutritionScreening = responses[5];
            this.LstWeightLossScore = responses[6];
            this.LstSpecialRisksTissue = responses[7];
            this.LstSpecialRisksNeurological = responses[8];
            this.LstSpecialRisksMajorSurgeryOrTrauma = responses[9];
            this.LstSpecialRisksMedication = responses[10];
        });

        this.isEditable = this.preSelectedChartData.isEditable;

        if (this.preSelectedChartData.selectedChartID != null) {
            this.WaterlowChartData = <any>{};
            this.GetWaterlowChartDetails(this.preSelectedChartData.selectedChartID);
            this.StatementType = 'Update';
        } else {
            this.ResetModel();
        }

        this.WaterlowChartData.DateAndTime = new Date();
    }

    openAndClose() {
        if (this.WaterlowChartData.CareGivenOptions == "Yes") {
            this.inputFieldsCheck = true;
        } else {
            this.inputFieldsCheck = false;
        }
    }

    addmessages() {

        this.messages = [
            { severity: 'secondary', detail: 'BMI = Weight (kg)/ Height (m)2' }
        ];
    }

    // addmessages1() {
    //     if (this.WaterlowChartData.ContinenceOption == '6682a407ffbbb12c7144f216')
    //         this.messages1 = [
    //             { severity: 'secondary', detail: 'This is when a catheter is inserted into a body cavity usually into the urinary bladder for the withdrawal of urine.' }
    //         ];
    //     else if (this.WaterlowChartData.ContinenceOption == '6682a407ffbbb12c7144f217')
    //         this.messages1 = [
    //             { severity: 'secondary', detail: 'Is the unintentional loss od urine that is sufficient enough is frequency and amount to cause physical and / or emotional distress in the person experiencing it .' }
    //         ];
    //     else if (this.WaterlowChartData.ContinenceOption == '6682a407ffbbb12c7144f218')
    //         this.messages1 = [
    //             { severity: 'secondary', detail: 'Is the inability to control the passage of gass or stools (Faeces) through the anus.' }
    //         ];
    //     else if (this.WaterlowChartData.ContinenceOption == '6682a407ffbbb12c7144f219')
    //         this.messages1 = [
    //             { severity: 'secondary', detail: 'This is a mix of both Urine and faecal incontinence.' }
    //         ];
    // }

    // addmessages2() {
    //     if (this.WaterlowChartData.SkinTypeOption == '6682a407ffbbb12c7144f21a')
    //         this.messages2 = [
    //             { severity: 'secondary', detail: 'Is supple and response well to pressure.' }
    //         ];
    //     else if (this.WaterlowChartData.SkinTypeOption == '6682a407ffbbb12c7144f21b')
    //         this.messages2 = [
    //             { severity: 'secondary', detail: 'Epidermis lacks moisture or sebum, this is often characterized by a patterns of fine lines and itching.' }
    //         ];
    //     else if (this.WaterlowChartData.SkinTypeOption == '6682a407ffbbb12c7144f21c')
    //         this.messages2 = [
    //             { severity: 'secondary', detail: ' Is at risk of cracking and the becoming infected which can then lead to complexity’s such as a pressure sore.' }
    //         ];
    //     else if (this.WaterlowChartData.SkinTypeOption == '6682a407ffbbb12c7144f21d')
    //         this.messages2 = [
    //             { severity: 'secondary', detail: 'The build –up of fluid causes affected tissue to become swollen.' }
    //         ];
    //     else if (this.WaterlowChartData.SkinTypeOption == '6682a407ffbbb12c7144f21e')
    //         this.messages2 = [
    //             { severity: 'secondary', detail: ' Is usually moist to the touch clammy and pale.' }
    //         ];
    //     else if (this.WaterlowChartData.SkinTypeOption == '6682a407ffbbb12c7144f21f')
    //         this.messages2 = [
    //             { severity: 'secondary', detail: 'Can be thought of as existing pressure damage.' }
    //         ];
    //     else if (this.WaterlowChartData.SkinTypeOption == '6682a407ffbbb12c7144f220')
    //         this.messages2 = [
    //             { severity: 'secondary', detail: ' Is already a pressure ulcer, grad 1 skin is broken.' }
    //         ];
    // }

    // addmessages3() {
    //     if (this.WaterlowChartData.MobilityOption == '6682a407ffbbb12c7144f221')
    //         this.messages3 = [
    //             { severity: 'secondary', detail: '100% able to transfer, Walk and reposition themselves.' }
    //         ];
    //     else if (this.WaterlowChartData.MobilityOption == '6682a407ffbbb12c7144f222')
    //         this.messages3 = [
    //             { severity: 'secondary', detail: 'Due to restless nature more likely to induce shear and friction into the skin when sitting or semi recumbent postion.' }
    //         ];
    //     else if (this.WaterlowChartData.MobilityOption == '6682a407ffbbb12c7144f223')
    //         this.messages3 = [
    //             { severity: 'secondary', detail: 'Depressed or sedated who sit/ lays and who will rarely move and not able to relieve vulnerable tissue.' }
    //         ];
    //     else if (this.WaterlowChartData.MobilityOption == '6682a407ffbbb12c7144f224')
    //         this.messages3 = [
    //             { severity: 'secondary', detail: 'May have a chronic disease drainage tubes IV infusion splints etc .' }
    //         ];
    //     else if (this.WaterlowChartData.MobilityOption == '6682a407ffbbb12c7144f225')
    //         this.messages3 = [
    //             { severity: 'secondary', detail: 'Inert through sedation or injury and is unable to move naturally' }
    //         ];
    //     else if (this.WaterlowChartData.MobilityOption == '6682a407ffbbb12c7144f226')
    //         this.messages3 = [
    //             { severity: 'secondary', detail: 'Chair bound with body weight concentrated on a small area of tissue.' }
    //         ];
    // }

    ScoreCalc(check: number) {

        const regex = /\((\d+)\)/;

        if (check == 2) {
            if (this.WaterlowChartData.ContinenceOption == '6682a407ffbbb12c7144f216')
                this.messages1 = [
                    { severity: 'secondary', detail: 'This is when a catheter is inserted into a body cavity usually into the urinary bladder for the withdrawal of urine.' }
                ];
            else if (this.WaterlowChartData.ContinenceOption == '6682a407ffbbb12c7144f217')
                this.messages1 = [
                    { severity: 'secondary', detail: 'Is the unintentional loss od urine that is sufficient enough is frequency and amount to cause physical and / or emotional distress in the person experiencing it .' }
                ];
            else if (this.WaterlowChartData.ContinenceOption == '6682a407ffbbb12c7144f218')
                this.messages1 = [
                    { severity: 'secondary', detail: 'Is the inability to control the passage of gass or stools (Faeces) through the anus.' }
                ];
            else if (this.WaterlowChartData.ContinenceOption == '6682a407ffbbb12c7144f219')
                this.messages1 = [
                    { severity: 'secondary', detail: 'This is a mix of both Urine and faecal incontinence.' }
                ];
        }

        else if (check == 3) {
            if (this.WaterlowChartData.SkinTypeOption == '6682a407ffbbb12c7144f21a')
                this.messages2 = [
                    { severity: 'secondary', detail: 'Is supple and response well to pressure.' }
                ];
            else if (this.WaterlowChartData.SkinTypeOption == '6682a407ffbbb12c7144f21b')
                this.messages2 = [
                    { severity: 'secondary', detail: 'Epidermis lacks moisture or sebum, this is often characterized by a patterns of fine lines and itching.' }
                ];
            else if (this.WaterlowChartData.SkinTypeOption == '6682a407ffbbb12c7144f21c')
                this.messages2 = [
                    { severity: 'secondary', detail: ' Is at risk of cracking and the becoming infected which can then lead to complexity’s such as a pressure sore.' }
                ];
            else if (this.WaterlowChartData.SkinTypeOption == '6682a407ffbbb12c7144f21d')
                this.messages2 = [
                    { severity: 'secondary', detail: 'The build –up of fluid causes affected tissue to become swollen.' }
                ];
            else if (this.WaterlowChartData.SkinTypeOption == '6682a407ffbbb12c7144f21e')
                this.messages2 = [
                    { severity: 'secondary', detail: ' Is usually moist to the touch clammy and pale.' }
                ];
            else if (this.WaterlowChartData.SkinTypeOption == '6682a407ffbbb12c7144f21f')
                this.messages2 = [
                    { severity: 'secondary', detail: 'Can be thought of as existing pressure damage.' }
                ];
            else if (this.WaterlowChartData.SkinTypeOption == '6682a407ffbbb12c7144f220')
                this.messages2 = [
                    { severity: 'secondary', detail: ' Is already a pressure ulcer, grad 1 skin is broken.' }
                ];
        }

        else if (check == 4) {
            if (this.WaterlowChartData.MobilityOption == '6682a407ffbbb12c7144f221')
                this.messages3 = [
                    { severity: 'secondary', detail: '100% able to transfer, Walk and reposition themselves.' }
                ];
            else if (this.WaterlowChartData.MobilityOption == '6682a407ffbbb12c7144f222')
                this.messages3 = [
                    { severity: 'secondary', detail: 'Due to restless nature more likely to induce shear and friction into the skin when sitting or semi recumbent postion.' }
                ];
            else if (this.WaterlowChartData.MobilityOption == '6682a407ffbbb12c7144f223')
                this.messages3 = [
                    { severity: 'secondary', detail: 'Depressed or sedated who sit/ lays and who will rarely move and not able to relieve vulnerable tissue.' }
                ];
            else if (this.WaterlowChartData.MobilityOption == '6682a407ffbbb12c7144f224')
                this.messages3 = [
                    { severity: 'secondary', detail: 'May have a chronic disease drainage tubes IV infusion splints etc .' }
                ];
            else if (this.WaterlowChartData.MobilityOption == '6682a407ffbbb12c7144f225')
                this.messages3 = [
                    { severity: 'secondary', detail: 'Inert through sedation or injury and is unable to move naturally' }
                ];
            else if (this.WaterlowChartData.MobilityOption == '6682a407ffbbb12c7144f226')
                this.messages3 = [
                    { severity: 'secondary', detail: 'Chair bound with body weight concentrated on a small area of tissue.' }
                ];
        }

        // NUTRITION SCORE AND WATERLOW SCORE Calculation code starts here(as Waterlow Score depends upon Nutrition Score also)

        else if (check == 6) {
            if (this.WaterlowChartData.MalnutritionScreeningOption != null) {
                this.messages4 = [
                    { severity: 'secondary', detail: 'Has the resident lost weight recently?' }
                ];
                if (this.WaterlowChartData.MalnutritionScreeningOption == '6682a407ffbbb12c7144f22c') {
                    this.WaterlowChartData.LackOfAppetiteOption = null;
                    this.MalnutritionConfirmCheck = true;
                    this.MalnutritionDeclineCheck = false;
                    this.messages5 = [
                        { severity: 'secondary', detail: "Resident's weight loss" }
                    ];
                    this.messages6 = [];
                }
                else {
                    this.WaterlowChartData.WeightLossScoreOption = null;
                    this.MalnutritionDeclineCheck = true;
                    this.MalnutritionConfirmCheck = false;
                    this.messages6 = [
                        { severity: 'secondary', detail: "Is the patient eating properly?" }
                    ];
                    this.messages5 = [];
                }

                this.WeightLossScoreValue = 0;
                this.LackOfAppetiteValue = 0;
                for (let i = 0; i < this.LstMalnutritionScreening.length; i++) {
                    if (this.LstMalnutritionScreening[i].optionId == this.WaterlowChartData.MalnutritionScreeningOption) {
                        this.MalnutritionScreeningValue = parseInt(regex.exec(this.LstMalnutritionScreening[i].optionName)[1]);
                        // console.log("Malnutrition Screening Value", this.MalnutritionScreeningValue);
                    }
                }
            }
            else {
                this.MalnutritionScreeningValue = 0;
                this.WeightLossScoreValue = 0;
                this.LackOfAppetiteValue = 0;
                this.WaterlowChartData.WeightLossScoreOption = null;
                this.WaterlowChartData.LackOfAppetiteOption = 0;
                this.MalnutritionDeclineCheck = false;
                this.MalnutritionConfirmCheck = false;
            }
        }

        else if (check == 7) {
            this.LackOfAppetiteValue = 0;
            if(this.WaterlowChartData.WeightLossScoreOption != null) {
            for (let i = 0; i < this.LstWeightLossScore.length; i++) {
                if (this.LstWeightLossScore[i].optionId == this.WaterlowChartData.WeightLossScoreOption) {
                    this.WeightLossScoreValue = parseInt(regex.exec(this.LstWeightLossScore[i].optionName)[1]);
                    // console.log("Weight Loss Score Value",this.WeightLossScoreValue);
                }
            }
        }
        else {
            this.WeightLossScoreValue = 0;
        }
        }
        else if (check == 8) {
            this.WeightLossScoreValue = 0;
            if(this.WaterlowChartData.LackOfAppetiteOption != null) {
            for (let i = 0; i < this.LstLackOfAppetite.length; i++) {
                if (this.LstLackOfAppetite[i].label == this.WaterlowChartData.LackOfAppetiteOption) {
                    this.LackOfAppetiteValue = parseInt(regex.exec(this.LstLackOfAppetite[i].label)[1]);
                    // console.log("LackOfAppetiteValue",this.LackOfAppetiteValue);
                }
            }
        }
        else {
            this.LackOfAppetiteValue = 0;
        }
        }
        
        //NUTRITION SCORE Calculation code ends here
        
        else if (check == 1) {
            if (this.WaterlowChartData.BMIValueOption != null) {
                for (let i = 0; i < this.LstBMIValue.length; i++) {
                    if (this.LstBMIValue[i].optionId == this.WaterlowChartData.BMIValueOption) {
                        this.BMIValue = parseInt(regex.exec(this.LstBMIValue[i].optionName)[1]);
                        // console.log("BMIValue", this.BMIValue);
                    }
                }
            }
            else {
                this.BMIValue = 0;
            }
        }


        else if (check == 2) {
            if (this.WaterlowChartData.ContinenceOption != null) {
                for (let i = 0; i < this.LstContinence.length; i++) {
                    if (this.LstContinence[i].optionId == this.WaterlowChartData.ContinenceOption) {
                        this.ContinenceValue = parseInt(regex.exec(this.LstContinence[i].optionName)[1]);
                        // console.log("ContinenceValue", this.ContinenceValue);

                    }
                }
            }
            else {
                this.ContinenceValue = 0;
            }
        }

        else if (check == 3) {
            if (this.WaterlowChartData.SkinTypeOption != null) {
                for (let i = 0; i < this.LstSkinType.length; i++) {
                    if (this.LstSkinType[i].optionId == this.WaterlowChartData.SkinTypeOption) {
                        this.SkinTypeValue = parseInt(regex.exec(this.LstSkinType[i].optionName)[1]);
                        // console.log("SkinTypeValue", this.SkinTypeValue);

                    }
                }
            }
            else {
                this.SkinTypeValue = 0;
            }
        }

        else if (check == 4) {
            if (this.WaterlowChartData.MobilityOption != null) {
                for (let i = 0; i < this.LstMobility.length; i++) {
                    if (this.LstMobility[i].optionId == this.WaterlowChartData.MobilityOption) {
                        this.MobilityValue = parseInt(regex.exec(this.LstMobility[i].optionName)[1]);
                        // console.log("MobilityValue", this.MobilityValue);

                    }
                }
            }
            else {
                this.MobilityValue = 0;
            }
        }

        else if (check == 0) {

            if (this.WaterlowChartData.Gender == "Male") {
                this.GenderValue = 1;
            }
            else if (this.WaterlowChartData.Gender = "Female") {
                this.GenderValue = 2;
            }
            // console.log("GenderValue", this.GenderValue);
        }

        else if (check == 5) {
            if (this.WaterlowChartData.AgeOption != null) {
                for (let i = 0; i < this.LstAge.length; i++) {
                    if (this.LstAge[i].optionId == this.WaterlowChartData.AgeOption) {
                        this.AgeValue = parseInt(regex.exec(this.LstAge[i].optionName)[1]);
                        // console.log("AgeValue", this.AgeValue);

                    }
                }
            }
            else {
                this.AgeValue = 0;
            }
        }

        else if (check == 9) {
            if(this.WaterlowChartData.SpecialRisksTissueOption != null) {
            for (let i = 0; i < this.LstSpecialRisksTissue.length; i++) {
                if (this.LstSpecialRisksTissue[i].optionId == this.WaterlowChartData.SpecialRisksTissueOption) {
                    this.SpecialRisksTissueValue = parseInt(regex.exec(this.LstSpecialRisksTissue[i].optionName)[1]);
                    // console.log("SpecialRisksTissueValue", this.SpecialRisksTissueValue);

                }
            }
        }
            else {
                this.SpecialRisksTissueValue = 0;
            }
        }

        else if (check == 10) {
            if (this.WaterlowChartData.SpecialRisksNeurologicalOption != null) {
                this.ScoreDropdownCheck = true;
                this.messages8 = [
                    { severity: 'secondary', detail: "Using clinical judgement, please self – score accordingly within the range 4-6 if applicable, if  not please skip!" }
                ];

                if (this.WaterlowChartData.ScoreOption != null) {
                    this.SpecialRisksNeurologicalValue = parseInt(this.WaterlowChartData.ScoreOption);
                }
                else {
                    this.SpecialRisksNeurologicalValue = 0;
                }
            }
            else {
                this.messages8 = [];
                this.ScoreDropdownCheck = false;
                this.SpecialRisksNeurologicalValue = 0;
                this.WaterlowChartData.ScoreOption = null;
            }
        }

        else if (check == 11) {
            if(this.WaterlowChartData.SpecialRisksMajorSurgeryOrTraumaOption != null) {
            for (let i = 0; i < this.LstSpecialRisksMajorSurgeryOrTrauma.length; i++) {
                if (this.LstSpecialRisksMajorSurgeryOrTrauma[i].optionId == this.WaterlowChartData.SpecialRisksMajorSurgeryOrTraumaOption) {
                    this.SpecialRisksSurgeryValue = parseInt(regex.exec(this.LstSpecialRisksMajorSurgeryOrTrauma[i].optionName)[1]);
                    // console.log("SpecialRisksSurgeryValue", this.SpecialRisksSurgeryValue);

                }
            }
        }
        else {
            this.SpecialRisksSurgeryValue = 0;
        }
        }

        else if (check == 12) {
            if (this.WaterlowChartData.SpecialRisksMedicationOption.length != 0) {
                this.MedicationValueCheck = true;
                if (this.WaterlowChartData.SpecialRisksMedicationScoreOption != null) {
                    this.SpecialRisksMedicationScoreValue = parseInt(this.WaterlowChartData.SpecialRisksMedicationScoreOption);
                }
                else {
                    this.SpecialRisksMedicationScoreValue = 0;
                }
            }
            else {
                this.MedicationValueCheck = false;
                this.SpecialRisksMedicationScoreValue = 0;
                this.WaterlowChartData.SpecialRisksMedicationScoreOption = null;
            }
        }

        this.NutritionScoreValue = this.MalnutritionScreeningValue + this.WeightLossScoreValue + this.LackOfAppetiteValue;  // Here is the final calculation of NUTRITION SCORE calculated
        this.WaterlowScoreValue = this.BMIValue + this.ContinenceValue + this.SkinTypeValue + this.MobilityValue + this.GenderValue + this.AgeValue + this.NutritionScoreValue + this.SpecialRisksTissueValue + this.SpecialRisksNeurologicalValue + this.SpecialRisksSurgeryValue + this.SpecialRisksMedicationScoreValue;

        //WATERLOW SCORE Calculation code ends here

        if (this.WaterlowScoreValue >= 10 && this.WaterlowScoreValue <= 14) {
            this.ClassificationValue = 'At Risk';
        }
        else if (this.WaterlowScoreValue >= 15 && this.WaterlowScoreValue <= 19) {
            this.ClassificationValue = 'High Risk'
        }
        else if (this.WaterlowScoreValue >= 20) {
            this.ClassificationValue = 'Very High Risk';
        }
        //Nutrition Score Calculation code ends here
    }

    // ScoreCheck() {
    //     if (this.WaterlowChartData.SpecialRisksNeurologicalOption != null) {
    //         this.ScoreDropdownCheck = true;
    //         this.messages8 = [
    //             { severity: 'secondary', detail: "Using clinical judgement, please self – score accordingly within the range 4-6 if applicable, if  not please skip!" }
    //         ];
    //     }
    //     else {
    //         this.messages8 = [];
    //         this.ScoreDropdownCheck = false;
    //     }
    // }

    // MedicationCheck() {
    //     if (this.WaterlowChartData.SpecialRisksMedicationOption.length != 0) {
    //         this.MedicationValueCheck = true;
    //     }
    //     else {
    //         this.MedicationValueCheck = false;
    //     }
    // }

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

    GetWaterlowChartDetails(chartId: string) {
        this._UtilityService.showSpinner();
        this.unsubscribe.add = this._WaterlowService
            .GetWaterlowChartDetails(chartId)
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                        var tdata = JSON.parse(data.actionResult.result);
                        tdata = tdata ? tdata : {};
                        this.WaterlowChartData = tdata;
                        this.openAndClose();
                        this.WaterlowChartData.DateAndTime = this._DatePipe.transform(
                            this.WaterlowChartData.DateAndTime,
                            'dd-MM-yyyy HH:mm'
                        );
                    } else {
                        this.WaterlowChartData = {};
                    }
                },
                error: (e) => {
                    this._UtilityService.hideSpinner();
                    this._UtilityService.showErrorAlert(e.message);
                },
            });
    }

    ClearAllfeilds() {
        if (this.preSelectedChartData.selectedChartID) {
            this.WaterlowChartData = <any>{};
            this.WaterlowChartData.activitiesChartId =
                this.preSelectedChartData.selectedChartID;
        }
    }

    Save() {
        if (this.WaterlowChartData.CareGivenOptions == null) {
            this.CareGivenCheck = true;
        }
        else if (this.WaterlowChartData.CareGivenOptions != null) {
            this.CareGivenCheck = false;
            if (this.WaterlowChartData.CareGivenOptions == 'Yes') {
                this.ReasonCheck = false;
            }
            else {
                if (this.WaterlowChartData.Reason == null) {
                    this.ReasonCheck = true;
                }
                else {
                    this.ReasonCheck = false;
                }
            }
        }
        if (
            this.userId != null &&
            this.residentAdmissionInfoId != null &&
            this.loginId != null && this.CareGivenCheck == false && this.ReasonCheck == false
        ) {
            this.WaterlowChartData.userId = this.userId;
            this.WaterlowChartData.residentAdmissionInfoId =
                this.residentAdmissionInfoId;
            this.WaterlowChartData.StartedBy = this.loginId;
            this.WaterlowChartData.LastEnteredBy = this.loginId;

            if (this.WaterlowChartData.DateAndTime) {
                if (
                    this.StatementType == 'Update' &&
                    typeof this.WaterlowChartData.DateAndTime === 'string'
                ) {
                    //Pare dateTime
                    const dateParts =
                        this.WaterlowChartData.DateAndTime.split(/[- :]/);
                    const parsedDate = new Date(
                        +dateParts[2],
                        dateParts[1] - 1,
                        +dateParts[0],
                        +dateParts[3],
                        +dateParts[4]
                    );
                    this.WaterlowChartData.DateAndTime = parsedDate;
                }
                this.WaterlowChartData.DateAndTime =
                    this._DatePipe.transform(
                        this.WaterlowChartData.DateAndTime,
                        'yyyy-MM-ddTHH:mm'
                    );
            }
            if (this.WaterlowChartData.NeurologicalOption != null) {
                this.WaterlowChartData.ScoreOption = parseInt(this.WaterlowChartData.ScoreOption);
            }
            if (this.WaterlowChartData.SpecialRisksMedicationOption != null && this.WaterlowChartData.SpecialRisksMedicationScoreOption != null) {
                this.WaterlowChartData.SpecialRisksMedicationScoreOption = parseInt(this.WaterlowChartData.SpecialRisksMedicationScoreOption);
            }

            const objectBody: any = {
                StatementType: this.StatementType,
                WaterlowChartDetail: this.WaterlowChartData,
            };
            console.log("Saved Data", this.WaterlowChartData);


            this._UtilityService.showSpinner();
            this.unsubscribe.add = this._WaterlowService
                .InsertUpdateWaterlowChart(objectBody)
                .subscribe({
                    next: (data) => {
                        this._UtilityService.hideSpinner();
                        if (data.actionResult.success == true) {
                            this.EmitUpdateForm.emit(true);
                            //   this.ResetModel();
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
            this._UtilityService.showWarningAlert(
                this.ChartName + " " + this.stLstErrorAndWarning.Warnings.Common.DetailMissMessage
            );
        }
    }

    ResetModel() {
        this.isEditable = true;
        this.WaterlowChartData = <any>{};
        this.StatementType = 'Insert';
    }

    SaveAsPDF() { }

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
                        this.WaterlowChartsLst = tdata;
                        console.log("WaterLow Data", this.WaterlowChartsLst);
                        if (this.WaterlowChartsLst.length < 3 || (((this.WaterlowChartsLst.length) * (this.pageNumber + 1)) >= this.WaterlowChartsLst[0].countRecords)) {
                            this.rightBtnCheck = true;
                        }
                        else {
                            this.rightBtnCheck = false;
                        }
                    } else {
                        this.WaterlowChartsLst = [];
                    }
                },
                error: (e) => {
                    this._UtilityService.hideSpinner();
                    this._UtilityService.showErrorAlert(e.message);
                },
            });
    }

    showPopup(chartId) {
        this.StrikeThroughData = {
            ChartMasterId: ChartTypes.WaterlowChart,
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
