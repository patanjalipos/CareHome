import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgressnotesDocumentsComponent } from './progressnotes-documents.component';

const routes: Routes = [{path:'', component:ProgressnotesDocumentsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgressnotesDocumentsRoutingModule { }
