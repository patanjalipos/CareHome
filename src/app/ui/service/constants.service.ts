import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ConstantsService {
    constructor() {}
    public IsLocal: boolean = false;
    public IsShowNavBar: boolean = true;
    public ActiveMenuName: string = '';

    GetParmasVal(paramsstr) {
        let ParamsArray: any[] = [];
        if (paramsstr != null && paramsstr != undefined) {
            var result = decodeURIComponent(atob(paramsstr));
            var NewCellData = result.split('&');
            if (NewCellData?.length > 0) {
                NewCellData.map((e) => {
                    ParamsArray.push({
                        FieldStr: e.split('=')[0],
                        FieldVal: e.split('=')[1],
                    });
                });
            }
        }
        return ParamsArray;
    }
}

export enum UserTypes {
    SuperAdmin = '611b6d811003138c9d40a8b7',
    Admin = '607546c500f6f4c43c5d54a0',
    Resident = '6075474600f6f4c43c5d54a1',
    // Doctor = "6075479300f6f4c43c5d54a2",
    // Therapist = "60e5582069bec5646f115686",
    // Meditation = "60ed26557f6bda738e03c049",
    // Patient = "6075474600f6f4c43c5d54a1",
    // Pathologist = "60ee67c8b43250ad3a1d362d",
    // Cafeteria = "60e5597069bec5646f115688",
    // GuestServiceAgent = "6253e3b1eea1dbcb7aae98a1",
    // AdminDeo = "62678ac614091e1beade98e6",
    // Finance="6331db25d3c986311dff200c",
    // Billing="6396f00addc59e9aac93b137"
}

export enum ChartTypes {
    ActivitiesChart = '65b8e9b70d77d0a4c616b8e2',
    ADLChart = '6642f13bb33c8394db706069',
    BehaviourChart = '6642f15db33c8394db70606a',
    BloodGlucoseChart = '6642f174b33c8394db70606b',
    BloodPressureChart = '6642f195b33c8394db70606c',
    BowelChart = '6642f1adb33c8394db70606d',
    EnteralFeedingChart = '6642f1cbb33c8394db70606e',
    FluidCombinedChart = '6642f1deb33c8394db70606f',
    FluidIntakeChart = '6642f1f2b33c8394db706070',
    FluidOutputChart = '6642f229b33c8394db706071',
    FoodIntakeChart = '6642f241b33c8394db706072',
    GlasgowComaScaleChart = '6642f258b33c8394db706073',
    InfectionChart = '6642f26cb33c8394db706074',
    MUSTChart = '6642f27eb33c8394db706075',
    NEWS2Chart = '6642f29cb33c8394db706076',
    PainChart = '6642f2dfb33c8394db706077',
    PainChekChart = '6642f2fbb33c8394db706078',
    RepositioningChart = '6642f32cb33c8394db706079',
    RestraintChart = '6642f346b33c8394db70607a',
    SeizureChart = '6642f367b33c8394db70607b',
    SightingChart = '6642f385b33c8394db70607d',
    UrinaryChart = '6642f3a7b33c8394db70607e',
    VitalSignsChart = '6642f3d7b33c8394db70607f',
    WaterlowChart = '6642f3ebb33c8394db706080',
    WeightChart = '6642f401b33c8394db706081',
    WoundChart = '6642f414b33c8394db706082',
}

export enum FormTypes {
    PreAdmission = '65e6db2de37632e29ad778ba',
    AccidentIncident = '65e6db54e37632e29ad778bb',
    AcuteCarePlan = '65e6db61e37632e29ad778bc',
    BloodTestRecord = '65e950b1ef1f6e9ecaf7dbeb',
    BodyMappingRecord = '65eee25b34399c226ce7c84c',
    CareAssessmentBreathing = '65f7bf9db44c935375edd8ff',
    CareAssessmentContinence = '660cddb2f05fe3604a126e48',
    CareAssessmentEats = '660cde176532ff5562029d72',
    CareAssessmentFeeling = '660cde286532ff5562029d73',
    FamilyCommunication = '65eee23e34399c226ce7c84b',
    CareAssessmentPersonal = '660cffe0f05fe3604a126e49',
    ConnectingandCommunicating = '660d0017f05fe3604a126e4a',
    GPDoctorVisitCommunicationRecord = '660d003bf05fe3604a126e4b',
    ProfessionalVisitCommunicationRecord = '660d0079f05fe3604a126e4c',
    RiskAssessmentPhysical = '660d009bf05fe3604a126e4d',
    RiskAssessmentWaterlow = '660d00d3f05fe3604a126e4e',
    CareAssessmentHearing = '660e7020f05fe3604a126e50',
    CareAssessmentMental = '660e70f4f05fe3604a126e51',
    CareAssessmentSleep = '660e711df05fe3604a126e52',
    Deliriumrisk = '660e7146f05fe3604a126e53',
    RiskAssessmentOntheMove = '660e7159f05fe3604a126e54',
    OralHealthRiskAssessment = '660e7168f05fe3604a126e55',
    CareAssessmentforVitaminD = '660e7185f05fe3604a126e56',
    MUSTStep5NutritionalManagement = '660e719cf05fe3604a126e57',
    CareAssessmentSpeech = '660e80bdf05fe3604a126e58',
    CovidAcuteCarePlan = '66151024f05fe3604a126e5d',
    DentistVisitCommunication = '66151002f05fe3604a126e5c',
    DistrictNurseVisit = '66150fa9f05fe3604a126e59',
    FASTStrokeAssessment = '66151037f05fe3604a126e5e',
    HealthCareSupport = '66151067f05fe3604a126e60',
    HomemangersSetting = '66151097f05fe3604a126e61',
    PromotingWellbeing = '66150febf05fe3604a126e5b',
    RiskToolBedRails = '66150fc3f05fe3604a126e5a',
    SepsisScreening = '66151055f05fe3604a126e5f',
    RecordOfProperty = '661cb2e0eb74cdce58be9a9f',
    RespiratoryScreening = '661cb2f4eb74cdce58be9aa0',
    CareAssessmentMyEpilepsySupport = '661cb309eb74cdce58be9aa1',
    CareAssessmentRESPECT = '661cb31beb74cdce58be9aa2',
    CareAssessmentDietaryNotification = '661cb33eeb74cdce58be9aa3',
    CareAssessmentLifeHistory = '661cb361eb74cdce58be9aa4',
    CareAssessmentTrialWith = '661cb388eb74cdce58be9aa5',
    PositiveBehaviour = '661cb39ceb74cdce58be9aa6',
    ThePoolActivityLevel = '661cb3aeeb74cdce58be9aa7',
    caresignsofill = '661e4abfeb74cdce58be9aa8',
    recordofdecision = '661e4acdeb74cdce58be9aa9',
    risktoolsafe = '661e4adfeb74cdce58be9aaa',
    incidentnearmiss = '661e4af0eb74cdce58be9aab',
    medicationincident = '661e4b63eb74cdce58be9aac',
    hazardsrisks = '661e4b74eb74cdce58be9aad',
    HerbertprotocolMissing = '661e4b93eb74cdce58be9aae',
    OutingsRiskAssessment = '661e4ba5eb74cdce58be9aaf',
    SmokingRiskAssessment = '661e4bbeeb74cdce58be9ab0',
    CarePlanReview = '661e4c02eb74cdce58be9ab1',
    consentform = '6620a35aeb74cdce58be9ab2',
    covidvaccination = '6620a366eb74cdce58be9ab3',
    respitecaresupport = '6620a373eb74cdce58be9ab4',
    careresidentcontact = '6620a380eb74cdce58be9ab5',
    carevision = '6620a38eeb74cdce58be9ab6',
    riskmultifatorialfalls = '6620a39feb74cdce58be9ab7',
    careskinassessment = '6620a3adeb74cdce58be9ab8',
    careoralanddental = '6620a3b9eb74cdce58be9ab9',
    carewisheshforfuture = '6620a3c6eb74cdce58be9aba',
    carebehaviourassesment = '6620a3d3eb74cdce58be9abb',
    risktoolforuseof = '6620a3f4eb74cdce58be9abc',
    positiveBehaviourSupport = '661cb39ceb74cdce58be9aa6',
    smokingRiskAssessment = '661e4bbeeb74cdce58be9ab0',
}

export enum AdmissionStatus {
    Unallocated = 0,
    Active = 1,
    Deceased = 2,
    Discharged = 3,
    Transferred = 4,
    WaitListed = 5,
    Suspended = 6,
}

export enum TaskPlannerStatus {
    Open = 1,
    InProgress = 2,
    Done = 3,
}

export enum ActionItem {
    Read = 1,
    ReadWrite = 2,
    Delete = 3,
    Download = 4,
    Print = 5,
    Cancel = 6,
}

export enum OtherActionAccess {
    IsDoctorLogs = 1,
    IsOtherRoomCatChange = 2,
    IsSuspended = 3,
}

export enum CustomDateFormat {
    DEF_DATE = 'dd-MM-yyyy',
    DEF_DATE_TIME = 'dd-MM-yyyy HH:mm',
    DEF_DATE_TIME_AMPM = 'dd-MM-yyyy HH:mm a',
    CalendarFormat = 'dd-mm-yy',
    TIME = 'HH:mm',
}
