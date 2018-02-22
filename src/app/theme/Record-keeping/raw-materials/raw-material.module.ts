import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RawmaterialComponent } from './raw-material.component';
import {RawmaterialRoutingModule} from './raw-material-routing.module';
import {SharedModule} from '../../../shared/shared.module';
import {ChartModule} from 'angular2-chartjs';
import {SimpleNotificationsModule} from 'angular2-notifications';

@NgModule({
  imports: [
    CommonModule,
    RawmaterialRoutingModule,
    SharedModule,
    ChartModule,
    SimpleNotificationsModule.forRoot()
  ],
  declarations: [RawmaterialComponent],
  bootstrap: [RawmaterialComponent]
})
export class RawmaterialModule { }
