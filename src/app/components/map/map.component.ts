import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

import Feature from 'ol/Feature.js';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import Select from 'ol/interaction/Select.js';
import { Polygon } from 'ol/geom';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import { OSM, Vector as VectorSource } from 'ol/source.js';
import { fromLonLat, transform } from 'ol/proj';
import { pointerMove } from 'ol/events/condition.js';
import { Fill, Style } from 'ol/style';

import { CommonStyle } from '../common/style.component';
import { CityLoader } from '../common/cityLoader.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CrimeClusterLoader } from '../common/crimeClusterLoader.component';
import { IBGEClusterLoader } from '../common/ibgeClusterLoader.component';
import { IBGECrimeClusterLoader } from '../common/ibgeCrimeClusterLoader.components';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Output() citySelected = new EventEmitter;
  @Input() dashboard: DashboardComponent;

  private commonStyle = new CommonStyle();
  private cities = new CityLoader();

  private citiesInfo = this.cities.getJson()
  private styles = this.commonStyle.styles;
  private box;
  private mousePosition = { x: 0, y: 0 };

  private colorArray = [
    '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'
  ];

  public map: Map;

  public styleFunction = (feature) => {
    return this.styles[feature.getGeometry().getType()];
  };

  ngOnInit() {
    this.createNormalMap();

    this.box = document.getElementById("map");
    this.box.addEventListener("mousemove", this.updateDisplay, false);
    this.box.addEventListener("mouseenter", this.updateDisplay, false);
    this.box.addEventListener("mouseleave", this.removeDisplay, false);
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

  private clickInteraction() {
    const select = new Select();
    this.map.addInteraction(select);
    select.on('select', (e) => {
      if (e.selected.length > 0) {
        this.dashboard.clicked_city(e.selected[0].values_.name)
      }
    });
  }

  createCrimeMap() {
    document.getElementById('map').innerHTML = null;
    let vectorSource = new VectorSource();
    const clusterLoader = new CrimeClusterLoader();
    const crimeCluster = clusterLoader.getJson();

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
        let color = this.colorArray[cluster];

        const line = new Polygon([cityCoordinates]);
        const features = new Feature(line);
        features.set('name', feature.properties.Name);
        features.setStyle(new Style({ fill: new Fill({ color: color }) }));
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
    const clusterLoader = new IBGEClusterLoader();
    const ibgeCluster = clusterLoader.getJson();

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
        let color = this.colorArray[cluster];

        const line = new Polygon([cityCoordinates]);
        const features = new Feature(line);
        features.set('name', feature.properties.Name);
        features.setStyle(new Style({ fill: new Fill({ color: color }) }));
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
    const clusterLoader = new IBGECrimeClusterLoader();
    const ibgeCrimeCluster = clusterLoader.getJson();

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
        let color = this.colorArray[cluster];

        const line = new Polygon([cityCoordinates]);
        const features = new Feature(line);
        features.set('name', feature.properties.Name);
        features.setStyle(new Style({ fill: new Fill({ color: color }) }));
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

  private createMap(vectorLayer) {
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
}

