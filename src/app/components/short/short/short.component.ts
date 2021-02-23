import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { GamemanagerService } from 'src/app/services/gamemanager/gamemanager.service';
import { ReferenceService } from 'src/app/services/reference/reference.service';
import { AlertOptions } from '@ionic/core';
import { AlertController } from '@ionic/angular';
import { ParamrouterService } from 'src/app/services/paramrouter/paramrouter.service';
import { QuestionandcontentPage } from 'src/app/questionandcontent/questionandcontent.page';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-short',
  templateUrl: './short.component.html',
  styleUrls: ['./short.component.scss'],
})
export class ShortComponent implements OnInit {
  content: string;
  private todo : FormGroup;

  constructor(private referenceService:ReferenceService,
    private gamemanagerService:GamemanagerService,
    private alertController: AlertController,
    private paramrouterService: ParamrouterService,
    private formBuilder: FormBuilder,
    private questionandcontentPage: QuestionandcontentPage) { 
      this.todo = this.formBuilder.group({
        answer : [undefined, Validators.required],
      });
    }

  ngOnInit() {
    this.referenceService.getCmid().then(cmid => {
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
    })
  }

  onSubmit() {
    this.referenceService.getEscapeId().then(escape_id => {
      this.referenceService.getToken().then(token => {
        this.gamemanagerService.AnswerQuestion(token, escape_id, this.paramrouterService.param.pageid,this.todo.value.answer).subscribe((res:any) => {
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
