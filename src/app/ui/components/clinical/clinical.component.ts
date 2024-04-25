import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConstantsService } from '../../service/constants.service';
import { AppComponentBase } from 'src/app/app-component-base';

@Component({
  selector: 'app-clinical',
  templateUrl: './clinical.component.html',
  styleUrls: ['./clinical.component.scss']
})
export class ClinicalComponent extends AppComponentBase implements OnInit {
  selecteduserid:any= null; //"3325faff-558d-4067-9c56-02e78dd06b26";
  selectedadmissionid:any= null; //"a24a3830-1b5e-4ce7-a8cd-df6de925ffa9";
  healthcareMode:string="view";
  constructor(private viewportScroller: ViewportScroller,
    private route: ActivatedRoute,
    private _ConstantServices: ConstantsService,
    ) { 
      super();
      this._ConstantServices.ActiveMenuName="Clinical";
      this.unsubscribe.add = this.route.queryParams.subscribe(params => {
        var ParamsArray=this._ConstantServices.GetParmasVal(params['q']);
        if(ParamsArray?.length>0)
        {
          //console.log('ParamsArray',ParamsArray);
          this.healthcareMode = ParamsArray.find(e=>e.FieldStr=='mode')?.FieldVal || 'view';
          this.selecteduserid = ParamsArray.find(e=>e.FieldStr=='id')?.FieldVal || null;
          this.selectedadmissionid = ParamsArray.find(e=>e.FieldStr=='admissionid')?.FieldVal || null;
        } 
        if (this.healthcareMode == 'add' || this.healthcareMode == 'edit')
        this.healthcareMode = 'view';      
      });
    }

  public onClick(elementId: string): void { this.viewportScroller.scrollToAnchor(elementId); }
  ngOnInit(): void {    
  }

}
