import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [ { path: 'resident-documents',canActivate: [AuthGuard], loadChildren: () => import('./resident-documents/resident-documents.module').then(m => m.ResidentDocumentsModule) },
   { path: 'progressnotes-documents',canActivate: [AuthGuard], loadChildren: () => import('./progressnotes-documents/progressnotes-documents.module').then(m => m.ProgressnotesDocumentsModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentationRoutingModule { }
