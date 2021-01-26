import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GamemanagerService } from '../services/gamemanager/gamemanager.service';
import { ParamrouterService } from '../services/paramrouter/paramrouter.service';
import { ReferenceService } from '../services/reference/reference.service';
import { AlertOptions } from '@ionic/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-questionandcontent',
  templateUrl: './questionandcontent.page.html',
  styleUrls: ['./questionandcontent.page.scss'],
})
export class QuestionandcontentPage implements OnInit {
  
  constructor(
    private paramrouterService: ParamrouterService,
    private referenceService: ReferenceService,
    private gamemanagerService: GamemanagerService,
    private alertController: AlertController) { }

  typeq = 0;
  title_question = '';
  ESCAPE_PAGE_TRUEFALSE = this.referenceService.ESCAPE_PAGE_TRUEFALSE;
  ESCAPE_PAGE_CLICKINGPICTURE = this.referenceService.ESCAPE_PAGE_CLICKINGPICTURE;
  ESCAPE_PAGE_SHORTANSWER = this.referenceService.ESCAPE_PAGE_SHORTANSWER;
  ESCAPE_PAGE_NUMERICAL = this.referenceService.ESCAPE_PAGE_NUMERICAL;
  ESCAPE_PAGE_MULTICHOICE = this.referenceService.ESCAPE_PAGE_MULTICHOICE;
  ESCAPE_PAGE_MATCHING = this.referenceService.ESCAPE_PAGE_MATCHING;
  ESCAPE_PAGE_BRANCHTABLE = this.referenceService.ESCAPE_PAGE_BRANCHTABLE

  ngOnInit() {
    this.typeq = this.paramrouterService.param.typeid;

    this.referenceService.getEscapeId().then(escape_id => {
      this.referenceService.getToken().then(token => {
        this.gamemanagerService.getQuestionPage(token, escape_id, this.paramrouterService.param.pageid).subscribe((res:any) => {
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
      })
  })
  }
}
