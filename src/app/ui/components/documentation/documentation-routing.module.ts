import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [ { path: 'resident-documents',canActivate: [AuthGuard], loadChildren: () => import('./resident-documents/resident-documents.module').then(m => m.ResidentDocumentsModule) },
   { path: 'progressnotes-documents',canActivate: [AuthGuard], loadChildren: () => import('./progressnotes-documents/progressnotes-documents.module').then(m => m.ProgressnotesDocumentsModule) },
   { path: 'forms-and-charts',canActivate: [AuthGuard], loadChildren: () => import('./forms-and-charts/forms-and-charts.module').then(m => m.FormsAndChartsModule) },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentationRoutingModule { }
