import { Component, OnInit } from '@angular/core';
import { GamemanagerService } from 'src/app/services/gamemanager/gamemanager.service';
import { ParamrouterService } from 'src/app/services/paramrouter/paramrouter.service';
import { ReferenceService } from 'src/app/services/reference/reference.service';
import { AlertController } from '@ionic/angular';
import { HttpResponse } from '@angular/common/http';
import { AlertOptions } from '@ionic/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { QuestionandcontentPage } from 'src/app/questionandcontent/questionandcontent.page';
@Component({
  selector: 'app-numerical',
  templateUrl: './numerical.component.html',
  styleUrls: ['./numerical.component.scss'],
})
export class NumericalComponent implements OnInit {
  content = "";
  private todo : FormGroup;

  constructor(private referenceService: ReferenceService,
    private gamemanagerService: GamemanagerService,
    private paramrouterService: ParamrouterService,
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    private questionandcontentPage: QuestionandcontentPage ) { 

      this.todo = this.formBuilder.group({
        number : [undefined, Validators.required],
      });
    }

  ngOnInit() {
    this.referenceService.getEscapeId().then(escape_id => {
      this.referenceService.getToken().then(token => {
          this.gamemanagerService.getQuestionPage(token, escape_id, this.paramrouterService.param.pageid).subscribe((res:any) => {
            this.content = res.page.contents;
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

  }

  onSubmit() {
    this.referenceService.getEscapeId().then(escape_id => {
      this.referenceService.getToken().then(token => {
        this.gamemanagerService.AnswerQuestion(token, escape_id, this.paramrouterService.param.pageid,+this.todo.value.number).subscribe((res:any) => {
            this.referenceService.getQuestionsList().then(getQuestionsList => {
              console.log(res);
              for (let pas = 0; pas < getQuestionsList.length; pas++) {
                if (getQuestionsList[pas].page.id == res.newpageid) {
                    this.paramrouterService.param = {"typeid" : getQuestionsList[pas].page.typeid, "pageid" : res.newpageid};
                    break;
                }
              }
              this.questionandcontentPage.ngAfterViewInit();
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
}
