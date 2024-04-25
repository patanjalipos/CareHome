import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from 'src/app/ui/api/product';
import { ProductService } from 'src/app/ui/service/product.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AppComponentBase } from 'src/app/app-component-base';
import { ConstantsService, CustomDateFormat, TaskPlannerStatus } from '../../service/constants.service';
import { MasterService } from 'src/app/ui/service/master.service';
import { UtilityService } from 'src/app/utility/utility.service';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-admin-dashboard',
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent extends AppComponentBase implements OnInit {
    customDateFormat = CustomDateFormat;
    taskPlannerStatus = TaskPlannerStatus;
    pieData: any;
    pieOptions: any;
    barData: any;
    barData2: any;
    barOptions: any;
    items!: MenuItem[];
    products!: Product[];
    chartData: any;
    chartOptions: any; 
    currentDate = new Date();
    public lstTaskPlanner: any[]=[];  
    public lstActivity: any[]=[];   
    constructor(
        private datepipe: DatePipe,
        private productService: ProductService,
        public layoutService: LayoutService,
        private _ConstantServices: ConstantsService,
        private _MasterServices: MasterService,
        private _UtilityService: UtilityService,
    ) 
    {
        super();
        this._ConstantServices.ActiveMenuName="Dashboard";
        this.unsubscribe.add = this.layoutService.configUpdate$.subscribe(() => {
            this.initChart();
        });
        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' }
        ];
    }

    ngOnInit() {
        this.initChart();
        this.productService.getProductsSmall().then(data => this.products = data);
        this.GetTaskPlanner();
        this.GetActivity();
        
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.chartData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
                    borderColor: documentStyle.getPropertyValue('--bluegray-700'),
                    tension: .4
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--green-600'),
                    borderColor: documentStyle.getPropertyValue('--green-600'),
                    tension: .4
                }
            ]
        };

        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
        this.pieData = {
            labels: ['Diabetes', 'Hypothyroidism', 'Arthritis', 'Heart Disease',
                'Asthma'],
            datasets: [
                {
                    data: [540, 325, 702, 450, 312],
                    // backgroundColor: [
                    //     documentStyle.getPropertyValue('--indigo-500'),
                    //     documentStyle.getPropertyValue('--purple-500'),
                    //     documentStyle.getPropertyValue('--teal-500'),
                    //     documentStyle.getPropertyValue('--green-500'),
                    //     documentStyle.getPropertyValue('--blue-500')
                    // ],
                    // hoverBackgroundColor: [
                    //     documentStyle.getPropertyValue('--indigo-400'),
                    //     documentStyle.getPropertyValue('--purple-400'),
                    //     documentStyle.getPropertyValue('--teal-400'),
                    //     documentStyle.getPropertyValue('--green-400'),
                    //     documentStyle.getPropertyValue('--blue-400')
                    // ],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--slice-one'),
                        documentStyle.getPropertyValue('--slice-two'),
                        documentStyle.getPropertyValue('--slice-three'),
                        documentStyle.getPropertyValue('--slice-four'),
                        documentStyle.getPropertyValue('--slice-five')
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--slice-one'),
                        documentStyle.getPropertyValue('--slice-two'),
                        documentStyle.getPropertyValue('--slice-three'),
                        documentStyle.getPropertyValue('--slice-four'),
                        documentStyle.getPropertyValue('--slice-five')
                    ]
                }]
        };

        this.pieOptions = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor
                    }
                }
            }
        };

        this.barData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [
                {
                    label: 'Revenue',
                    backgroundColor: documentStyle.getPropertyValue('--bar-color'),
                    borderColor: documentStyle.getPropertyValue('--bar-color'),
                    data: [103200, 244336, 354336, 284336, 324336, 304336, 294336, 554336, 784336, 0, 0, 0],
                    barThickness: 8,
                }
            ]
        };

        this.barData2 = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [
                {
                    label: 'Male',
                    backgroundColor: documentStyle.getPropertyValue('--Gender-color'),
                    borderColor: documentStyle.getPropertyValue('--Gender-color'),
                    data: [650, 712, 782, 815, 656, 712, 455, 745, 824, 689, 666, 476],
                    barThickness: 8,
                },
                {
                    label: 'Female',
                    backgroundColor: documentStyle.getPropertyValue('--primary-200'),
                    borderColor: documentStyle.getPropertyValue('--primary-200'),
                    data: [550, 642, 692, 735, 556, 652, 635, 545, 624, 589, 566, 496],
                    barThickness: 8,
                }
            ]
        };

        this.barOptions = {
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
            }
        };
    }

    GetActivity() {
        var startdate: any = null;
        if (this.currentDate != null && this.currentDate != undefined)
            startdate = this.datepipe.transform(this.currentDate, 'yyyy-MM-dd');
        this._UtilityService.showSpinner();   
        this.unsubscribe.add = this._MasterServices.GetActivity(true, startdate)
          .subscribe({
            next:(data) => {
              this._UtilityService.hideSpinner();          
              if (data.actionResult.success == true) {
                var tdata = JSON.parse(data.actionResult.result);
                tdata = tdata ? tdata : [];
                this.lstActivity = tdata;                
              }
              else {
                this.lstActivity = [];            
              }
            },
            error: (e) => {
              this._UtilityService.hideSpinner();
              this._UtilityService.showErrorAlert(e.message);
            },
          });
      }  

    GetTaskPlanner() {
        var startdate: any = null;
        if (this.currentDate != null && this.currentDate != undefined)
            startdate = this.datepipe.transform(this.currentDate, 'yyyy-MM-dd');
        this._UtilityService.showSpinner();   
        this.unsubscribe.add = this._MasterServices.GetTaskPlanner(0, startdate)
          .subscribe({
            next:(data) => {
              this._UtilityService.hideSpinner();          
              if (data.actionResult.success == true) {
                var tdata = JSON.parse(data.actionResult.result);
                tdata = tdata ? tdata : [];
                this.lstTaskPlanner = tdata;                         
              //  console.log(this.lstTaskPlanner);
              }
              else {
                this.lstTaskPlanner = [];            
              }
            },
            error: (e) => {
              this._UtilityService.hideSpinner();
              this._UtilityService.showErrorAlert(e.message);
            },
          });
      }  
}
