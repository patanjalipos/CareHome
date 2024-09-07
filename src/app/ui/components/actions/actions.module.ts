import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActionsRoutingModule } from './actions-routing.module';
import { ActionsComponent } from './actions.component';
import { AlertModule } from "../resident-profile/alert/alert.module";
import { MissedModule } from './missed/missed.module';
import { CurrentModule } from './current/current.module';
import { UpCommingModule } from './up-comming/up-comming.module';
import { CompletedModule } from './completed/completed.module';
import { ManageActionSchedulesModule } from './manage-action-schedules/manage-action-schedules.module';



@NgModule({
  declarations: [
    ActionsComponent
  ],
  imports: [
    CommonModule,
    ActionsRoutingModule,
    AlertModule,
    UpCommingModule,
    CompletedModule,
    MissedModule,
    CurrentModule,
    ManageActionSchedulesModule

  ]
})
export class ActionsModule { }
