import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { SocialSharing } from '@ionic-native/social-sharing';

@IonicPage()
@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
})
export class CameraPage {
  myimage: any;
  constructor(public camera: Camera, public socialsharing: SocialSharing,  public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CameraPage');
  }

  takePicture(){

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
      correctOrientation: true
    }
    
    this.camera.getPicture(options).then((imageData) => {
     let base64Image = 'data:image/jpeg;base64,' + imageData;
     this.myimage = base64Image;
    }, (err) => {
     alert('Error: ' + JSON.stringify(err));
    });
  }

  shareFB(){

    this.socialsharing.share('Share from my awesome app!', 'Hello!', this.myimage).then((response) => {
        //alert('Sharing successful!');
        //alert(JSON.stringify(response));
    }).catch(err => {
      alert('Error: ' + JSON.stringify(err));
    })
  }

}
