import { Component } from '@angular/core';
import * as L from 'leaflet';
import { icon, latLng, marker } from 'leaflet';
import * as geoJsonData from '../assets/brazil_airports.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  map!: L.Map;
  markerClusterGroup!: L.MarkerClusterGroup;
  markerClusterData = [];
  brazilAirportsMarkers: any = geoJsonData;
  buildUrl = 'https://eidercarlos.github.io/ng-markercluster-brazil-airports-build/';

  options = {
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      })
    ],
    zoom: 4,
    center: { lat: -14.4095261, lng: -51.31668 }
  }

  ngOnInit(){
    this.markerClusterGroup = L.markerClusterGroup({removeOutsideVisibleBounds: true});
  }

  initMarkers() {

    this.brazilAirportsMarkers.response.forEach( (item:any) => {
      const mapIcon = this.getDefaultIcon();
      const coordinates = latLng([item.lat, item.lng]);
      let layer = marker(coordinates).setIcon(mapIcon);
      this.markerClusterGroup.addLayer(layer);
    });        

    this.addLayersToMap();
  }  
  
  private getDefaultIcon() {
      return icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: this.buildUrl+'assets/marker-icon.png'
    });
  }
  
  private addLayersToMap() {
    this.markerClusterGroup.addTo(this.map);
  }

  onMapReady($event: L.Map) {
    this.map = $event;
    this.initMarkers();
  }  

}
