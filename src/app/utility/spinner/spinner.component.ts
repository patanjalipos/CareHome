import { Component, OnInit } from '@angular/core';
import { UtilityService } from '../utility.service';

@Component({
    selector: 'app-spinner',
    templateUrl: './spinner.component.html',
    styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent implements OnInit {
    isSpinnerShow: boolean = false;
    isSpinnerText: string = '';
    constructor(public utiltity: UtilityService) {

        this.utiltity.config.bgsColor= "#023C40",
        this.utiltity.config.bgsOpacity= 0.5,
        this.utiltity.config.bgsPosition= 'bottom-right',
        this.utiltity.config.bgsSize= 60,
        this.utiltity.config.bgsType= 'ball-spin-clockwise',
        this.utiltity.config.blur= 5,
        this.utiltity.config.delay= 0,
        this.utiltity.config.fastFadeOut= true,
        this.utiltity.config.fgsColor= '#023c40',
        this.utiltity.config.fgsPosition= 'center-center',
        this.utiltity.config.fgsSize= 60,
        this.utiltity.config.fgsType= 'three-strings',
        this.utiltity.config.gap= 24,
        this.utiltity.config.logoPosition= 'center-center',
        this.utiltity.config.logoSize= 120,
        this.utiltity.config.logoUrl= '',
        this.utiltity.config.masterLoaderId= 'master',
        this.utiltity.config.overlayBorderRadius= '0',
        this.utiltity.config.overlayColor= 'rgba(40, 40, 40, 0.8)',
        this.utiltity.config.pbColor= '#023c40',
        this.utiltity.config.pbDirection= 'ltr',
        this.utiltity.config.pbThickness= 3,
        this.utiltity.config.hasProgressBar= true,
        this.utiltity.config.text= '',
        this.utiltity.config.textColor= '#FFFFFF',
        this.utiltity.config.textPosition= 'center-center',
        this.utiltity.config.maxTime= -1,
        this.utiltity.config.minTime= 300	
    }
    ngOnInit(): void {
        this.utiltity.castSpinner.subscribe(
            (data) => (this.isSpinnerShow = data)
        );
        this.utiltity.message.subscribe((data) => (this.isSpinnerText = data));
    }
}
