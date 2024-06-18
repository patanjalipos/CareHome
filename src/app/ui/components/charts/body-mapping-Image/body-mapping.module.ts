import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodyMappingImageRoutingModule } from './body-mapping-routing.module';
import { BodyMappingComponent } from './body-mapping.component';
import { DialogModule } from 'primeng/dialog';
import { ChipsModule } from 'primeng/chips';
import { FormsModule } from '@angular/forms';
import { ChipModule } from 'primeng/chip';


@NgModule({
  declarations: [BodyMappingComponent],
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    ChipsModule,
    ChipModule,
    BodyMappingImageRoutingModule
  ],
  exports:[BodyMappingComponent]
})
export class BodyMappingImageModule { }
