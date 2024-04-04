import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodyMappingRecordComponent } from './body-mapping-record.component';

const routes: Routes = [{
  path:'',component:BodyMappingRecordComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BodyMappingRecordRoutingModule { }
