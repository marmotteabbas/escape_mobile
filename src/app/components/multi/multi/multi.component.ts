import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GamemanagerService } from 'src/app/services/gamemanager/gamemanager.service';
import { ReferenceService } from 'src/app/services/reference/reference.service';
import { AlertOptions } from '@ionic/core';
import { AlertController } from '@ionic/angular';
import { ParamrouterService } from 'src/app/services/paramrouter/paramrouter.service';
import { QuestionandcontentPage } from 'src/app/questionandcontent/questionandcontent.page';

@Component({
  selector: 'app-multi',
  templateUrl: './multi.component.html',
  styleUrls: ['./multi.component.scss'],
})
export class MultiComponent implements OnInit {

  content = "";
  templateAnswers=[];
  idresponse;
  constructor(private referenceService:ReferenceService,
    private gamemanagerService:GamemanagerService,
    private alertController: AlertController,
    private paramrouterService: ParamrouterService,
    private questionandcontentPage: QuestionandcontentPage) { }

  ngOnInit() {
    this.referenceService.getCmid().then(cmid => {
      this.referenceService.getEscapeId().then(escape_id => {
        this.referenceService.getToken().then(token => {
            this.gamemanagerService.getQuestionPage(token, escape_id, this.paramrouterService.param.pageid).subscribe((res:any) => {
              this.gamemanagerService.getAnswers(token, escape_id, this.paramrouterService.param.pageid, cmid).subscribe((answers:any) => {
                this.content = res.page.contents;
                this.templateAnswers = answers.answers;

                console.log(this.templateAnswers);
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

  mapToLocalValue(event: any) {
    this.idresponse = event.detail.value;
  }

  onSubmit() {
    this.referenceService.getEscapeId().then(escape_id => {
      this.referenceService.getToken().then(token => {
        this.gamemanagerService.AnswerQuestion(token, escape_id, this.paramrouterService.param.pageid,+this.idresponse).subscribe((res:any) => {
            this.referenceService.getQuestionsList().then(getQuestionsList => {
              this.nextpagerouting(res, getQuestionsList);
            })
          }, ( async (error: HttpResponse<Object>) => {
            let alertOptions: AlertOptions = {
              header: 'Erreur',
              message: error.statusText,
              buttons: ['Ok']
            }
              alertOptions.message = "Erreur Web avec service Answer Question";
            
              let alertFire = await this.alertController.create(alertOptions);
              alertFire.present();
          })
        )
      })
    })
  }

  nextpagerouting(res, getQuestionsList) {
    this.questionandcontentPage.nextpagerouting(res, getQuestionsList);
  }

}
