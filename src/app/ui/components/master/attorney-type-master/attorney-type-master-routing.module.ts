import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttorneyTypeMasterComponent } from './attorney-type-master.component';

const routes: Routes = [{ path: '', component: AttorneyTypeMasterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttorneyTypeMasterRoutingModule { }
