import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponentBase } from 'src/app/app-component-base';
import {
    ConstantsService,
    CustomDateFormat,
} from 'src/app/ui/service/constants.service';
import { DataService } from 'src/app/ui/service/data-service.service';
import { MasterService } from 'src/app/ui/service/master.service';
import { UtilityService } from 'src/app/utility/utility.service';

@Component({
    selector: 'app-pre-admission-assessment-forms',
    templateUrl: './pre-admission-assessment-forms.component.html',
    styleUrls: ['./pre-admission-assessment-forms.component.scss'],
})
export class PreAdmissionAssessmentFormsComponent
    extends AppComponentBase
    implements OnInit
{
    customDateFormat = CustomDateFormat;

    //Refresh the search list on the form dashboard
    
    PreAdmissionAssessmentFormsData: any = <any>{};

    isEditable: boolean; //Need to be passed from form Dashboard
    StatementType: string = null;

    //Patient Details
    userId: any;
    residentAdmissionInfoId: any;
    //CreatedBy or ModifiedBy
    loginId: any;
    @Input() preSelectedFormData: any=<any>{};
    @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        private _ConstantServices: ConstantsService,
        private route: ActivatedRoute,
        private _MasterServices: MasterService,
        private _UtilityService: UtilityService,
        private _DataService: DataService
    ) {
        super();
        this._ConstantServices.ActiveMenuName = 'Pre Assessment Admission Form';
        this.loginId = localStorage.getItem('userId'); //'6368fd74757dbcfdbbb1ce4c';

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

    ngOnInit(): void {
        // this._DataService.data$.subscribe((data) => {
        //     this.preSelectedFormData = data;
        // });

        this.isEditable = this.preSelectedFormData.isEditable;

        if (this.preSelectedFormData.selectedFormID != null) {
            this.PreAdmissionAssessmentFormsData = <any>{};
            this.GetPreAdmissionFormDetails(
                this.preSelectedFormData.selectedFormID
            );

            this.StatementType = 'Update';
        } else {
            this.ResetModel();
        }
    }
    ngOnChanges(changes: SimpleChanges): void {
        this.isEditable = this.preSelectedFormData.isEditable;
    
      if (this.preSelectedFormData.selectedFormID != null) {
          this.PreAdmissionAssessmentFormsData = <any>{};
          this.GetPreAdmissionFormDetails(
              this.preSelectedFormData.selectedFormID
          );
    
          this.StatementType = 'Update';
      } else {
          this.ResetModel();
      }
      }

    GetPreAdmissionFormDetails(formId: string) {
        this._UtilityService.showSpinner();
        this.unsubscribe.add = this._MasterServices
            .GetPreAdmissionFormDetails(formId)
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                        var tdata = JSON.parse(data.actionResult.result);
                        tdata = tdata ? tdata : {};
                        this.PreAdmissionAssessmentFormsData = tdata;
                        //console.log(this.PreAdmissionAssessmentFormsData);
                    } else {
                        this.PreAdmissionAssessmentFormsData = {};
                    }
                },
                error: (e) => {
                    this._UtilityService.hideSpinner();
                    this._UtilityService.showErrorAlert(e.message);
                },
            });
    }

    saveAsUnfinished() {
        this.PreAdmissionAssessmentFormsData.isFormCompleted = false;
        this.Save();
    }

    completeForm() {
        this.PreAdmissionAssessmentFormsData.isFormCompleted = true;
        this.Save();
    }

    Save() {
        if (
            this.userId != null &&
            this.residentAdmissionInfoId != null &&
            this.loginId != null
        ) {
            this.PreAdmissionAssessmentFormsData.userId = this.userId;
            this.PreAdmissionAssessmentFormsData.residentAdmissionInfoId = this.residentAdmissionInfoId;
            this.PreAdmissionAssessmentFormsData.StartedBy = this.loginId;
            this.PreAdmissionAssessmentFormsData.LastEnteredBy = this.loginId;

            const objectBody: any = {
                StatementType: this.StatementType,
                preAdmissionForm: this.PreAdmissionAssessmentFormsData,
            };
            this._UtilityService.showSpinner();
            this.unsubscribe.add = this._MasterServices
                .AddInsertUpdatePreAdmissionAssessmentForm(objectBody)
                .subscribe({
                    next: (data) => {
                        this._UtilityService.hideSpinner();
                        if (data.actionResult.success == true)
                        {
                            this.EmitUpdateForm.emit(true);
                            this._UtilityService.showSuccessAlert(
                                data.actionResult.errMsg
                            );
                        }
                        else
                            this._UtilityService.showWarningAlert(
                                data.actionResult.errMsg
                            );
                    },
                    error: (e) => {
                        this._UtilityService.hideSpinner();
                        this._UtilityService.showErrorAlert(e.message);
                    },
                });
                //this.ResetModel();
        } else {
            this._UtilityService.showWarningAlert(
                'Resident admission details are missing.'
            );
        }
    }

    SaveAsPDF() {}

    ResetModel() {
        this.isEditable = true;
        this.PreAdmissionAssessmentFormsData = <any>{};
        this.StatementType = 'Insert';
    }

    personCapacityOptions: string[] = [
        'The resident is assumed to have capacity to consent to care and accommodation',
        'The resident does not have capacity to consent to care and accommodation',
        'The resident has a welfare Power of Attorney or Welfare Guardian who is making the decision for them due to their lack of mental capacity to make decisions with regards to their care and accommodation',
        'The resident is being moved under Adults with Incapacity Act Section 13ZA',
        'The resident does not have mental capacity however has been consulted in relation to their future care and accommodation and their response has been taken into account',
        'Other',
    ];

    professionalDocObtainedOptions: string[] = [
        'No professional documentation has been obtained for the resident',
        'The resident has an AWI already completed and a copy has been obtained',
        'The resident has an AWI already completed but a copy has not been obtained',
        'The resident has appointed a Power of Attorney, and a copy has been obtained',
        'The resident has appointed a Power of Attorney, and a copy has not been obtained',
        'The resident has a Legal Guardian and a copy has been obtained',
        'The resident has a Legal Guardian and a copy has not been obtained',
        'The resident is being admitted under a community Treatment order and a copy has been obtained',
        'Other',
    ];

    residentMovingOptions: string[] = [
        'Home',
        'Another Care Home',
        'Hospital',
        'Other',
    ];

    paymentOptionsn: string[] = [
        'Private (Financial Assessment from must be completed)',
        'LA / CCG',
        '3rd Party Contribution /Top Up',
    ];

    peronsCurrentAbilitiesOptions: string[] = [
        'The resident is able-bodied and continues to use these abilities in their everyday life',
        'The resident is able to complete simple physical tasks and should be encouraged and enabled to continue to develop these further',
        'The resident has rehabilitation potential and as such should have a rehab program in place to promote abilities',
        'The resident has limited physical abilities but has the capacity to be as involved in their lives as possible',
        'The resident has limited physical abilities and does not have the mental capacity to make informed choices and/or decisions however will be enabled to be included in every aspect of their lives',
        'Other',
    ];

    advancedCarePlanningOptions: string[] = [
        'The resident has a DNAR / DNACPR in place',
        'The resident does not have a DNAR / DNACPR in place',
        'The resident has a Treatment escalation plan in place',
        'The resident does not have Treatment escalation plan in place',
        'The resident has a living will in place and the GP has been informed',
        'The resident has a living will in place and the GP has not been informed',
        'The resident does not have a living will in place',
        'The resident has an AWI in place',
        'The resident does not have an AWI in place',
        'The resident is for full escalation to hospital for investigations and treatments',
        'The resident is not for escalation to hospital but for non invasive treatment in the Care Home',
    ];

    medicalHistoryConditionOptions: string[] = [
        'The resident has a past medical history of unspecified Dementia',
        'The resident has a diagnosis of Vascular Dementia  Vascular dementia is caused by problems in the blood supply to the brain due to damaged or diseased blood vessels, a stroke, or mini strokes called transient ischaemic attacks (TIAS).',
        'The resident has a diagnosis of Frontotemporal dementia (FTD) is an umbrella term for a group of dementias that mainly affect the frontal and temporal lobes of the brain, which are responsible for personality, behaviour, language and speech.',
        'The resident has a diagnosis of Alzheimers Disease. It is caused by a build-up of proteins in the brain which affect how the brain cells transmit messages. As time passes, more and more brain cells are damaged, leading to worsening symptoms.',
        "The resident has a diagnosis of Huntington's disease",
        "Huntington's Disease is primarily thought of as a condition of motor function - that is, it affects the person's movement. But there can be damage to the brain which can develop into dementia.",
        'The resident has a diagnosis of Lewy body dementia',
        'Dementia with Lewy bodies - changes in thinking, visual perception (cognitive symptoms) and sleep may be experienced first and difficulty with movement (Parkinsonian symptoms) - occur at the same time or later',
        "The resident has a diagnosis of Parkinson's",
        "Parkinson's is a condition in which a part of the brain called the substantia nigra loses nerve cells. This loss of nerve cells results in a reduction of a substance called dopamine which is important for the regulation of movement of the body.",
        'The resident has a diagnosis of Diabetes Type I - meaning the residents body is unable to make any of the hormone called insulin.',
        'The resident has a diagnosis of Cardiovascular disease- Cardiovascular disease (CVD) is a general term for conditions affecting the heart or blood vessels.',
        'The resident has a diagnosis of Diabetes Type II - It is high blood sugar levels due to your body not making enough of a hormone called insulin, or what it makes not working properly.',
        'The resident has a PMH of Myocardial infarction (Heart Attack)',
        'The resident has a PMH of a Cardiovascular attach (Stroke) - Cerebrovascular accident (CVA) is the medical term for a stroke. A stroke is when blood flow to a part of your brain is stopped either by a blockage or the rupture of a blood vessel.',
        'The resident has a PMH of Transient Ischemic Attacks (TIA/Mini strokes) - A transient ischaemic attack (TIA) or "mini stroke" is caused by a temporary disruption in the blood supply to part of the brain',
        'The resident has a PMH depression',
        'The resident has a PMH of Anxiety',
        'The resident has a confirmed diagnosis of Schizophrenia - Schizophrenia is a complicated mental health problem related to psychosis.',
        'The resident has a diagnosis of Schizophrenia which is a complicated mental health problem related to psychosis',
        'The resident has a PMH of Delirium',
        'The resident has a PMH of Psychosis',
        'The resident has a diagnosis of a underlying learning disability',
        'The resident has a diagnosis of Bipolar disorder - Bipolar disorder is a mental health problem that mainly affects the residents ood.',
        'The reisdent has been diagnosed with a Borderline Personality Disorder',
        'The resident diagnosed with a personality disorder had difficulties with how they think and feel about themselves and other people. And these difficulties made it hard to cope day to day.',
        'The resident has a diagnosis of Obsessive compulsive disorder - Obsessive-compulsive disorder (OCD) is a mental health problem. It has two main parts that are connected, obsessions and compulsions.',
        'The resident has a diagnosis of Post Traumatic Stress Disorder - Post-traumatic stress disorder (PTSD) is a mental health problem you may develop after experiencing traumatic events.',
        'The resident has a history of self harm',
        'The resident has a history of stress and distress requiring positive behaviour support from those around them.',
        'The resident has a history of Falls.',
        'The resident has a history of recurring Urinary Tract Infections',
        'The resident has a history of urinary retention.',
        'The resident has a history of Pressure Ulcers.',
        'The resident has a history of skin tears.',
        'The resident has a history of blood clots.',
        'The resident has a history of COVID.',
        'The resident has a history of urinary retention.',
        'The resident has a history of sight impairment.',
        'The resident has a history of hearing impairment.',
        'The resident has a history of taste impairment.',
        'The resident has a history of swallowing impairment.',
        'The resident has a history of Prostate Cancer.',
        'The resident has a history of Breast Cancer',
        'The resident has a diagnosis of Chronic Obstructive Pulmonary Disease (COPD)',
        'Chronic obstructive pulmonary disease (COPD) is where air cannot get out of the lungs easily (the airflow is obstructed).',
        'The resident has a history of Bowel Cancer',
        'The resident has a history of Arthritis - Arthritis is a common condition that causes pain and inflammation in a joint.',
        'The resident has a history of Rheumatoid Arthritis.',
        'Rheumatoid arthritis is an autoimmune disease. This means your immune system (which usually fights infection) attacks the cells that line your joints by mistake, making the joints swollen, stiff and painful.',
        'Other',
    ];

    connectingAndCommunicatingOptions: string[] = [
        "The resident's preferred language is English",
        "The resident's preferred language is Welsh ",
        'The resident preferred language is Gaelic ',
        'The resident requires a translator ',
        "The resident's family / friends will translate for them ",
        'The resident preferred method of communication is verbal ',
        "The resident's preferred method of communication is lip reading ",
        "The resident's preferred method of communication is sign language",
        "The resident's preferred method of communication is picture cards",
        "The resident's preferred method of communication is through body language",
        'The resident can understand others ',
        'The resident is not able to understand others ',
        'The resident can verbally make themselves understood ',
        'The resident is not able to verbally make themselves understood ',
        'The resident has short term memory loss ',
        'The resident can remember past events ',
        'The resident has a diagnosis of a cognitive impairment which can impact their communication ',
        'The resident is comfortable with appropriate touch as part of building a connection and communicating ',
        'The resident requires people to communicate when looking at them ',
        'The resident requires staff to use closed questions and short statements to promote their inclusion and understanding ',
        'Other ',
    ];

    personalSafetyOptions: string[] = [
        'The resident is able and safe to go out by themselves',
        'The resident is not able or safe to go out by themselves and could be at risk of leaving the home unnoticed',
        'The resident has a history of leaving home / previous care setting by themselves (at risk of leaving the home unnoticed) ',
        'The resident has no history leaving home / previous care setting by themselves ',
        'The resident has a personal buddy system in place when out in the community ',
        'The resident does not have a personal buddy system in place when out in the community (this puts them at risk) ',
        'The resident has previously been at risk in the community without support (at risk) ',
        'The resident is at risk of leaving the home unnoticed ',
        'The resident is not at risk of leaving the home unnoticed ',
        'Other ',
    ];

    residentExpAnyMHConditionsOptions: string[] = [
        'The resident does not experience any mental health conditions',
        'The resident has a history of depression',
        'The resident experiences anxiety',
        'The resident experiences heightened levels of stress',
        'The resident has a diagnosis of a personality disorder',
        "The resident's condition has been diagnosed by a GP",
        'Medication has been prescribed',
        'The resident is under the care of the local mental health team',
        "The resident's mental health condition significantly impacts their sense of well-being",
        "The resident's mental health condition has minimal impact on the resident's sense of well-being",
        'Other',
    ];

    speechSightHearingOptions: string[] = [
        'The resident has full hearing (no hearing impairments)',
        'The resident is hearing impaired',
        'The resident wears hearing aid(s)',
        'The resident can self manage hearing aid (put in / take out)',
        'The resident has regular hearing tests',
        "The resident's eyesight is good (with / without glasses)",
        'The resident wears a prosthesis (false eye)',
        'The resident has regular eye tests',
        'The resident has medical conditions that affect speech',
        'The resident can speak clearly',
        'The resident has limited speech',
        'The resident uses speech aids',
        'Other',
    ];

    fallsAndMobilityOptions: string[] = [
        'The resident can mobilise independently with or without an aid',
        'The resident can mobilise with assistance or with an aid',
        'The resident is immobile',
        'The resident is unable to ask for help',
        'The resident can ask for help',
        'The resident is unable to use the call bell',
        'The resident can use the call bell',
        'The resident has fallen in the last 12 months',
        'The resident has fallen in the last month',
        "The resident's mobility will vary throughout a 24-hour period",
        'The resident has medical conditions that affect mobility',
        'The resident has physical conditions that affect mobility',
        'The resident has pain that affects mobility',
        'The resident is taking more than 4 medications that could affect mobility',
        'The resident will need to have regular checks throughout the night',
        'Other',
    ];

    painStatusOptions: string[] = [
        'The resident is in no pain',
        'The resident is rarely / occasionally in pain',
        'The resident is in intermittent pain',
        'The resident is in constant pain',
        'The resident has acute pain',
        'The resident has chronic pain',
        'The resident is prescribed pain relief',
        'The resident is not prescribed pain relief',
        'The resident takes prescribed pain relief orally',
        'The resident takes prescribed pain relief via patch',
        'The resident takes prescribed pain relief via syringe driver',
        'The resident can ask for pain relief if required',
        'The resident is not able to ask for pain relief if required',
        "Staff are to regularly monitor the resident's pain status and administer pain relief as prescribed",
        'Other',
    ];

    skinAssessmentOptions: string[] = [
        "The resident's skin is healthy",
        "The resident's skin is not healthy",
        'The resident can tell you about skin condition',
        'The resident cannot tell you about skin condition',
        'The resident has areas that are sore / red',
        'The resident does not have areas that are sore / red',
        'The resident has areas of dry, flaky, itchy skin',
        'The resident does not have areas of dry, flaky, itchy skin',
        'The resident is prescribed treatment by GP / health professional',
        'Other',
    ];

    eatingDrinkingAssessmentOptions: string[] = [
        'The resident has a healthy diet and appetite and drinks well',
        'The resident does not have a healthy diet and appetite and does not drink well',
        'The resident has recently lost weight',
        'The resident has recently gained weight',
        "The resident's weight is stable",
        'The resident requires assistance cutting up food',
        'The resident requires help to eat meals',
        'The resident has diet-controlled diabetes',
        'The resident has oral medication to control diabetes',
        'The resident has insulin to control diabetes',
        'The resident has been seen by a dietitian / SALT team',
        'The resident has been referred to a dietitian / SALT team',
        'The resident requires help to drink',
        'The resident has difficulties swallowing food and drink',
        'The resident does not have difficulties swallowing food and drink',
        'The resident requires a thickening agent (prescribed) for drinks',
        'The resident takes fluids via subcutaneous injection',
        'The resident has been prescribed a modified diet',
        'The resident is enteral / PEG fed',
        'The resident enjoys an IDDSI Level 3 - Liquidised textured food',
        'The resident enjoys an IDDSI Level 4 - Pureed textured food',
        'The resident enjoys an IDDSI Level 5 - Minced and moist textured food',
        'The resident enjoys an IDDSI Level 6 - Soft textured food',
        'The resident enjoys an IDDSI Level 7 - Regular textured food',
        'The resident enjoys an IDDSI Level 4 - Extremely thick consistency fluid',
        'The resident enjoys an IDDSI Level 3 - Moderately thick consistency fluid',
        'The resident enjoys an IDDSI Level 2 - Mildly thick consistency fluid',
        'The resident enjoys an IDDSI Level 1 - Slightly thick consistency fluid',
        'The resident enjoys an IDDSI Level 0 - Thin consistency fluid',
        'Other',
    ];

    promotionOfContinenceOptions: string[] = [
        'The resident has no continence concerns',
        'The resident has continence concerns during the day',
        'The resident has continence concerns during the night',
        'The resident uses continence aids during the day',
        'The resident uses continence aids at night',
        'The resident has a catheter in place',
        'The resident has a colostomy / ileostomy',
        'The resident is prone to constipation',
        'The resident is prone to loose bowels',
        'The resident is prone to UTIs',
        'Other',
    ];

    feelingFreshAndCleanOptions: string[] = [
        'The resident would prefer a female carer',
        'The resident would prefer a male carer',
        'The resident has no preference to female / male carer',
        'The resident can wash dress / undress independently',
        'The resident requires 1 carer to help them wash / dress / undress',
        'The resident requires 2 carers to help them wash / dress / undress',
        'The resident will allow the staff to check skin when washing / bathing',
        'The resident will not allow the staff to check skin when washing / bathing',
        'The resident can attend to own oral hygiene',
        'The resident needs assistance to attend to own oral hygiene',
        'The resident has own teeth',
        'The resident wears dentures',
        'The resident can trim / cut / file own nails',
        'The resident needs assistance to trim / cut / file own nails',
        "The resident's appearance is not important to them at all",
        "The resident's appearance is extremely important to them",
        "The resident's appearance is somewhat important to them",
        'Other',
    ];

    sleepingAndRestiingOptions: string[] = [
        'The resident needs help and support with sleeping and rest time routines',
        'The resident does not need help and support with sleeping and rest time routines',
        'The resident generally sleeps well at night',
        'The resident does not generally sleep well at night',
        'The resident sometimes gets up during the night',
        'The resident can get in / out of bed by themselves',
        'The resident needs assistance to get in / out of bed',
        'The resident can use the call bell to summon assistance',
        'The resident cannot use the call bell to summon assistance',
        'The resident sometimes feels anxious at night',
        'The resident would like staff to regularly check on them during the night',
        'The resident does not want staff to regularly check on them during the night',
        'The resident is prescribed medications to help them sleep',
        'The resident uses pressure relieving equipment',
        'The resident has a history of falling at night e.g. when getting out of bed, when mobilising to go to and from the toilet',
        'The resident requires bed rails with bumpers',
        'The resident uses other aids e.g. commode, urinal etc.',
        'Other',
    ];

    expressingSexualityOptions: string[] = [
        'The resident can discuss sexuality / sexual needs',
        'The resident is not able to discuss sexuality / sexual needs',
        'The resident does not want to discuss sexuality / sexual needs',
        'The resident has gender sensitivities',
        'The resident does not have gender sensitivities',
        'The resident has cultural sensitivities',
        'The resident does not have cultural sensitivities',
        'The resident has a husband / wife / partner',
        'The resident does not have a husband / wife / partner',
        'The resident has a need for privacy / intimacy with a husband / wife / partner',
        'The resident has a need for privacy to express sexual needs',
        'Other',
    ];

    EpilepsySeizureManagementOptions: string[] = [
        'The resident experiences absence seizures. The resident becomes unconscious for a short time. They may look blank and stare, or their eyelids might flutter. They will not respond to what is happening around them.',
        "The resident experiences myoclonic seizures. Myoclonic means 'muscle jerk'. Muscle jerks are not always due to epilepsy. Myoclonic seizures are brief but can happen in clusters and often happen shortly after waking.",
        "The resident experiences tonic and atonic seizures. The resident's muscles suddenly relax and they become floppy. Atonic seizures tend to be brief and happen without warning. With both tonic seizures the resident usually recover quickly.",
        'The resident experiences tonic clonic seizures. The resident becomes unconscious, their body goes stiff. They jerk and shake as their muscles relax and tighten rhythmically.',
        'Other',
    ];

    infectionStatusOptions: string[] = [
        'The resident has an infection or has been in touch with someone who has an infection e.g. MRSA, C.Diff / other',
        'The resident does not have any infection and has not been in touch with anyone who has an infection',
        'The resident is prone to chest infections',
        'The resident is prone to urinary tract infections',
        'The resident is prone to wound infections',
        'The resident is prone to skin infections',
        'Other',
    ];

    medicationOption: string[] = [
        'The resident can self-administer all medication',
        'The resident can partially self-administer medication, for example, the resident can take medications from a dosset box with prompting',
        'The resident is not able to self-administer medication',
        'The resident would like staff to administer all prescribed medications',
        'The resident can self-administer medication with the aid of a prepared dosette box',
        'The resident has been assessed as requiring their essential medications to be given covertly',
        'The resident requires a trained member of staff to administer their medications',
        'Other',
    ];

    firstAidEpilepticSeizureOptions: string[] = [
        'Assess - Assess the situation - are they in danger of injuring themselves. Remove nearby objects that could cause harm',
        'Cushion - Cushion their head to protect from head injury',
        'Time - Check the time - if seizure lasts longer than 5 minutes you should administer rescue meds or escalate to ambulance services',
        'Identity - Refer to Epilepsy support plan for possible further interventions',
        'Over - Once the jerking has stopped, put them on their side. Stay with them and reassure them as they come round',
        'Never - Never restrain the resident, put something in their mouth, or try to give them food and drink',
        'Other',
    ];
}
