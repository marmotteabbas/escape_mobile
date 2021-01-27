import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GamemanagerService } from 'src/app/services/gamemanager/gamemanager.service';
import { ParamrouterService } from 'src/app/services/paramrouter/paramrouter.service';
import { AlertOptions } from '@ionic/core';
import { AlertController } from '@ionic/angular';
import { ReferenceService } from 'src/app/services/reference/reference.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-truefalse',
  templateUrl: './truefalse.component.html',
  styleUrls: ['./truefalse.component.scss'],
})
export class TruefalseComponent implements OnInit {
  
  content = "";
  title = "";
  templateAnswers = [];
  formResponse = {"response": ""};
  constructor(
    private paramrouterService: ParamrouterService,
    private gamemanagerService: GamemanagerService,
    private alertController: AlertController,
    private referenceService: ReferenceService,
    private router: Router) { }

  ngOnInit() {
    this.referenceService.getEscapeId().then(escape_id => {
      this.referenceService.getToken().then(token => {
        //Get the page 
        this.gamemanagerService.getQuestionPage(token, escape_id, this.paramrouterService.param.pageid).subscribe((res:any) => {
          this.content = res.page.contents;
            //Get answers of the question to make a list
            this.gamemanagerService.getAnswers(token, escape_id, this.paramrouterService.param.pageid, this.paramrouterService.param.cmdi).subscribe((answers:any) => {
              for (let i = 0; i < res.answers.length; i++) {
                let tab = answers.answers.filter(a => +a.id === +res.answers[i].id);
                this.templateAnswers.push([{id: tab[0].id}, {answer: tab[0].answer}]); 
              }
              
              console.log(this.templateAnswers);
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
              alertOptions.message = "Erreur Web avec service get_question";
            
              let alertFire = await this.alertController.create(alertOptions);
              alertFire.present();
          })
        )
      })
  })

  }

  onSubmit() {
    this.referenceService.getEscapeId().then(escape_id => {
      this.referenceService.getToken().then(token => {
        this.gamemanagerService.AnswerQuestion(token, escape_id, this.paramrouterService.param.pageid,+this.formResponse.response).subscribe((res:any) => {
            this.referenceService.getQuestionsList().then(getQuestionsList => {
              for (let pas = 0; pas < getQuestionsList.length; pas++) {
                if (getQuestionsList[pas] == res.newpageid) {
                    this.paramrouterService.param = {"typeid" : getQuestionsList.pages[pas].page.typeid, "pageid" : res.newpageid};
                    break;
                }
              }
              console.log(this.paramrouterService.param);
              this.router.navigate(['/questionandcontent']);
            })

            //this.paramrouterService.param = {"typeid" : res.pages[0].page.typeid, "pageid" : res.newpageid};
            
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

  mapToLocalValue(event: any) {
    this.formResponse = {"response" : event.detail.value};
  }

}
