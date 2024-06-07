import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodyMappingImageRoutingModule } from './body-mapping-routing.module';
import { BodyMappingComponent } from './body-mapping.component';


@NgModule({
  declarations: [BodyMappingComponent],
  imports: [
    CommonModule,
    BodyMappingImageRoutingModule
  ],
  exports:[]
})
export class BodyMappingImageModule { }
