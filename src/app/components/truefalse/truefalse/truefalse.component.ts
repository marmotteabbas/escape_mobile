import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GamemanagerService } from 'src/app/services/gamemanager/gamemanager.service';
import { ParamrouterService } from 'src/app/services/paramrouter/paramrouter.service';
import { AlertOptions } from '@ionic/core';
import { AlertController } from '@ionic/angular';
import { ReferenceService } from 'src/app/services/reference/reference.service';

@Component({
  selector: 'app-truefalse',
  templateUrl: './truefalse.component.html',
  styleUrls: ['./truefalse.component.scss'],
})
export class TruefalseComponent implements OnInit {
  
  constructor(
    private paramrouterService: ParamrouterService,
    private gamemanagerService: GamemanagerService,
    private alertController: AlertController,
    private referenceService: ReferenceService) { }

  ngOnInit() {
    console.log("====>"+this.paramrouterService.param.pageid+" ____ "+this.paramrouterService.param.typeid);

    this.referenceService.getEscapeId().then(escape_id => {
      this.referenceService.getToken().then(token => {
        this.gamemanagerService.getQuestionPage(token, escape_id, this.paramrouterService.param.pageid).subscribe((res:any) => {
          console.log("laaalalallala =>");
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
      })
  })

  }

}
