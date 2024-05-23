import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { AuthServiceService } from './ui/service/auth-service.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(private primengConfig: PrimeNGConfig,private _AuthServices:AuthServiceService) { }

    ngOnInit() {
        this.primengConfig.ripple = true;
        this._AuthServices.startUserActivityTracking();
    }
}
