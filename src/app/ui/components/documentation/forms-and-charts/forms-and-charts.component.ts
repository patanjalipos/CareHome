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
    selectedOption: string;
    selectedResident: any;
    lstResidents: any[];

    isShowFormDashboard: boolean = false;
    isShowChartDashboard: boolean = false;

    constructor(
        private _ConstantServices: ConstantsService,
        private _MasterServices: MasterService,
        private _UtilityService: UtilityService
    ) //private router: Router,
    {
        super();
        this._ConstantServices.ActiveMenuName = 'Forms and Charts';
    }

    Next() {
        if (this.selectedOption == 'Forms') {
            alert('Open Forms for Resident: ' + this.selectedResident);
            this.isShowFormDashboard = true;
            this.isShowChartDashboard = false;
            //this.router.navigate(['/forms-dashboard', this.selectedResident]);
        } else {
            alert('Open Charts for Resident: ' + this.selectedResident);
            this.isShowChartDashboard = false;
            this.isShowFormDashboard = true;

        }
    }

    onRadioSelect() {
        this._UtilityService.showSpinner();
        this.unsubscribe.add = this._MasterServices
            .GetResidentMaster()
            .subscribe({
                next: (data) => {
                    this._UtilityService.hideSpinner();
                    if (data.actionResult.success == true) {
                        var tdata = JSON.parse(data.actionResult.result);
                        tdata = tdata ? tdata : [];
                        this.lstResidents = tdata;
                        console.log(this.lstResidents);
                    }
                },
                error: (e) => {
                    this._UtilityService.hideSpinner();
                    this._UtilityService.showErrorAlert(e.message);
                },
            });
    }

    ngOnInit(): void {}
}
