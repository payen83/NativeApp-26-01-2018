import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  QRText: string;
  constructor(public barcodeScanner: BarcodeScanner, public navCtrl: NavController, public navParams: NavParams) {
   
  }

  scan(){

    this.barcodeScanner.scan().then(barcodeData => {
      this.QRText = barcodeData.text;
      //const browser = this.iab.create(barcodeData.text);
    }).catch(err => {
      alert('Error: ' + JSON.stringify(err));
    })

  }


  
}
