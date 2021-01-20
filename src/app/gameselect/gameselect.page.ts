import { Component, OnInit } from '@angular/core';
import { GameslistService } from '../services/gameslist/gameslist.service';
import { HttpResponse } from '@angular/common/http';
import { AlertOptions } from '@ionic/core';
import { AlertController } from '@ionic/angular';
import { ReferenceService } from '../services/reference/reference.service';
import { GamemanagerService } from '../services/gamemanager/gamemanager.service';
import { Router } from '@angular/router';

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
    private referenceService: ReferenceService,
    private router: Router,
    private gamemanagerService: GamemanagerService) { }

  ngOnInit() {
    this.getEscapeList();
  }

  getEscapeList() {
    this.referenceService.getToken().then(token => {
      this.gameslistService.getEscapeListForAStudent(token).subscribe((res:any) => {
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
    })
  }

  launchGame(cmid, escape_id) {
    this.referenceService.setCmid(cmid);
    this.referenceService.setEscapeId(escape_id);

    this.referenceService.getToken().then(token => {
      this.gamemanagerService.getQuestionsList(token, escape_id).subscribe((res:any) => {
        if (res.hasOwnProperty("exception")) {
          let alertOptions: AlertOptions = {
            header: 'Erreur',
            buttons: ['Ok']
          }
          alertOptions.message = res.message;
          this.alertController.create(alertOptions).then(alertFire => alertFire.present());
        } else {
          console.log(res);
          this.referenceService.setQuestionsList(res.pages);
        }
      }, ( async (error: HttpResponse<Object>) => {
          let alertOptions: AlertOptions = {
            header: 'Erreur',
            message: error.statusText,
            buttons: ['Ok']
          }
            alertOptions.message = "Erreur Web avec service List Questions";
          
            let alertFire = await this.alertController.create(alertOptions);
            alertFire.present();
        })
      )
    })

   //this.router.navigate(['/gameselect'])
  }


}
