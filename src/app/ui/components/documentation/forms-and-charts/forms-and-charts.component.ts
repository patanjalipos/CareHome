import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponentBase } from 'src/app/app-component-base';
import { ConstantsService } from 'src/app/ui/service/constants.service';
import { MasterService } from 'src/app/ui/service/master.service';
import { UtilityService } from 'src/app/utility/utility.service';

@Component({
    selector: 'app-forms-and-charts',
    templateUrl: './forms-and-charts.component.html',
    styleUrls: ['./forms-and-charts.component.scss'],
})
export class FormsAndChartsComponent
    extends AppComponentBase
    implements OnInit
{
    lstResidents: any[];
    filteritems: any[] = [];

    selectedOption: string;
    selectedResidentUserId: any;

    userId: string;
    admissionId: string;

    isShowDashboard: boolean = false;

    constructor(
        private _ConstantServices: ConstantsService,
        private _MasterServices: MasterService,
        private _UtilityService: UtilityService
    ) {
        super();
        this._ConstantServices.ActiveMenuName = 'Forms and Charts';
    }

    showDashBoardComponent() {
        this.isShowDashboard = false;
        this.filteritems = this.lstResidents.filter(
            (x) => x.UserId === this.selectedResidentUserId
        );

        setTimeout(() => {
            this.admissionId = this.filteritems[0].ResidentAdmissionInfoId;
            this.userId = this.filteritems[0].UserId;

            this.isShowDashboard = true;
        }, 0);
    }

    onRadioSelect() {
        this.selectedResidentUserId = null;
        this.isShowDashboard = false;
        this._UtilityService.showSpinner();
        this.unsubscribe.add = this._MasterServices
            .GetResidentMaster()
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                      var tdata = data.actionResult.result;
                        tdata = tdata ? tdata : [];
                        this.lstResidents = tdata;
                    }
                },
                error: (e) => {
                    this._UtilityService.hideSpinner();
                    this._UtilityService.showErrorAlert(e.message);
                },
            });
    }

    ngOnInit(): void {}

    // Reset() {
    //     this.selectedOption = null;
    //     this.selectedResidentUserId = null;
    //     this.isShowDashboard = false;
    // }
}
