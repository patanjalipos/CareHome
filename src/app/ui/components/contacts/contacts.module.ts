import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { ContactsComponent } from './contacts.component';
import { ContactsRoutingModule } from './contacts-routing.module';
import { PrimaryContactModule } from './primary-contact/primary-contact.module';
import { SecondaryContactModule } from './secondary-contact/secondary-contact.module';
import { ResponsiblePersonContactModule } from './responsible-person-contact/responsible-person-contact.module';
import { FirstPowerOfAttorneyModule } from './first-power-of-attorney/first-power-of-attorney.module';
import { SecondPowerOfAttorneyModule } from './second-power-of-attorney/second-power-of-attorney.module';
import { DoctorModule } from './doctor/doctor.module';
import { AccordionModule } from 'primeng/accordion';


@NgModule({
  declarations: [   
    ContactsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ContactsRoutingModule,
    PrimaryContactModule,
    SecondaryContactModule,
    ResponsiblePersonContactModule,
    FirstPowerOfAttorneyModule,
    SecondPowerOfAttorneyModule,
    DoctorModule,
    AccordionModule

  ]
})
export class ContactsModule { }
