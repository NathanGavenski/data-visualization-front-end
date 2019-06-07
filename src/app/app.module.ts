import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { NgxCurrencyModule } from "ngx-currency";
import { FormsModule } from '@angular/forms';
import { StateComponent } from './components/dashboard/state/state.component';
import { CityComponent } from './components/dashboard/city/city.component';
import { NameModalComponent } from './components/common/name-modal/name-modal.component';
import { CrimeGraphComponent } from './components/dashboard/graphs/crime-graph/crime-graph.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    DashboardComponent,
    StateComponent,
    CityComponent,
    NameModalComponent,
    CrimeGraphComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxCurrencyModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
