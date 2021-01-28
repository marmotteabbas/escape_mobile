import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GamemanagerService } from 'src/app/services/gamemanager/gamemanager.service';
import { ParamrouterService } from 'src/app/services/paramrouter/paramrouter.service';
import { ReferenceService } from 'src/app/services/reference/reference.service';
import { AlertOptions } from '@ionic/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-clickingpicture',
  templateUrl: './clickingpicture.component.html',
  styleUrls: ['./clickingpicture.component.scss'],
})


export class ClickingpictureComponent implements OnInit {

  content_page="";

  constructor(private referenceService: ReferenceService,
    private gamemanagerService: GamemanagerService,
    private paramrouterService: ParamrouterService,
    private alertController: AlertController) { }

  ngOnInit() {
    this.referenceService.getEscapeId().then(escape_id => {
      this.referenceService.getToken().then(token => {
        //Get the page 
        this.gamemanagerService.getQuestionPage(token, escape_id, this.paramrouterService.param.pageid).subscribe((res:any) => {
        this.content_page='data:image/svg+xml;utf8,<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><path d="M384 0h-288c-17.6 0-32 14.399-32 32v448c0 17.6 14.399 32 32 32h288c17.6 0 32-14.4 32-32v-448c0-17.601-14.4-32-32-32zM240 488.891c-13.746 0-24.891-11.145-24.891-24.891s11.145-24.891 24.891-24.891 24.891 11.145 24.891 24.891-11.145 24.891-24.891 24.891zM384 416h-288v-352h288v352z"></path></svg>';
        //res.page.contents;
        console.log(this.content_page);
        }, ( async (error: HttpResponse<Object>) => {
          let alertOptions: AlertOptions = {
            header: 'Erreur',
            message: error.statusText,
            buttons: ['Ok']
          }
            alertOptions.message = "Erreur Web avec service Get Question Cliking Picture";
          
            let alertFire = await this.alertController.create(alertOptions);
            alertFire.present();
        })
      )

      })
    })
  }

}
