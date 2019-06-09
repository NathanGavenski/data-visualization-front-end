// The plotly example were obtained from https://plot.ly/javascript/line-and-scatter/

import { Component, OnInit, Input } from '@angular/core';

import { CrimeClusterLoader } from '../../../common/crimeClusterLoader.component';
import { IBGEClusterLoader } from '../../../common/ibgeClusterLoader.component';
import { IBGECrimeClusterLoader } from '../../../common/ibgeCrimeClusterLoader.components';
import Plotly from 'plotly.js-dist';


@Component({
  selector: 'app-crime-graph',
  templateUrl: './crime-graph.component.html',
  styleUrls: ['./crime-graph.component.scss']
})
export class CrimeGraphComponent implements OnInit {
  @Input() selectedType;
  
  public criminalGraph;
  public ibgeGraph;
  public totalGraph;

  constructor() { 
    
  }

  ngOnInit() {
    this.createCrimeGraph();
    this.createIBGEGraph();
    this.createTotalGraph();
    console.log(this.selectedType);
  }

  private createCrimeGraph () {
    console.log("comecei");
    const loader = new CrimeClusterLoader();
    const dt = loader.getJson();

    const labels = [];
    for (let key in dt) {
      labels.push(dt[key].Label);
    }
    const unique_labels = labels.filter((v, i, a) => a.indexOf(v) === i);
    const length_labels = unique_labels.length;
    const x_all = new Array(length_labels);
    const y_all = new Array(length_labels);
    const text_all = new Array(length_labels);
    const min_x;
    const max_x;
    const min_y;
    const max_y;
    const i = 1;
    for (var i = 0; i < x_all.length; i++) {
      x_all[i] = [];
      y_all[i] = [];
      text_all[i] = [];
    }
    for (let key in dt) {
      const e = dt[key];
      x_all[e.Label].push(e.x);
      y_all[e.Label].push(e.y);
      text_all[e.Label].push(key);
      if (i == 1) {
        min_x = e.x;
        max_x = e.x;
        min_y = e.y;
        max_y = e.y;
        i = 0;
      } else {
        if (e.x < min_x) min_x = e.x;
        else if (e.x > max_x) max_x = e.x;
        if (e.y < min_y) min_y = e.y;
        else if (e.y > max_y) max_y = e.y;
      }
    }
    max_x = max_x + 1.0;
    min_x = min_x - 1.0;
    max_y = max_y + 1.0;
    min_y = min_y - 1.0;
    const traces = [];
    for (var i = 0; i < x_all.length; i++) {
      traces.push ( {
        x : x_all[i],
        y : y_all[i],
        mode: 'markers',
        type: 'scatter',
        name: 'Cluser ' + i,
        text: text_all[i],
        textposition: 'top center',
        textfont: {
          family:  'Raleway, sans-serif'
        },
        marker: { size: 9 }
      } );
    }

    var layout = {
      xaxis: {
        range: [ min_x, max_x ]
      },
      yaxis: {
        range: [ min_y, max_y ]
      },
      title: "Distribuição dos Dados Criminais"
    };

    this.criminalGraph = Plotly.newPlot('content_criminal', traces, layout);
    
  }

  private createIBGEGraph () {
    const loader = new IBGEClusterLoader();
    const dt = loader.getJson ();

    const labels = [];
    for (let key in dt) {
      labels.push(dt[key].Label);
    }
    const unique_labels = labels.filter((v, i, a) => a.indexOf(v) === i);
    const length_labels = unique_labels.length;
    const x_all = new Array(length_labels);
    const y_all = new Array(length_labels);
    const text_all = new Array(length_labels);
    const min_x;
    const max_x;
    const min_y;
    const max_y;
    const i = 1;
    for (var i = 0; i < x_all.length; i++) {
      x_all[i] = [];
      y_all[i] = [];
      text_all[i] = [];
    }
    for (let key in dt) {
      const e = dt[key];
      x_all[e.Label].push(e.x);
      y_all[e.Label].push(e.y);
      text_all[e.Label].push(key);
      if (i == 1) {
        min_x = e.x;
        max_x = e.x;
        min_y = e.y;
        max_y = e.y;
        i = 0;
      } else {
        if (e.x < min_x) min_x = e.x;
        else if (e.x > max_x) max_x = e.x;
        if (e.y < min_y) min_y = e.y;
        else if (e.y > max_y) max_y = e.y;
      }
    }
    max_x = max_x + 1.0;
    min_x = min_x - 1.0;
    max_y = max_y + 1.0;
    min_y = min_y - 1.0;
    const traces = [];
    for (var i = 0; i < x_all.length; i++) {
      traces.push ( {
        x : x_all[i],
        y : y_all[i],
        mode: 'markers',
        type: 'scatter',
        name: 'Cluser ' + i,
        text: text_all[i],
        textposition: 'top center',
        textfont: {
          family:  'Raleway, sans-serif'
        },
        marker: { size: 9 }
      } );
    }

    var layout = {
      xaxis: {
        range: [ min_x, max_x ]
      },
      yaxis: {
        range: [ min_y, max_y ]
      },
      title: "Distribuição dos Dados do IBGE"
    };

    this.ibgeGraph = Plotly.newPlot('content_ibge', traces, layout);

  }

  private createTotalGraph () {
    const loader = new IBGECrimeClusterLoader();
    const dt = loader.getJson ();

    const labels = [];
    for (let key in dt) {
      labels.push(dt[key].Label);
    }
    const unique_labels = labels.filter((v, i, a) => a.indexOf(v) === i);
    const length_labels = unique_labels.length;
    const x_all = new Array(length_labels);
    const y_all = new Array(length_labels);
    const text_all = new Array(length_labels);
    const min_x;
    const max_x;
    const min_y;
    const max_y;
    const i = 1;
    for (var i = 0; i < x_all.length; i++) {
      x_all[i] = [];
      y_all[i] = [];
      text_all[i] = [];
    }
    for (let key in dt) {
      const e = dt[key];
      x_all[e.Label].push(e.x);
      y_all[e.Label].push(e.y);
      text_all[e.Label].push(key);
      if (i == 1) {
        min_x = e.x;
        max_x = e.x;
        min_y = e.y;
        max_y = e.y;
        i = 0;
      } else {
        if (e.x < min_x) min_x = e.x;
        else if (e.x > max_x) max_x = e.x;
        if (e.y < min_y) min_y = e.y;
        else if (e.y > max_y) max_y = e.y;
      }
    }
    max_x = max_x + 1.0;
    min_x = min_x - 1.0;
    max_y = max_y + 1.0;
    min_y = min_y - 1.0;
    const traces = [];
    for (var i = 0; i < x_all.length; i++) {
      traces.push ( {
        x : x_all[i],
        y : y_all[i],
        mode: 'markers',
        type: 'scatter',
        name: 'Cluser ' + i,
        text: text_all[i],
        textposition: 'top center',
        textfont: {
          family:  'Raleway, sans-serif'
        },
        marker: { size: 9 }
      } );
    }

    var layout = {
      xaxis: {
        range: [ min_x, max_x ]
      },
      yaxis: {
        range: [ min_y, max_y ]
      },
      title: "Distribuição dos Dados do IBGE + Criminais"
    };

    this.criminalGraph = Plotly.newPlot('content_total', traces, layout);

  }


}
