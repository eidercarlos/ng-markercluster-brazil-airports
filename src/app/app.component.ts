import { Component } from '@angular/core';
import * as L from 'leaflet';
import { icon, latLng, marker } from 'leaflet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  map!: L.Map;
  markerClusterGroup: L.MarkerClusterGroup = L.markerClusterGroup({removeOutsideVisibleBounds: true});
  markerClusterData = [];

  options = {
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      })
    ],
    zoom: 4,
    center: { lat: -14.4095261, lng: -51.31668 }
  }

  initMarkers() {
    const initialMarkers = [
      {
        position: { lat: 28.625485, lng: 79.821091 }
      },
      {
        position: { lat: 28.625293, lng: 79.817926 },
      },
      {
        position: { lat: 28.625182, lng: 79.81464 },
      }
    ];
    
    for (let index = 0; index < initialMarkers.length; index++) {
      const mapIcon = this.getDefaultIcon();
      const data = initialMarkers[index];
      const coordinates = latLng([data.position.lat, data.position.lng]);
      let layer = marker(coordinates).setIcon(mapIcon);
      this.markerClusterGroup.addLayer(layer);
    }    

    this.addLayersToMap();
  }  

  private getDefaultIcon() {
      return icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'assets/marker-icon.png'
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
