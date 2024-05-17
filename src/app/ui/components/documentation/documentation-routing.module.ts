import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [ { path: 'resident-documents',canActivate: [AuthGuard], loadChildren: () => import('./resident-documents/resident-documents.module').then(m => m.ResidentDocumentsModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentationRoutingModule { }
