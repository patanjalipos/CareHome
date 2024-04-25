import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { DataView } from 'primeng/dataview';
import { ResidentList } from 'src/app/ui/classes/ResidentList';
import { CareService } from 'src/app/ui/service/CareServices';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-residentlist',
  templateUrl: './residentlist.component.html',
  styleUrls: ['./residentlist.component.scss']
})
export class ResidentlistComponent implements OnInit {
  @ViewChild('filter') filter: ElementRef;
  residents: ResidentList[];
  viewMode: boolean = true;
  residentId: string = "";
  activeClass: string = "";
  items: MenuItem[];
  filteritems: any[];

  constructor(private careService: CareService,private router: Router,) { }

  ngOnInit(): void {
    this.careService.getResidentList().then(data => this.residents = data);
    console.log('this.residents', this.residents);
    this.viewMode = true;
  }
  
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }
  onFilter(dv: DataView, event: Event) {
    dv.filter((event.target as HTMLInputElement).value);
  }
  residentClick(id) {
    this.residentId = id;
  }
  LoadResidentInfo(title,seq)
  {
    this.router.navigateByUrl("/uicare/residentprofile?title="+title+"&seq="+seq+"&rId="+this.residentId);
  }
  toggleMenu(menu, event, ResidentId) {
    this.items = [];
    this.filteritems = [];
    
    this.items = [
      ...this.items,
      {
        label: 'Personal Details',
        icon: 'pi pi-calendar-plus',
        command: () => {
           this.residentId=ResidentId;
           this.LoadResidentInfo('Personal Details','1');
        }
      },
    ];
    this.items = [
      ...this.items,
      {
        label: 'Fluid Assessment',
        icon: 'pi pi-calendar-plus',
        command: () => 
        {
          this.residentId=ResidentId;
          this.LoadResidentInfo('Fluid Assessment','3');
        }
      },
    ];
    this.items = [
      ...this.items,
      {
        label: 'Diet Planner',
        icon: 'pi pi-calendar-plus',
        command: () => 
        {
          this.residentId=ResidentId;
          this.LoadResidentInfo('Diet Planner','4');
        }
      },
    ]

    this.items = [
      ...this.items,
      {
        label: 'Task Planner',
        icon: 'pi pi-calendar-plus',
        command: () => 
        {
          this.residentId=ResidentId;
          this.LoadResidentInfo('Task Planner','4');
        }
      },
    ];

    this.items = [
      ...this.items,
      {
        label: 'Pain Assessment',
        icon: 'pi pi-calendar-plus',
        command: () => 
        {
          this.residentId=ResidentId;
          this.LoadResidentInfo('Pain Assessment','5');
        }
      },
    ];
    this.items = [
      ...this.items,
      {
        label: 'Diet Planner',
        icon: 'pi pi-calendar-plus',
        command: () => 
        {
          this.residentId=ResidentId;
          this.LoadResidentInfo('Diet Planner','6');
        }
      },
    ];
    this.items = [
      ...this.items,
      {
        label: 'Fall Risk Assessment',
        icon: 'pi pi-calendar-plus',
        command: () => 
        {
          this.residentId=ResidentId;
          this.LoadResidentInfo('Fall Risk Assessment','7');
        }
      },
    ];

    menu.toggle(event);
  }
}
