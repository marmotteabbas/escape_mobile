import { Component, OnInit } from '@angular/core';
import { ReferenceService } from 'src/app/services/reference/reference.service';
import { HttpResponse } from '@angular/common/http';
import { GamemanagerService } from 'src/app/services/gamemanager/gamemanager.service';
import { ParamrouterService } from 'src/app/services/paramrouter/paramrouter.service';
import { AlertController } from '@ionic/angular';
import { AlertOptions } from '@ionic/core';
import { QuestionandcontentPage } from 'src/app/questionandcontent/questionandcontent.page';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit {
  content = "";
  templateAnswers = [];
  constructor(
    private referenceService:ReferenceService,
    private gamemanagerService: GamemanagerService,
    private paramrouterService: ParamrouterService,
    private alertController: AlertController,
    private questionandcontentPage: QuestionandcontentPage
    ) { }

  ngOnInit() {
    this.referenceService.getEscapeId().then(escape_id => {
      this.referenceService.getToken().then(token => {
        this.referenceService.getCmid().then(cmid => {
        this.gamemanagerService.getQuestionPage(token, escape_id, this.paramrouterService.param.pageid).subscribe((res:any) => {
          this.gamemanagerService.getAnswers(token, escape_id, this.paramrouterService.param.pageid, cmid).subscribe((answers:any) => {
            this.content = res.page.contents;
            for (let i = 0; i < answers.answers.length; i++) {
              this.templateAnswers.push([{jumpto: answers.answers[i].jumpto}, {answer: answers.answers[i].answer}]); 
            }
          }, ( async (error: HttpResponse<Object>) => {
            let alertOptions: AlertOptions = {
              header: 'Erreur',
              message: error.statusText,
              buttons: ['Ok']
            }
              alertOptions.message = "Erreur Web avec service get answers";
            
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
            alertOptions.message = "Erreur Web avec service get QuestionPage";
          
            let alertFire = await this.alertController.create(alertOptions);
            alertFire.present();

        })
        )
       })
      })
    })
  }

  submitit(jump: number) {
    this.referenceService.getEscapeId().then(escape_id => {
      this.referenceService.getToken().then(token => {
        this.referenceService.getCmid().then(cmid => {
          this.gamemanagerService.ProcessPage(token,escape_id , this.paramrouterService.param.pageid, jump, cmid).subscribe((processp:any) => {
                this.referenceService.getQuestionsList().then(getQuestionsList => { 
                  this.nextpagerouting(processp, getQuestionsList);
                })
          }, ( async (error: HttpResponse<Object>) => {
            let alertOptions: AlertOptions = {
              header: 'Erreur',
              message: error.statusText,
              buttons: ['Ok']
            }
              alertOptions.message = "Erreur Web avec service Process Page (Content)";
            
              let alertFire = await this.alertController.create(alertOptions);
              alertFire.present();
          })
          )

        })
      })
    })
    
  }

  nextpagerouting(res, getQuestionsList) {
    this.questionandcontentPage.nextpagerouting(res, getQuestionsList);
  }
  
}
