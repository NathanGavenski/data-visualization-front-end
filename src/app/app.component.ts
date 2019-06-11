import { Component, ViewChild } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MapComponent } from './components/map/map.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public loading = false;
  public arrow = '>';

  public dashboardController = true;
  private city;
  private type;

  @ViewChild(DashboardComponent)
  public dashboard: DashboardComponent;

  @ViewChild(MapComponent)
  public map: MapComponent;

  minimize() {
    this.loading = true;
    const map = document.getElementById('app-map')
    const arrowBtn = document.getElementById('arrow');
    this.dashboardController = !this.dashboardController; 

    if (this.dashboardController)  {
      this.arrow = '>';
      map.style.width = '50%';
      arrowBtn.style.left = '49%'
    } else {
      this.arrow = '<';
      map.style.width = '100%';
      arrowBtn.style.left = '97%'
    }

    setTimeout(() => {
      this.map.map.updateSize();
      this.loading = false;
      }, 200
    );
    
  }

  cityClicked(event) {
    this.city = event.city;
    this.dashboard.clicked_city(event.city);
  }

  activate_clusters(event) {
    if (event) this.type = event.kind;
    if (this.type === 'Nenhum') this.map.createNormalMap();
    else if (this.type === 'IBGE') this.map.createIBGEMap();
    else if (this.type === 'Crime') this.map.createCrimeMap();
    else if (this.type === 'IBGE + Crime') this.map.createIBGECrimeMap();
  }

  showDistance(event) {
    if (event) this.type = event.kind;

    switch(this.type) {
      case 'IBGE': 
        this.map.createIbgeHeatMap(event.city);
        break;
      case 'Crime': 
        this.map.createCrimeHeatMap(event.city);
        break;
      case 'IBGE + Crime': 
        this.map.createIbgeCrimeHeatMap(event.city);
        break;
      default: 
        this.map.createNormalMap();
        break;
    }

    setTimeout(() => {
      this.map.map.updateSize();
      this.loading = false;
      }, 200
    );
  }

  removeDistance(event) {
    if (event) this.type = event.kind;

    switch(this.type) {
      case 'IBGE': 
        this.map.createIBGEMap();
        break;
      case 'Crime': 
        this.map.createCrimeMap();
        break;
      case 'IBGE + Crime': 
        this.map.createIBGECrimeMap();
        break;
      default: 
        this.map.createNormalMap();
        break;
    }

    setTimeout(() => {
      this.map.map.updateSize();
      this.loading = false;
      }, 200
    );
  }
}
