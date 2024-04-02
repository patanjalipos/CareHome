import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  constructor() { }
  public IsLocal: boolean = false;
  public IsShowNavBar: boolean = true;
  public ActiveMenuName: string = "";
  
  GetParmasVal(paramsstr)
  {
      let ParamsArray:any[]=[];
      if(paramsstr!=null && paramsstr!=undefined)
      {
        var result=decodeURIComponent(atob(paramsstr));
        var NewCellData = result.split('&');
        if(NewCellData?.length>0)
        {
          NewCellData.map(e=>
            {
              ParamsArray.push({"FieldStr":e.split('=')[0],"FieldVal":e.split('=')[1]});
            });
        }
      }
      return ParamsArray;
  }
}




export enum UserTypes {
  SuperAdmin = "611b6d811003138c9d40a8b7",
  Admin = "607546c500f6f4c43c5d54a0",
  Resident = "6075474600f6f4c43c5d54a1"
  // Doctor = "6075479300f6f4c43c5d54a2",
  // Therapist = "60e5582069bec5646f115686",
  // Meditation = "60ed26557f6bda738e03c049",
  // Patient = "6075474600f6f4c43c5d54a1",
  // Pathologist = "60ee67c8b43250ad3a1d362d",
  // Cafeteria = "60e5597069bec5646f115688",
  // GuestServiceAgent = "6253e3b1eea1dbcb7aae98a1",
  // AdminDeo = "62678ac614091e1beade98e6",
  // Finance="6331db25d3c986311dff200c",
  // Billing="6396f00addc59e9aac93b137"
}

export enum FormTypes {
  PreAdmsnForm = "65e6db2de37632e29ad778ba",
  MedicalForm = "65e6db54e37632e29ad778bb",
  Fitness = "65e6db61e37632e29ad778bc"
}

export enum AdmissionStatus {
  Unallocated = 0,
  Active = 1,
  Deceased = 2,
  Discharged = 3,
  Transferred = 4,
  WaitListed = 5,
  Suspended = 6, 
}

export enum TaskPlannerStatus {
  Open = 1,
  InProgress = 2,
  Done = 3,
}

export enum CustomDateFormat {
  DEF_DATE = "dd-MM-yyyy",
  DEF_DATE_TIME = "dd-MM-yyyy HH:mm",
  DEF_DATE_TIME_AMPM = "dd-MM-yyyy HH:mm a" ,
  CalendarFormat="dd-mm-yy" 
}

