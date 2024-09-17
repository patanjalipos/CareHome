import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActionsRoutingModule } from './actions-routing.module';
import { ActionsComponent } from './actions.component';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ActionTakenPopupModule } from '../action-taken-popup/action-taken-popup.module';
import { BodyMappingRecordModule } from "../../forms/body-mapping-record/body-mapping-record.module";
import { ActionTabListPopupModule } from "../action-tab-list-popup/action-tab-list-popup.module";


@NgModule({
  declarations: [ActionsComponent],
  imports: [
    CommonModule,
    ActionsRoutingModule,
    CalendarModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DialogModule,
    ActionTakenPopupModule,
    BodyMappingRecordModule,
    ActionTabListPopupModule
],
  exports:[ActionsComponent]
})
export class ActionsModule { }
