import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CareService } from 'src/app/ui/service/CareServices';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-fluid-assessment',
  templateUrl: './fluid-assessment.component.html',
  styleUrls: ['./fluid-assessment.component.scss']
})
export class FluidAssessmentComponent implements OnInit {
  @ViewChild('filter') filter: ElementRef;
  DailyIntakeObj:any=<any>{};
  DailyNewFluidIntake:any=<any>{};
  lstFluidType:any[]=[];
  lstFluidOutType:any[]=[];
  lstContainerName:any[]=[];
  SelectedFluid:string=null;
  MaxFluidQty:number=0;
  lstFluidDetails:any[]=[];
  DailyNewFluidOutput:any=<any>{};
  barData: any;
  barOptions: any;
  rangeDates:any[]=[];

  constructor(
    private datePipe: DatePipe,
    private careService:CareService
  ) { 
    this.DailyIntakeObj.TargetIntake=1500;
    this.DailyIntakeObj.TargetTime='08:00';
    this.DailyIntakeObj.UpdatedBy="John Thomas";
    this.DailyIntakeObj.UpdatedTime="09-11-2022 15:17";

    this.lstFluidType.push({"FluidType":"Tea/Coffee"});
    this.lstFluidType.push({"FluidType":"Fruit Juice"});
    
    this.lstFluidOutType.push({"FluidType":"Urine"});

    this.lstContainerName.push({"ContainerName":"Glass"});
    this.lstContainerName.push({"ContainerName":"Cup"});
  }

  ngOnInit(): void {
    this.careService.getFluidHistoryDetails().then(data => this.lstFluidDetails = data);
    this.initCharts('01','08');
    this.rangeDates.push(new Date('2022-11-01'));
    this.rangeDates.push(new Date('2022-11-08'));
    
  }
  SaveTargetIntake()
  {
    if(this.DailyIntakeObj.IntakeDailyTarget<=0 || this.DailyIntakeObj.IntakeDailyTarget==null || this.DailyIntakeObj.IntakeDailyTarget==undefined)
    {
      alert("Please Enter Intake Target");
      return;
    }
    if(this.DailyIntakeObj.StartTime==null || this.DailyIntakeObj.StartTime==undefined)
    {
      alert("Please Enter Intake Start Time");
      return;
    }

    this.DailyIntakeObj.TargetIntake=this.DailyIntakeObj.IntakeDailyTarget;
    this.DailyIntakeObj.TargetTime=this.datePipe.transform(this.DailyIntakeObj.StartTime,'HH:MM').toString();
    this.DailyIntakeObj.IntakeDailyTarget=0;
    this.DailyIntakeObj.StartTime=null;
    alert("Intake Target Details Saved Successfully");
  }
  SelectFluid(FluidType,MaxQty)
  {
      this.SelectedFluid=FluidType;
      this.MaxFluidQty=MaxQty;
      this.DailyNewFluidIntake.FluidIntakeQty=0;
  }
  SaveIntakeFluid()
  {
      if(this.DailyNewFluidIntake.CaptureTime==null || this.DailyNewFluidIntake.CaptureTime==undefined)
      {
        alert("Please Select Date and Time of Capture");
        return;
      }
      if(this.SelectedFluid==null || this.SelectedFluid==undefined)
      {
        alert("Please Select Fluid Type");
        return;
      }
      if(this.DailyNewFluidIntake.FluidIntakeQty==null || this.DailyNewFluidIntake.FluidIntakeQty==undefined || this.DailyNewFluidIntake.FluidIntakeQty<=0)
      {
        alert("Please Enter Fluid Qty");
        return;
      }
      if(this.DailyNewFluidIntake.UpdatedBy==null || this.DailyNewFluidIntake.UpdatedBy==undefined || this.DailyNewFluidIntake.UpdatedBy=='')
      {
        alert("Please Enter Updated By");
        return;
      }

      var ContainerName=null;
      if(this.SelectedFluid=="Water")
      {
        ContainerName="Glass"
      }
      else if(this.SelectedFluid=="Juice")
      {
        ContainerName="Glass"
      }
      else if(this.SelectedFluid=="Milk")
      {
        ContainerName="Glass"
      }
      else if(this.SelectedFluid=="Tea")
      {
        ContainerName="Cup"
      }
      else if(this.SelectedFluid=="Coffee")
      {
        ContainerName="Mug"
      }

      this.lstFluidDetails.push({
        "CaptureDate":this.datePipe.transform(this.DailyNewFluidIntake.CaptureTime,"dd-MM-yyyy HH:mm"),
        "FluidType":this.SelectedFluid,
        "ContainerName":ContainerName,
        "FluidQty":this.DailyNewFluidIntake.FluidIntakeQty,
        "UpdatedBy":this.DailyNewFluidIntake.UpdatedBy,
        "UpdatedDate":this.datePipe.transform(new Date(),"dd-MM-yyyy HH:mm")
      });

      this.DailyNewFluidIntake.CaptureTime=null;
      this.MaxFluidQty=0;
      this.DailyNewFluidIntake.FluidIntakeQty=0;
      this.SelectedFluid=null;
      this.DailyNewFluidIntake.UpdatedBy=null;

      alert("Intake Details Saved Successfully");
  }
  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }
  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
  SaveFluidOutput()
  {
    if(this.DailyNewFluidOutput.CaptureTime==null || this.DailyNewFluidOutput.CaptureTime==undefined)
      {
        alert("Please Select Date and Time of Capture");
        return;
      }
      if(this.DailyNewFluidOutput.FluidType==null || this.DailyNewFluidOutput.FluidType==undefined)
      {
        alert("Please Select Fluid Out Type");
        return;
      }
      if(this.DailyNewFluidOutput.FluidOutQty==null || this.DailyNewFluidOutput.FluidOutQty==undefined || this.DailyNewFluidOutput.FluidOutQty<=0)
      {
        alert("Please Enter Fluid Out Qty");
        return;
      }
      if(this.DailyNewFluidOutput.UpdatedBy==null || this.DailyNewFluidOutput.UpdatedBy==undefined || this.DailyNewFluidOutput.UpdatedBy=='')
      {
        alert("Please Enter Updated By");
        return;
      }
    this.DailyNewFluidOutput.CaptureTime=null;
    this.DailyNewFluidOutput.FluidOutQty=0;
    this.DailyNewFluidOutput.UpdatedBy=null;
    this.DailyNewFluidOutput.FluidType=null;
    alert("Output Details Saved Successfully");
  }
  initCharts(DateFrom,DateUpto) {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
    
    var labelsArray:any[]=['01', '02', '03', '04', '05', '06', '07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31'];
    var labelsNew:any[]=[];
    for(let i=parseInt(DateFrom)-1;i<=parseInt(DateUpto)-1;i++)
    {
      labelsNew.push(labelsArray[i]);
    }
    this.barData = {

        //labels: ['01', '02', '03', '04', '05', '06', '07','08','09','10'],
        labels:labelsNew,
        datasets: [
            {
                label: 'Target',
                backgroundColor: documentStyle.getPropertyValue('#617C7E'),
                borderColor: documentStyle.getPropertyValue('#023c40 '),
                data: [1500, 1500, 1500, 1500, 1600, 1600, 1600,1700,1700,1700,1600,1600,1700,1800,1800,1800,1700,1400,1200,1300,1500,1600,1700,1800,1900,1900,1800,1800,1800,1900,1900,1900]
            },
            {
                label: 'Actual',
                backgroundColor: documentStyle.getPropertyValue('--primary-200'),
                borderColor: documentStyle.getPropertyValue('--primary-200'),
                data: [1200, 1300, 1400, 1200, 1500, 1300, 1400,1400,1500,1600,1200, 1300, 1400, 1200, 1500, 1300, 1400,1400,1500,1600,1200, 1300, 1400, 1200, 1500, 1300, 1400,1400,1500,1600]
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
ShowDetails()
{
  var abc=this.rangeDates;
  if(this.rangeDates?.length>1)
  {
    var DateFrom:string=this.datePipe.transform(this.rangeDates[0],"dd").toString();
    var DateUpto:string=this.datePipe.transform(this.rangeDates[1],"dd").toString();
    this.initCharts(DateFrom,DateUpto);
  }
}
}
