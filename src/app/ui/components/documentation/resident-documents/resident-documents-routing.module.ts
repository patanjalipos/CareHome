import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResidentDocumentsComponent } from './resident-documents.component';

const routes: Routes = [{path:'', component:ResidentDocumentsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResidentDocumentsRoutingModule { }
