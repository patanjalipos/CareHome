import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResidentProfileRoutingModule } from './resident-profile-routing.module';
import { ResidentProfileComponent } from './resident-profile.component';
import { ProfileModule } from './profile/profile.module';
import { FormsDashboardModule } from '../forms/forms-dashboard/forms-dashboard.module';


@NgModule({
  declarations: [
    ResidentProfileComponent
  ],
  imports: [
    CommonModule,
    ResidentProfileRoutingModule,
    ProfileModule,
    FormsDashboardModule,
  ],
  exports:[ResidentProfileComponent]
})
export class ResidentProfileModule { }
