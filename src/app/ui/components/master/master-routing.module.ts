import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: 'menu-master',canActivate: [AuthGuard], loadChildren: () => import('./menu-item-master/menu-item-master.module').then(m => m.MenuItemMasterModule) },
  { path: 'email-template',canActivate: [AuthGuard], loadChildren: () => import('./email-template/email-template.module').then(m => m.EmailTemplateModule) },
  { path: 'alert-head-master',canActivate: [AuthGuard], loadChildren: () => import('./alert-head-master/alert-head-master.module').then(m => m.AlertHeadMasterModule) },
  { path: 'alert-master',canActivate: [AuthGuard], loadChildren: () => import('./alert-master/alert-master.module').then(m => m.AlertMasterModule) },
  { path: 'chart-head-master',canActivate: [AuthGuard], loadChildren: () => import('./chart-head-master/chart-head-master.module').then(m => m.ChartHeadMasterModule) },
  { path: 'chart-master',canActivate: [AuthGuard], loadChildren: () => import('./chart-master/chart-master.module').then(m => m.ChartMasterModule) },  
  { path: 'indicator-group-master',canActivate: [AuthGuard], loadChildren: () => import('./indicator-group-master/indicator-group-master.module').then(m => m.IndicatorGroupMasterModule) },
  { path: 'indicator-master',canActivate: [AuthGuard], loadChildren: () => import('./indicator-master/indicator-master.module').then(m => m.IndicatorMasterModule) },
  { path: 'attorney-type-master',canActivate: [AuthGuard], loadChildren: () => import('./attorney-type-master/attorney-type-master.module').then(m => m.AttorneyTypeMasterModule) },
  { path: 'fall-risk-master',canActivate: [AuthGuard], loadChildren: () => import('./fall-risk-master/fall-risk-master.module').then(m => m.FallRiskMasterModule) },
  { path: 'home-master',canActivate: [AuthGuard], loadChildren: () => import('./home-master/home-master.module').then(m => m.HomeMasterModule) },
  { path: 'location-master',canActivate: [AuthGuard], loadChildren: () => import('./location-master/location-master.module').then(m => m.LocationMasterModule) },
  { path: 'form-master',canActivate: [AuthGuard], loadChildren: () => import('./form-master/form-master.module').then(m => m.FormMasterModule) },
  { path: 'user-master',canActivate: [AuthGuard], loadChildren: () => import('./user-master/user-master.module').then(m => m.UserMasterModule) },
  { path: '**', redirectTo: '/notfound' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
