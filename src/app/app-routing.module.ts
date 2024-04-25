import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './ui/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { ResidentLayoutComponent } from './layout/resident.layout.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    //{ path: '', loadChildren: () => import('./ui/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    // { path: 'uikit', loadChildren: () => import('./ui/components/uikit/uikit.module').then(m => m.UIkitModule) },
                    // { path: 'utilities', loadChildren: () => import('./ui/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
                    { path: '', loadChildren: () => import('./ui/components/admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardModule) },
                    { path: 'uicare', loadChildren: () => import('./ui/components/uicare/uicare.module').then(m => m.UicareModule) },
                    { path: 'master', loadChildren: () => import('./ui/components/master/master.module').then(m => m.MasterModule) },
                    { path: 'forms', loadChildren: () => import('./ui/components/forms/forms.module').then(m => m.FormsModule) },
                    { path: 'resident-list', loadChildren: () => import('./ui/components/resident-list/resident-list.module').then(m => m.ResidentListModule) }, 
                    { path: 'task-planner', loadChildren: () => import('./ui/components/task-planner/task-planner.module').then(m => m.TaskPlannerModule) }, 
                    { path: 'activity', loadChildren: () => import('./ui/components/activity/activity.module').then(m => m.ActivityModule) }, 
                    { path: 'report', loadChildren: () => import('./ui/components/report/report.module').then(m => m.ReportModule) },
                    // { path: 'resident', loadChildren: () => import('./ui/components/resident/resident.module').then(m => m.ResidentModule) },
                    // { path: 'clinical', loadChildren: () => import('./ui/components/clinical/clinical.module').then(m => m.ClinicalModule) },
                    // { path: 'contacts', loadChildren: () => import('./ui/components/contacts/contacts.module').then(m => m.ContactsModule) }
                ]
            },
            {
                path: '', component: ResidentLayoutComponent,
                children: [
                    { path: 'profile', loadChildren: () => import('./ui/components/resident-profile/resident-profile.module').then(m => m.ResidentProfileModule) },
                    { path: 'resident', loadChildren: () => import('./ui/components/resident/resident.module').then(m => m.ResidentModule) },
                    { path: 'clinical', loadChildren: () => import('./ui/components/clinical/clinical.module').then(m => m.ClinicalModule) },
                    { path: 'contacts', loadChildren: () => import('./ui/components/contacts/contacts.module').then(m => m.ContactsModule) }
                ]
            },
            { path: 'auth', loadChildren: () => import('./ui/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'landing', loadChildren: () => import('./ui/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
