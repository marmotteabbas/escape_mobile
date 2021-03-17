import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GamemanagerService } from 'src/app/services/gamemanager/gamemanager.service';
import { ParamrouterService } from 'src/app/services/paramrouter/paramrouter.service';
import { ReferenceService } from 'src/app/services/reference/reference.service';
import { AlertOptions } from '@ionic/core';
import { AlertController } from '@ionic/angular';
import { QuestionandcontentPage } from 'src/app/questionandcontent/questionandcontent.page';

@Component({
  selector: 'app-matching',
  templateUrl: './matching.component.html',
  styleUrls: ['./matching.component.scss'],
})
export class MatchingComponent implements OnInit {

  formResponse = [];
  templateAnswers = [];
  content = "";
  constructor(private referenceService: ReferenceService,
    private gamemanagerService: GamemanagerService,
    private paramrouterService: ParamrouterService,
    private alertController: AlertController,
    private questionandcontentPage: QuestionandcontentPage) { }

  ngOnInit() {
    this.referenceService.getEscapeId().then(escape_id => {
      this.referenceService.getToken().then(token => {
        this.referenceService.getCmid().then(cmid => {
          this.gamemanagerService.getQuestionPage(token, escape_id, this.paramrouterService.param.pageid).subscribe((res:any) => {
            this.gamemanagerService.getAnswers(token, escape_id, this.paramrouterService.param.pageid, cmid).subscribe((answers:any) => {
              this.content = res.page.contents;
              this.templateAnswers = answers.answers;
            }, ( async (error: HttpResponse<Object>) => {
              let alertOptions: AlertOptions = {
                header: 'Erreur',
                message: error.statusText,
                buttons: ['Ok']
              }
                alertOptions.message = "Erreur Web avec service get Answer";
              
                let alertFire = await this.alertController.create(alertOptions);
                alertFire.present();
            })
            )
          }, ( async (error: HttpResponse<Object>) => {
            let alertOptions: AlertOptions = {
              header: 'Erreur',
              message: error.statusText,
              buttons: ['Ok']
            }
              alertOptions.message = "Erreur Web avec service get question page";
            
              let alertFire = await this.alertController.create(alertOptions);
              alertFire.present();
          })
          )
        })
      })
    })

  }

  Submit() {
    if (this.formResponse.length == (this.templateAnswers.length-2)) {
      this.referenceService.getEscapeId().then(escape_id => {
        this.referenceService.getToken().then(token => {
          this.gamemanagerService.AnswerQuestionMultiple(token, escape_id, this.paramrouterService.param.pageid,this.formResponse).subscribe((res:any) => {
            if (res.hasOwnProperty("error")) {
              let alertOptions: AlertOptions = {
                header: 'Erreur',
                buttons: ['Ok']
              }
              alertOptions.message = "Erreur Moodle réponse web service Answer Question"
              this.alertController.create(alertOptions).then(alertFire => alertFire.present());
            } else {
              this.referenceService.getQuestionsList().then(getQuestionsList => { 
                this.nextpagerouting(res, getQuestionsList);
              })
            }
          }, ( async (error: HttpResponse<Object>) => {
            let alertOptions: AlertOptions = {
              header: 'Erreur',
              message: error.statusText,
              buttons: ['Ok']
            }
              alertOptions.message = "Erreur Web avec service AnswerQuestionMultiple";
            
              let alertFire = await this.alertController.create(alertOptions);
              alertFire.present();
          })
          )
        })
      })
    } else {
      let alertOptions: AlertOptions = {
        header: 'Erreur',
        message: "Toute les correpondances n'ont pas été faites, veuilleuz mettre une réponse en face de chaque proposition.",
        buttons: ['Ok']
      }
      this.alertController.create(alertOptions).then(alertFire => alertFire.present());
    }
  }
  mapToLocalValue(event: any, idresponse: Number) {
    this.formResponse.push([idresponse, event.detail.value]);
  }

  nextpagerouting(res, getQuestionsList) {
    this.questionandcontentPage.nextpagerouting(res, getQuestionsList);
  }

}
