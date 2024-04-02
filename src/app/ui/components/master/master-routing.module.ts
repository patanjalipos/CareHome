import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'menu-master', loadChildren: () => import('./menu-item-master/menu-item-master.module').then(m => m.MenuItemMasterModule) },
  { path: 'alert-head-master', loadChildren: () => import('./alert-head-master/alert-head-master.module').then(m => m.AlertHeadMasterModule) },
  { path: 'alert-master', loadChildren: () => import('./alert-master/alert-master.module').then(m => m.AlertMasterModule) },
  { path: 'chart-head-master', loadChildren: () => import('./chart-head-master/chart-head-master.module').then(m => m.ChartHeadMasterModule) },
  { path: 'chart-master', loadChildren: () => import('./chart-master/chart-master.module').then(m => m.ChartMasterModule) },  
  { path: 'indicator-group-master', loadChildren: () => import('./indicator-group-master/indicator-group-master.module').then(m => m.IndicatorGroupMasterModule) },
  { path: 'indicator-master', loadChildren: () => import('./indicator-master/indicator-master.module').then(m => m.IndicatorMasterModule) },
  { path: 'attorney-type-master', loadChildren: () => import('./attorney-type-master/attorney-type-master.module').then(m => m.AttorneyTypeMasterModule) },
  { path: 'fall-risk-master', loadChildren: () => import('./fall-risk-master/fall-risk-master.module').then(m => m.FallRiskMasterModule) },
  { path: 'home-master', loadChildren: () => import('./home-master/home-master.module').then(m => m.HomeMasterModule) },
  { path: 'location-master', loadChildren: () => import('./location-master/location-master.module').then(m => m.LocationMasterModule) },
  { path: 'form-master', loadChildren: () => import('./form-master/form-master.module').then(m => m.FormMasterModule) },
  { path: 'user-master', loadChildren: () => import('./user-master/user-master.module').then(m => m.UserMasterModule) },
  { path: '**', redirectTo: '/notfound' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
