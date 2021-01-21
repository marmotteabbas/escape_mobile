import { Component, OnInit } from '@angular/core';
import { GameslistService } from '../services/gameslist/gameslist.service';
import { HttpResponse } from '@angular/common/http';
import { AlertOptions } from '@ionic/core';
import { AlertController } from '@ionic/angular';
import { ReferenceService } from '../services/reference/reference.service';
import { GamemanagerService } from '../services/gamemanager/gamemanager.service';
import { Router } from '@angular/router';
import { ParamrouterService } from '../services/paramrouter/paramrouter.service';

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
    private gamemanagerService: GamemanagerService, 
    private router: Router,
    private paramRouter: ParamrouterService) {}

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
      //Get the question list
      this.gamemanagerService.getQuestionsList(token, escape_id).subscribe((res:any) => {
        if (res.hasOwnProperty("exception")) {
          let alertOptions: AlertOptions = {
            header: 'Erreur',
            buttons: ['Ok']
          }
          alertOptions.message = res.message;
          this.alertController.create(alertOptions).then(alertFire => alertFire.present());
        } else {
          //lauch chrono
          this.gamemanagerService.launchrono(token, escape_id).subscribe(() => {
              console.log(res);
              this.referenceService.setQuestionsList(res.pages);
              console.log(res.pages[0].page);
              this.paramRouter.param = {"typeid" : res.pages[0].page.typeid, "pageid" : res.pages[0].page.id};
              console.log(res.pages[0].page.typeid);
              this.router.navigate(['/questionandcontent'])
          }, (async (error: HttpResponse<Object>) => {
              let alertOptions: AlertOptions = {
                header: 'Erreur',
                message: error.statusText,
                buttons: ['Ok']
              }
                alertOptions.message = "Erreur Web avec service Lauch chrono";
              
                let alertFire = await this.alertController.create(alertOptions);
                alertFire.present();
          })
         )
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
  }


}
