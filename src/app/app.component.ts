import { Component, ViewChild } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MapComponent } from './components/map/map.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'data-visualization-front-end';
 
  @ViewChild(DashboardComponent)
  private dashboard: DashboardComponent;

  @ViewChild(MapComponent)
  private map: MapComponent;
}
