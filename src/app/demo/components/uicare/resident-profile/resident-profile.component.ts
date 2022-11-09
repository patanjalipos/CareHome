import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resident-profile',
  templateUrl: './resident-profile.component.html',
  styleUrls: ['./resident-profile.component.scss']
})
export class ResidentProfileComponent implements OnInit {
  ProfileImage:string=null;
  objPatient:any=<any>{};
  title:string=null;
  seq:string=null;
  rId:string=null;

  constructor(private route: ActivatedRoute) { 
    this.objPatient.FullName="Sean Sweeney";
    this.objPatient.DateOfBirth="15-06-1956";
    this.objPatient.RefNumber="49472974294924";
    this.objPatient.ContactNumber="07557768852";
    this.objPatient.BllodGroup="B+";
    this.objPatient.Address="United Kingdom";
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => 
    {
      this.title = params['title'];
      this.seq = params['seq'];
      this.rId=params['rId'];
    });
  }
}
