import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import Feature from 'ol/Feature.js';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import Select from 'ol/interaction/Select.js';
import Stamen from 'ol/source/Stamen.js';
import KML from 'ol/format/KML.js';
import { Polygon } from 'ol/geom';
import { Heatmap as HeatmapLayer, Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import { OSM, Vector as VectorSource } from 'ol/source.js';
import { fromLonLat, transform } from 'ol/proj';
import { pointerMove } from 'ol/events/condition.js';
import { Fill, Style, Stroke } from 'ol/style';

import { CommonStyle } from '../common/style.component';
import { CityLoader } from '../common/cityLoader.component';
import { CrimeClusterLoader } from '../common/crimeClusterLoader.component';
import { IBGEClusterLoader } from '../common/ibgeClusterLoader.component';
import { IBGECrimeClusterLoader } from '../common/ibgeCrimeClusterLoader.components';
import { DashboardUpdateService } from 'src/app/services/dashboard-update.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Output() citySelected = new EventEmitter;

  private crimeCluster: CrimeClusterLoader;
  private ibgeCluster: IBGEClusterLoader;
  private ibgeCrimeCluster: IBGECrimeClusterLoader;

  private commonStyle = new CommonStyle();
  private cities = new CityLoader();

  private citiesInfo = this.cities.getJson()
  private styles = this.commonStyle.styles;
  private box;
  private mousePosition = { x: 0, y: 0 };

  private colorArray = [];
  
  public map: Map;

  constructor(service: DashboardUpdateService) {
    this.colorArray = service.colorArray;
  }

  ngOnInit() {
    this.createNormalMap();

    this.box = document.getElementById("map");
    this.box.addEventListener("mousemove", this.updateDisplay, false);
    this.box.addEventListener("mouseenter", this.updateDisplay, false);
    this.box.addEventListener("mouseleave", this.removeDisplay, false);
  }

  public styleFunction = (feature) => {
    return this.styles[feature.getGeometry().getType()];
  };

  createCrimeMap() {
    document.getElementById('map').innerHTML = null;
    let vectorSource = new VectorSource();
    this.crimeCluster = (!this.crimeCluster) ? new CrimeClusterLoader() : this.crimeCluster;
    const crimeCluster = this.crimeCluster.getJson();

    for (let feature of this.citiesInfo.features) {
      let cityCoordinates = [];

      for (let coord of feature.geometry.coordinates) {
        cityCoordinates.push(transform(coord, 'EPSG:4326', 'EPSG:3857'))
      }

      try {
        let name = this.makeSortString(feature.properties.Name)
        if (name === 'FAZENDA VILANOVA') name = 'FAZENDA VILA NOVA'
        if (name === 'ENTRE-IJUIS') name = 'ENTRE IJUIS'
        let cluster = crimeCluster[name].Label;
        const hexColor = this.colorArray[cluster];
        const rgbColor = this.hexToRgb(hexColor);
        let color = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.5)`;

        const line = new Polygon([cityCoordinates]);
        const features = new Feature(line);
        features.set('name', feature.properties.Name);
        features.setStyle(new Style({ 
          stroke: new Stroke({ color: '#000000' }),
          fill: new Fill({ color: color }) 
        }));
        vectorSource.addFeature(features)
      } catch (TypeError) {
        console.log(feature.properties.Name)
      }
    }

    const vectorLayer = new VectorLayer({
      source: vectorSource
    })

    this.createMap(vectorLayer);
    this.hooverInteraction();
    this.clickInteraction();
  }

  createIBGEMap() {
    document.getElementById('map').innerHTML = null;
    let vectorSource = new VectorSource();
    this.ibgeCluster = (!this.ibgeCluster) ? new IBGEClusterLoader() : this.ibgeCluster;
    const ibgeCluster = this.ibgeCluster.getJson();

    for (let feature of this.citiesInfo.features) {
      let cityCoordinates = [];

      for (let coord of feature.geometry.coordinates) {
        cityCoordinates.push(transform(coord, 'EPSG:4326', 'EPSG:3857'))
      }

      try {
        let name = this.makeSortString(feature.properties.Name)
        if (name === 'FAZENDA VILANOVA') name = 'FAZENDA VILA NOVA'
        if (name === 'ENTRE-IJUIS') name = 'ENTRE IJUIS'
        let cluster = ibgeCluster[name].Label;
        const hexColor = this.colorArray[cluster];
        const rgbColor = this.hexToRgb(hexColor);
        let color = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.5)`;

        const line = new Polygon([cityCoordinates]);
        const features = new Feature(line);
        features.set('name', feature.properties.Name);
        features.setStyle(new Style({ 
          stroke: new Stroke({ color: '#000000' }),
          fill: new Fill({ color: color }) 
        }));
        vectorSource.addFeature(features)
      } catch (TypeError) {
        console.log(feature.properties.Name)
      }
    }

    const vectorLayer = new VectorLayer({
      source: vectorSource
    })

    this.createMap(vectorLayer);
    this.hooverInteraction();
    this.clickInteraction();
  }

  createIBGECrimeMap() {
    document.getElementById('map').innerHTML = null;
    let vectorSource = new VectorSource();
    this.ibgeCrimeCluster = (!this.ibgeCrimeCluster) ? new IBGECrimeClusterLoader() : this.ibgeCrimeCluster;
    const ibgeCrimeCluster = this.ibgeCrimeCluster.getJson();

    for (let feature of this.citiesInfo.features) {
      let cityCoordinates = [];

      for (let coord of feature.geometry.coordinates) {
        cityCoordinates.push(transform(coord, 'EPSG:4326', 'EPSG:3857'))
      }

      try {
        let name = this.makeSortString(feature.properties.Name)
        if (name === 'FAZENDA VILANOVA') name = 'FAZENDA VILA NOVA'
        if (name === 'ENTRE-IJUIS') name = 'ENTRE IJUIS'
        let cluster = ibgeCrimeCluster[name].Label;
        const hexColor = this.colorArray[cluster];
        const rgbColor = this.hexToRgb(hexColor);
        let color = `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, 0.5)`;

        const line = new Polygon([cityCoordinates]);
        const features = new Feature(line);
        features.set('name', feature.properties.Name);
        features.setStyle(new Style({ 
          stroke: new Stroke({ color: '#000000' }),
          fill: new Fill({ color: color }) 
        }));
        vectorSource.addFeature(features)
      } catch (TypeError) {
        console.log(feature.properties.Name)
      }
    }

    const vectorLayer = new VectorLayer({
      source: vectorSource
    })

    this.createMap(vectorLayer);
    this.hooverInteraction();
    this.clickInteraction();
  }

  createCrimeHeatMap(city) {
    this.crimeCluster = (!this.crimeCluster) ? new CrimeClusterLoader() : this.crimeCluster;
    const distances = this.crimeCluster.getDistanceFrom(city);

    document.getElementById('map').innerHTML = null;
    let vectorSource = new VectorSource();

    for (let feature of this.citiesInfo.features) {
      let cityCoordinates = [];

      for (let coord of feature.geometry.coordinates) {
        cityCoordinates.push(transform(coord, 'EPSG:4326', 'EPSG:3857'))
      }

      try {
        let name = this.makeSortString(feature.properties.Name)
        if (name === 'FAZENDA VILANOVA') name = 'FAZENDA VILA NOVA'
        if (name === 'ENTRE-IJUIS') name = 'ENTRE IJUIS'
        const hslColor = this.heatMapColorforValue(distances[name].distance);

        const line = new Polygon([cityCoordinates]);
        let features = new Feature(line);
        features.set('name', feature.properties.Name);
        features.setStyle(new Style({ 
          stroke: new Stroke({ color: '#000000' }),
          fill: new Fill({ color: `hsl(${hslColor.h}, 100%, 50%)` }) 
        }));
        vectorSource.addFeature(features);
      } catch (e) {
        console.log(feature.properties.Name)
      }
    }

    const vectorLayer = new VectorLayer({
      source: vectorSource
    });

    this.createMap(vectorLayer);
    this.hooverInteraction();
    this.clickInteraction();
  }

  createIbgeHeatMap(city) {
    this.ibgeCluster = (!this.ibgeCluster) ? new IBGEClusterLoader() : this.ibgeCluster;
    const distances = this.ibgeCluster.getDistanceFrom(city);
    document.getElementById('map').innerHTML = null;
    let vectorSource = new VectorSource();

    for (let feature of this.citiesInfo.features) {
      let cityCoordinates = [];

      for (let coord of feature.geometry.coordinates) {
        cityCoordinates.push(transform(coord, 'EPSG:4326', 'EPSG:3857'))
      }

      try {
        let name = this.makeSortString(feature.properties.Name)
        if (name === 'FAZENDA VILANOVA') name = 'FAZENDA VILA NOVA'
        if (name === 'ENTRE-IJUIS') name = 'ENTRE IJUIS'
        const hslColor = this.heatMapColorforValue(distances[name].distance);

        const line = new Polygon([cityCoordinates]);
        let features = new Feature(line);
        features.set('name', feature.properties.Name);
        features.setStyle(new Style({ 
          stroke: new Stroke({ color: '#000000' }),
          fill: new Fill({ color: `hsl(${hslColor.h}, 100%, 50%)` }) 
        }));
        vectorSource.addFeature(features);
      } catch (e) {
        console.log(feature.properties.Name)
      }
    }

    const vectorLayer = new VectorLayer({
      source: vectorSource
    });

    this.createMap(vectorLayer);
    this.hooverInteraction();
    this.clickInteraction();
  }

  createIbgeCrimeHeatMap(city) {
    this.ibgeCrimeCluster = (!this.ibgeCrimeCluster) ? new IBGECrimeClusterLoader() : this.ibgeCrimeCluster;
    const distances = this.ibgeCrimeCluster.getDistanceFrom(city);

    document.getElementById('map').innerHTML = null;
    let vectorSource = new VectorSource();

    for (let feature of this.citiesInfo.features) {
      let cityCoordinates = [];

      for (let coord of feature.geometry.coordinates) {
        cityCoordinates.push(transform(coord, 'EPSG:4326', 'EPSG:3857'))
      }

      try {
        let name = this.makeSortString(feature.properties.Name)
        if (name === 'FAZENDA VILANOVA') name = 'FAZENDA VILA NOVA'
        if (name === 'ENTRE-IJUIS') name = 'ENTRE IJUIS'
        const hslColor = this.heatMapColorforValue(distances[name].distance);

        const line = new Polygon([cityCoordinates]);
        let features = new Feature(line);
        features.set('name', feature.properties.Name);
        features.setStyle(new Style({ 
          stroke: new Stroke({ color: '#000000' }),
          fill: new Fill({ color: `hsl(${hslColor.h}, 100%, 50%)` }) 
        }));
        vectorSource.addFeature(features);
      } catch (e) {
        console.log(feature.properties.Name)
      }
    }

    const vectorLayer = new VectorLayer({
      source: vectorSource
    });

    this.createMap(vectorLayer);
    this.hooverInteraction();
    this.clickInteraction();
  }

  createNormalMap() {
    document.getElementById('map').innerHTML = null;
    var vectorSource = new VectorSource();

    for (let feature of this.citiesInfo.features) {
      let cityCoordinates = [];

      for (let coord of feature.geometry.coordinates) {
        cityCoordinates.push(transform(coord, 'EPSG:4326', 'EPSG:3857'))
      }

      const line = new Polygon([cityCoordinates])
      const features = new Feature(line)
      features.set('name', feature.properties.Name)
      vectorSource.addFeature(features)
    }

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: this.styleFunction
    })

    this.createMap(vectorLayer);
    this.hooverInteraction();
    this.clickInteraction();
  }

  private clickInteraction() {
    const select = new Select();
    this.map.addInteraction(select);
    select.on('select', (e) => {
      if (e.selected.length > 0) {
        this.citySelected.emit({city: e.selected[0].values_.name})
      }
    });
  }

  private hooverInteraction() {
    const select = new Select({
      condition: pointerMove
    });

    this.map.addInteraction(select);
    select.on('select', (e) => {
      if (e.selected.length > 0) {
        this.removeModal();
        const modal = document.createElement('div');
        modal.id = 'name-modal-div'
        modal.innerHTML = this.modalHTML(e.selected[0].values_.name);
        document.body.appendChild(modal);
      }
    }
    );
  }

  private createMap(vectorLayer) {
    this.map = null;
    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        vectorLayer
      ],
      target: 'map',
      view: new View({
        center: fromLonLat([-53, -30]),
        zoom: 7,
        minZoom: 7
      })
    });
    setTimeout(() => {this.map.render() }, 200)
  }

  private createMap2(vectorLayer, vectorHoover) {
    this.map = null;
    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        vectorLayer,
        vectorHoover
      ],
      target: 'map',
      view: new View({
        center: fromLonLat([-53, -30]),
        zoom: 7,
        minZoom: 7
      })
    });
    setTimeout(() => {this.map.render() }, 200)
  }

  private makeSortString = (function () {
    var translate_re = /[ÄÃÁÂÁÇÖÓÕÔÔÊÉÍÚÜ]/g;
    var translate = {
      "Ä": "A", "Ö": "O", "Ü": "U",
      "Ã": "A", "Õ": "O", "É": "E",
      "Ó": "O", "Ç": "C", "Ê": "E",
      "Â": "A", "Í": "I", "Á": "A",
      "Ô": "O", "Ú": "U"  // probably more to come
    };
    return function (s) {
      return (s.replace(translate_re, function (match) {
        return translate[match];
      }));
    }
  })();

  private modalHTML = (name) => {
    return `
    <div id="name-modal">
      <h5 style=" background-color: white;
                  position: absolute;
                  top: ${this.mousePosition.y}px;
                  left: ${this.mousePosition.x}px;
                  min-width: 100px;
                  max-width: 150px;
                  text-align: center;
                  font-size: 1rem;">
        ${name}
      </h5>
    </div>
    `
  }

  private updateDisplay = (event) => {
    this.mousePosition.x = event.pageX;
    this.mousePosition.y = event.pageY;
  }

  private removeDisplay = (event) => {
    this.updateDisplay(event);
    this.removeModal();
  }

  private removeModal = () => {
    let modal = document.getElementById('name-modal-div');
    if (modal) {
      document.body.removeChild(modal);
    }
  }

  private hexToRgb = (hex) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  private heatMapColorforValue(value){
    const h = (1.0 - value) * 100;
    const s = 100;
    const l = value * 50
    return { h: h,  s: s, l: l };
  }
}

