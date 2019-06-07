// The plotly example were obtained from https://plot.ly/javascript/line-and-scatter/

import { Component, OnInit } from '@angular/core';

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

  public criminalGraph;
  public ibgeGraph;
  public totalGraph;

  constructor() { 
    // this.createIBGEGraph();
    // this.createTotalGraph();
  }

  ngOnInit() {
    this.createCrimeGraph();
  }

  private createCrimeGraph () {
    const loader = new CrimeClusterLoader();
    const dt = loader.getJson();

    // New set will take the unique values
    const x_all = [];
    const y_all = [];
    const text_all = [];

    for (let key in dt) {
      const e = dt[key];
      try {
        x_all[e].push(e.x);
        y_all[e].push(e.y);
        text_all[e].push(e);
      } catch {
        x_all.push(e.x);
        y_all.push(e.y);
        text_all.push(e);
      }
    }

    const traces = [];
    for (var i = 0; i < x_all.length; i++) {
      traces.push ( {
        x : x_all[i],
        y : y_all[i],
        mode: 'markers+text',
        type: 'scatter',
        name: 'Cluser 1',
        text: text_all[i],
        textposition: 'top center',
        textfont: {
          family:  'Raleway, sans-serif'
        },
        marker: { size: 12 }
      } );
    }

    var layout = {
      xaxis: {
        range: [ -5.0, 5.0 ]
      },
      yaxis: {
        range: [-5.0, 5.0]
      },
      title:'Data Labels Hover'
    };

    this.criminalGraph = Plotly.newPlot('content', traces, layout);
    
  }

  private createIBGEGraph () {
    const loader = new IBGEClusterLoader();
    const dt = loader.getJson ();

    const x_all = [];
    const y_all = [];
    const text_all = [];

    dt.array.forEach ( function (e) {
      try {
        x_all[e].push(e.x);
        y_all[e].push(e.y);
        text_all[e].push(e);
      } catch {
        x_all.push(e.x);
        y_all.push(e.y);
        text_all.push(e);
      }
    }); 

    const traces = [];
    for (var i = 0; i < x_all.length; i++) {
      traces.push ( {
        x : x_all[i],
        y : y_all[i],
        mode: 'markers+text',
        type: 'scatter',
        name: 'Cluser 1',
        text: text_all[i],
        textposition: 'top center',
        textfont: {
          family:  'Raleway, sans-serif'
        },
        marker: { size: 12 }
      } );
    }

    var layout = {
      xaxis: {
        range: [ -5.0, 5.0 ]
      },
      yaxis: {
        range: [-5.0, 5.0]
      },
      title:'Data Labels Hover'
    };

    this.ibgeGraph = Plotly.newPlot('myDiv', traces, layout);

  }

  private createTotalGraph () {
    const loader = new IBGECrimeClusterLoader();
    const dt = loader.getJson ();

    const x_all = [];
    const y_all = [];
    const text_all = [];

    dt.array.forEach ( function (e) {
      try {
        x_all[e].push(e.x);
        y_all[e].push(e.y);
        text_all[e].push(e);
      } catch {
        x_all.push(e.x);
        y_all.push(e.y);
        text_all.push(e);
      }
    }); 

    const traces = [];
    for (var i = 0; i < x_all.length; i++) {
      traces.push ( {
        x : x_all[i],
        y : y_all[i],
        mode: 'markers+text',
        type: 'scatter',
        name: 'Cluser 1',
        text: text_all[i],
        textposition: 'top center',
        textfont: {
          family:  'Raleway, sans-serif'
        },
        marker: { size: 12 }
      } );
    }

    var layout = {
      xaxis: {
        range: [ -5.0, 5.0 ]
      },
      yaxis: {
        range: [-5.0, 5.0]
      },
      title:'Data Labels Hover'
    };

    this.criminalGraph = Plotly.newPlot('myDiv', traces, layout);

  }

}
