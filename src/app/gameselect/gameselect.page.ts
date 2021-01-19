import { Component, OnInit } from '@angular/core';
import { GameslistService } from '../services/gameslist/gameslist.service';
import { HttpResponse } from '@angular/common/http';
import { AlertOptions } from '@ionic/core';
import { AlertController } from '@ionic/angular';
import { ReferenceService } from '../services/reference/reference.service';

@Component({
  selector: 'app-gameselect',
  templateUrl: './gameselect.page.html',
  styleUrls: ['./gameselect.page.scss'],
})
export class GameselectPage implements OnInit {

  list = [];
  constructor(
    private gameslistService: GameslistService,
    private alertController: AlertController,
    private referenceService: ReferenceService) { }

  ngOnInit() {
    this.getEscapeList();
  }

  getEscapeList() {
    this.gameslistService.getEscapeListForAStudent(this.referenceService.getToken()).subscribe((res:any) => {
      console.log("escapeList");
      console.log(res.escapes);  
      this.list = res.escapes;
    }, ( async (error: HttpResponse<Object>) => {
        let alertOptions: AlertOptions = {
          header: 'Erreur',
          message: error.statusText,
          buttons: ['Ok']
        }
          alertOptions.message = "Erreur Web avec service List Escape";
        
          let alertFire = await this.alertController.create(alertOptions);
          alertFire.present();
      })
    )
  }

  buttonClick(name) {
    console.log("buttonclickkkkkkkkkkkkkk"+name);
  }


}
