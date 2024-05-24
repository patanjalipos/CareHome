import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { ConstantsService, UserTypes } from '../ui/service/constants.service';
import { Router } from '@angular/router';
import { AppComponentBase } from '../app-component-base';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent extends AppComponentBase implements OnInit {
    items!: MenuItem[];
    @ViewChild('menubutton') menuButton!: ElementRef;
    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;
    @ViewChild('topbarmenu') menu!: ElementRef;
    FullName: string = null;
    UserTypes = UserTypes;
    userTypeId = localStorage.getItem('userTypeId');
    constructor(public layoutService: LayoutService,
        public _ConstantServices: ConstantsService,
        private _Router: Router,
    ) {
        super();
    }
    ngOnInit(): void {
        this.FullName = localStorage.getItem('FullName');
    }

    ChangePassword() {
        this._Router.navigateByUrl("/change-password");
    }
}
