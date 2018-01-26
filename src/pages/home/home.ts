import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation, GeolocationOptions } from '@ionic-native/geolocation';

declare var google: any;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  places: Array<any>;

  constructor(public geolocation: Geolocation, public navCtrl: NavController) {
      this.places = [
        {name: "Magic Cyberjaya", lat: 2.9090524, lng: 101.6524803, icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'},
        {name: "MDEC", lat: 2.9091004, lng: 101.6371593, icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'},
        {name: "SKMM", lat: 2.9222988, lng: 101.6606272, icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'}
      ];
  }

  ionViewDidLoad(){
    let options: GeolocationOptions = {
      timeout: 60000
    }
    this.geolocation.getCurrentPosition(options).then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      console.log('Response: ');
      console.log(resp.coords);

      this.initMap(resp.coords.latitude, resp.coords.longitude );
     }).catch((error) => {
       console.log('Error getting location', error);
       this.initMap(2.9386246, 101.6545795);
     });

  }

  initMap(latitude: number, longitude: number){
    
    let lat: number = latitude;
    let lng: number = longitude;

    let center = new google.maps.LatLng(lat, lng);
    let mapOptions = {
      center: center,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    
    let currentLocation = {name: "My Location", lat: latitude, lng: longitude};
    this.places.push(currentLocation);
   
    for (let place of this.places){
      this.createMarker(place);
    }
    
  }

  createMarker(place: any){
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.BOUNCE, 
      position: {lat: place.lat, lng: place.lng},
      icon: place.icon
    });

    let content: string = '<strong>'+ place.name +'</strong>';

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
      setTimeout(()=>{
        infoWindow.close();
      }, 2000);
    });
  }



}
