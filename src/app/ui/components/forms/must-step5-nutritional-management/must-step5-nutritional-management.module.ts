import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MustStep5NutritionalManagementRoutingModule } from './must-step5-nutritional-management-routing.module';
import { MustStep5NutritionalManagementComponent } from './must-step5-nutritional-management.component';


@NgModule({
  declarations: [
    MustStep5NutritionalManagementComponent
  ],
  imports: [
    CommonModule,
    MustStep5NutritionalManagementRoutingModule
  ]
})
export class MustStep5NutritionalManagementModule { }
