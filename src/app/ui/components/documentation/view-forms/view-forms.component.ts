import { Component, OnInit } from '@angular/core';
import { AppComponentBase } from 'src/app/app-component-base';
import { ConstantsService } from 'src/app/ui/service/constants.service';
import { MasterService } from 'src/app/ui/service/master.service';
import { UtilityService } from 'src/app/utility/utility.service';

@Component({
  selector: 'app-view-forms',
  templateUrl: './view-forms.component.html',
  styleUrls: ['./view-forms.component.scss']
})
export class ViewFormsComponent  extends AppComponentBase
implements OnInit
{
lstResidents: any[];
selectedResidentUserId: any;

userId: string;
admissionId: string;
isViewForms: boolean = true; 

constructor(
    private _ConstantServices: ConstantsService,
    private _MasterServices: MasterService,
    private _UtilityService: UtilityService
) {
    super();
    this._ConstantServices.ActiveMenuName = 'Forms';
}

GetResident() {
    this.selectedResidentUserId = null;
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
                }
            },
            error: (e) => {
                this._UtilityService.hideSpinner();
                this._UtilityService.showErrorAlert(e.message);
            },
        });
}

ngOnInit(): void {
  this.GetResident();
}
}