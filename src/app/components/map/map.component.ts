import { Component, OnInit } from '@angular/core';

import Feature from 'ol/Feature.js';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import { LineString } from 'ol/geom';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import { OSM, Vector as VectorSource } from 'ol/source.js';
import { fromLonLat, transform } from 'ol/proj';
import { CommonStyle } from '../common/style.component';
import { CityLoader } from '../common/cityLoader.component';

// Some imports get from the OpenLayers/select-features example
import { click, pointerMove, altKeyOnly } from 'ol/events/condition.js';
import Select from 'ol/interaction/Select.js';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  private commonStyle = new CommonStyle();
  private cities = new CityLoader();

  public citiesInfo = this.cities.getJson()
  public styles = this.commonStyle.styles;

  var landmarks = new OpenLayers.Layer.Vector("NY Landmarks", {
    strategies: [new OpenLayers.Strategy.BBOX()],
    protocol: new OpenLayers.Protocol.WFS({
        version: "1.1.0",
        url: "/geoserver/wfs",
        featureType: "poly_landmarks",
        featureNS: "http://www.census.gov",
        srsName: "EPSG:4326"
    }),
    styleMap: new OpenLayers.StyleMap({
        "default": new OpenLayers.Style({
            strokeColor: "white",
            strokeWidth: 1
        }, {
            rules: [
                new OpenLayers.Rule({
                     filter: new OpenLayers.Filter.Logical({
                        type: OpenLayers.Filter.Logical.OR,
                        filters: [
                            new OpenLayers.Filter.Comparison({
                                type: OpenLayers.Filter.Comparison.EQUAL_TO,
                                property: "CFCC", value: "D82"
                            }),
                            new OpenLayers.Filter.Comparison({
                                type: OpenLayers.Filter.Comparison.EQUAL_TO,
                                property: "CFCC", value: "D83"
                            }),
                            new OpenLayers.Filter.Comparison({
                                type: OpenLayers.Filter.Comparison.EQUAL_TO,
                                property: "CFCC", value: "D84"
                            }),
                            new OpenLayers.Filter.Comparison({
                                type: OpenLayers.Filter.Comparison.EQUAL_TO,
                                property: "CFCC", value: "D85"
                            })
                        ]
                    }),
                    symbolizer: {
                        fillColor: "#B4DFB4",
                        strokeColor: "#88B588",
                        strokeWidth: 2
                    }
                }),
                new OpenLayers.Rule({
                    elseFilter: true,
                    symbolizer: {
                        fillColor: "navy"
                    }
                })
            ]
        })
    })
  }); 

  // select interaction working on "pointermove"
  public selectPointerMove = new Select({
    condition: pointerMove
  });

  public map: Map;
  public geojsonObject = {
  "type": "FeatureCollection",
  "crs": {
    "type": "name",
    "properties": {
      "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
    }
  },
  "features": [
    {
      "type": "Feature",
      "properties": {
        "Name": "PORTO ALEGRE",
        "Description": "PORTO ALEGRE \/ RS"
      },
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [
            -51.127285534599707,
            -29.954498621414189
          ],
          [
            -51.086367788042928,
            -29.970881204204144
          ],
          [
            -51.084771971649097,
            -30.04607410593519
          ],
          [
            -51.123616154961553,
            -30.055962459399947
          ],
          [
            -51.076138828044456,
            -30.175372185178158
          ],
          [
            -51.011942198673466,
            -30.198930770638523
          ],
          [
            -51.067839498394108,
            -30.250795244105174
          ],
          [
            -51.183466731404508,
            -30.233303078674112
          ],
          [
            -51.199723166291044,
            -30.19324623962223
          ],
          [
            -51.232546468544626,
            -30.183036443277221
          ],
          [
            -51.230900928634924,
            -30.137635636575336
          ],
          [
            -51.262011696882261,
            -30.121795297315092
          ],
          [
            -51.233423372290758,
            -30.055619228644446
          ],
          [
            -51.271899644752743,
            -30.038972080596974
          ],
          [
            -51.261811425057196,
            -30.009642552761537
          ],
          [
            -51.305833467640355,
            -29.950306382233688
          ],
          [
            -51.265662532499846,
            -29.934631324875681
          ],
          [
            -51.233640330137064,
            -29.93771516312421
          ],
          [
            -51.22069554616246,
            -29.967092995345411
          ],
          [
            -51.127285534599707,
            -29.954498621414189
          ]
        ]
      }
    }
  ]
}

public styleFunction = (feature) => {
  return this.styles[feature.getGeometry().getType()];
};

ngOnInit() {
  var vectorSource = new VectorSource();

  for (let feature of this.citiesInfo.features) {
    let cityCoordinates = [];

    for (let coord of feature.geometry.coordinates) {
      cityCoordinates.push(transform(coord, 'EPSG:4326', 'EPSG:3857'))
    }

    const line = new LineString(cityCoordinates)
    const features = new Feature(line)
    features.set('name', feature.properties.Name)
    vectorSource.addFeature(features)
  }

  var vectorLayer = new VectorLayer({
    source: vectorSource,
    style: this.styleFunction
  })

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
      zoom: 7
    })
  });

  this.changeInteraction();
}



private changeInteraction() {
  const select = this.selectPointerMove;
  this.map.addInteraction(select);
  select.on('select', function (e) {

    // document.getElementById('status').innerHTML = '&nbsp;' +
    //   e.target.getFeatures().getLength() +
    //   ' selected features (last operation selected ' + e.selected.length +
    //   ' and deselected ' + e.deselected.length + ' features)';
    // window.alert('Oi Andrey')

    console.log(e.target.getFeatures());
    console.log(e.select.length);
  }
  );
};



private andrey(){

  this.map.addLayer(this.landmarks);
}



}

