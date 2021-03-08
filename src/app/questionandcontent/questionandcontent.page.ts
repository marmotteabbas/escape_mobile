import { HttpResponse } from '@angular/common/http';
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { GamemanagerService } from '../services/gamemanager/gamemanager.service';
import { ParamrouterService } from '../services/paramrouter/paramrouter.service';
import { ReferenceService } from '../services/reference/reference.service';
import { AlertOptions } from '@ionic/core';
import { AlertController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Map, tileLayer, marker, circle } from "leaflet";
import * as L from "leaflet";
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
@Component({
  selector: 'app-questionandcontent',
  templateUrl: './questionandcontent.page.html',
  styleUrls: ['./questionandcontent.page.scss'],
})
export class QuestionandcontentPage implements AfterViewInit {
  
  constructor(
    private paramrouterService: ParamrouterService,
    private referenceService: ReferenceService,
    private gamemanagerService: GamemanagerService,
    private alertController: AlertController,
    private platform: Platform,
    private router: Router,
    private geolocation: Geolocation) { }

  currentLatitude: Number;
  currentLongitude: Number;
  map: Map;
  newMarker: any;
  MarkerTarget: any;
  typeq = 0;
  title_question = '';
  ESCAPE_PAGE_TRUEFALSE = this.referenceService.ESCAPE_PAGE_TRUEFALSE;
  ESCAPE_PAGE_CLICKINGPICTURE = this.referenceService.ESCAPE_PAGE_CLICKINGPICTURE;
  ESCAPE_PAGE_SHORTANSWER = this.referenceService.ESCAPE_PAGE_SHORTANSWER;
  ESCAPE_PAGE_NUMERICAL = this.referenceService.ESCAPE_PAGE_NUMERICAL;
  ESCAPE_PAGE_MULTICHOICE = this.referenceService.ESCAPE_PAGE_MULTICHOICE;
  ESCAPE_PAGE_MATCHING = this.referenceService.ESCAPE_PAGE_MATCHING;
  ESCAPE_PAGE_BRANCHTABLE = this.referenceService.ESCAPE_PAGE_BRANCHTABLE
  ESCAPE_PAGE_END = -9;

  content = "";
  ngAfterViewInit() {       
    var goodlocate = false;
    this.typeq = this.paramrouterService.param.typeid;
    this.referenceService.getEscapeId().then(escape_id => {
      this.referenceService.getToken().then(token => {
        if (this.paramrouterService.param.pageid != -9) {
          this.gamemanagerService.getQuestionPage(token, escape_id, this.paramrouterService.param.pageid).subscribe((res:any) => {
            if (res.location != "" && goodlocate == false) {
              this.window_map_mask.nativeElement.style.display="block";
              this.window_map.nativeElement.style.display="block";
              if (!this.map) {
                  console.log("not map yet");
                  this.geolocation.getCurrentPosition().then((resp) => {
                    this.currentLatitude = resp.coords.latitude;
                    this.currentLongitude = resp.coords.longitude;
                    this.createMap(resp.coords.latitude, resp.coords.longitude, res.location.substring(1, res.location.length-1).split(",")[0], res.location.substring(1, res.location.length-1).split(",")[1]);  
                  }).catch((error) => {
                    console.log('Error getting location', error);
                  }) 

                  let watch = this.geolocation.watchPosition();
                  watch.subscribe((data: Geoposition) => {
                    console.log("watch position");
                    if ((data.coords.latitude >= +res.location.substring(1, res.location.length-1).split(",")[0] + 0.0001
                        ||
                        data.coords.latitude <= +res.location.substring(1, res.location.length-1).split(",")[0] - 0.0001
                        )
                        &&
                        (data.coords.longitude >= +res.location.substring(1, res.location.length-1).split(",")[1] + 0.0001
                        ||
                        data.coords.longitude <= +res.location.substring(1, res.location.length-1).split(",")[1] - 0.0001 
                        )
                    ) {
                      this.currentLatitude = data.coords.latitude;
                      this.currentLongitude = data.coords.longitude;
                      var greenIcon = this.getGreenIcon();
                      this.map.removeLayer(this.newMarker);
                      this.newMarker = marker([data.coords.latitude, data.coords.longitude], {icon: greenIcon}).addTo(this.map);
                    } else {
                      if (goodlocate == false) {
                        goodlocate = true;
                        this.goodPos();
                      }
                    }
                  });
              } else { // The map is already loaded, juste change the pointer
                this.map.removeLayer(this.newMarker);
                this.map.removeLayer(this.MarkerTarget);

                this.MarkerTarget = marker([res.location.substring(1, res.location.length-1).split(",")[0], res.location.substring(1, res.location.length-1).split(",")[1]], {}).addTo(this.map);

                var greenIcon = this.getGreenIcon();
                this.newMarker = marker([this.currentLatitude, this.currentLongitude], {icon: greenIcon}).addTo(this.map);
              //  this.map.zoomOut(1.2);
                this.map.fitBounds([[res.location.substring(1, res.location.length-1).split(",")[0], res.location.substring(1, res.location.length-1).split(",")[1]],[this.currentLatitude, this.currentLongitude]]);
                
                if (!((this.currentLatitude >= +res.location.substring(1, res.location.length-1).split(",")[0] + 0.0001
                        ||
                        this.currentLatitude <= +res.location.substring(1, res.location.length-1).split(",")[0] - 0.0001
                        )
                        &&
                        (this.currentLongitude >= +res.location.substring(1, res.location.length-1).split(",")[1] + 0.0001
                        ||
                        this.currentLongitude <= +res.location.substring(1, res.location.length-1).split(",")[1] - 0.0001 
                        )
                  )) {
                    if (goodlocate == false) {
                      goodlocate = true;
                      this.goodPos();
                    }
                }
              }
            }
            this.title_question = res.page.title;
            
          }, ( async (error: HttpResponse<Object>) => {
              let alertOptions: AlertOptions = {
                header: 'Erreur',
                message: error.statusText,
                buttons: ['Ok']
              }
                alertOptions.message = "Erreur Web avec service get_question";
              
                let alertFire = await this.alertController.create(alertOptions);
                alertFire.present();
            })
          )
        } else {
          this.gamemanagerService.stopchrono(token, escape_id).subscribe((res:any) => {
            this.title_question = "Fin de jeu";
            this.content = "Bravo vous avez plié le game! <br />" 
            + res.data[3].message + "<br />"
            + res.data[1].message + "<br />";
            

            console.log(res);
          }, ( async (error: HttpResponse<Object>) => {
              let alertOptions: AlertOptions = {
                header: 'Erreur',
                message: error.statusText,
                buttons: ['Ok']
              }
                alertOptions.message = "Erreur Web avec service get_question";
              
                let alertFire = await this.alertController.create(alertOptions);
                alertFire.present();
            })
          )
        }
        
      })
    })
  }
//https://gis.stackexchange.com/questions/259969/leaflet-how-to-update-user-position-marker-real-time
  createMap(lat_user, long_user, lat_target, long_target) { //on, modal
      this.map = new Map("map");
      this.map.fitBounds([[lat_user,long_user],[lat_target,long_target]]);

      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      { attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors,<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'}).addTo(this.map);
      
      this.MarkerTarget = marker([lat_target, long_target], {}).addTo(this.map);
  
      // create custom marker
      var greenIcon = this.getGreenIcon();
      this.newMarker = marker([lat_user, long_user], {icon: greenIcon}).addTo(this.map);
      this.map.fitBounds([[lat_target, long_target],[lat_user, long_user]]);
  }

  getGreenIcon() {
    return L.icon({
      iconUrl: 'https://static.thenounproject.com/png/331569-200.png',

      iconSize:     [50, 50], // size of the icon
      iconAnchor:   [25, 50], // point of the icon which will correspond to marker's location
    });
  }

  backToGameSelector() {
    this.router.navigate(['/gameselect'])
  }

  nextpagerouting(res, getQuestionsList) {
    if (res.newpageid != -9) {
      for (let pas = 0; pas < getQuestionsList.length; pas++) {
         if (getQuestionsList[pas].page.id == res.newpageid) {
            this.paramrouterService.param = {"typeid" : getQuestionsList[pas].page.typeid, "pageid" : res.newpageid};
            break;
         }
                }
                this.ngAfterViewInit();
              } else  {
                this.paramrouterService.param = {"typeid" : -9, "pageid" : -9};
                this.ngAfterViewInit();
              }
  }

  getHeaderHeight() {
      var height = this.myIdentifier.nativeElement.offsetHeight;
      return height;
  }
  
  goodPos() {
    let alertOptions: AlertOptions = {
      header: 'Localisation',
      buttons: ['Ok']
    }
    alertOptions.message = "Vous êtes arrivé à destination !"
    this.alertController.create(alertOptions).then(alertFire => alertFire.present());
    
    //this.map.removeLayer(this.MarkerTarget);
    this.window_map_mask.nativeElement.style.display="none";
    this.window_map.nativeElement.style.display="none";
  }

  @ViewChild('myIdentifier', {read: ElementRef}) myIdentifier: ElementRef;
  @ViewChild('window_map_mask', {read: ElementRef}) window_map_mask: ElementRef;
  @ViewChild('window_map', {read: ElementRef}) window_map: ElementRef;
  @ViewChild('map', {read: ElementRef}) mappy: ElementRef;
}
//https://www.itsolutionstuff.com/post/how-to-get-element-height-and-width-in-angularexample.html