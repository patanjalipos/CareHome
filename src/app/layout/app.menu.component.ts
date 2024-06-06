import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { MasterService } from '../ui/service/master.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService, public _MasterServices: MasterService) { }

    ngOnInit() {
        this.loadMenu();

    }

    public loadMenu() {
        if (localStorage.getItem('MenuItem') != null) {
            this.model = JSON.parse(localStorage.getItem('MenuItem'));
            //this.setMenu({ "items": this.LstDynamicAside });
        }
        else if ((localStorage.getItem('userTypeId') != null && localStorage.getItem('userId') != null)) {
            this._MasterServices.GetMenuItemMasterByModuleId(localStorage.getItem('userTypeId'), localStorage.getItem('userId'))
                .subscribe(
                    data => {
                        if (data.actionResult.success == true) {
                            var tdata = JSON.parse(data.actionResult.result);
                            tdata = tdata ? tdata : [];
                            this.model = tdata;
                            //console.log('Menu', this.model);
                            localStorage.removeItem('UerRoleAccess');
                            var tdata2 = JSON.parse(data.actionResult.result2);
                            tdata2 = tdata2 ? tdata2 : [];
                            localStorage.setItem('UerRoleAccess', JSON.stringify(tdata2));

                            //this.setMenu({ "items": this.LstDynamicAside });
                            localStorage.setItem('MenuItem', JSON.stringify(this.model).toString());

                        }
                    }
                );
        }

    }
}
