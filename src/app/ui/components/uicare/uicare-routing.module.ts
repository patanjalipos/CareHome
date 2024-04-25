import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'residentlist', data: { breadcrumb: 'Resident List'}, loadChildren: () => import('./residentlist/residentlist.module').then(m => m.ResidentlistModule) },
    { path: 'residentprofile', data: { breadcrumb: 'Resident Profile'}, loadChildren: () => import('./resident-profile/resident-profile.module').then(m => m.ResidentProfileModule) },
    { path: 'user-profile', data: { breadcrumb: 'User Profile'}, loadChildren: () => import('./user-profile/user-profile.module').then(m => m.UserProfileModule) },
    { path: '**', redirectTo: '/notfound' }
  ])],
  exports: [RouterModule]
})
export class UicareRoutingModule { }
