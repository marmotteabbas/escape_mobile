import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GamemanagerService } from 'src/app/services/gamemanager/gamemanager.service';
import { ParamrouterService } from 'src/app/services/paramrouter/paramrouter.service';
import { ReferenceService } from 'src/app/services/reference/reference.service';
import { AlertOptions } from '@ionic/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-matching',
  templateUrl: './matching.component.html',
  styleUrls: ['./matching.component.scss'],
})
export class MatchingComponent implements OnInit {

  formResponse = [];
  templateAnswers = [];
  constructor(private referenceService: ReferenceService,
    private gamemanagerService: GamemanagerService,
    private paramrouterService: ParamrouterService,
    private alertController: AlertController) { }

  ngOnInit() {
    this.referenceService.getEscapeId().then(escape_id => {
      this.referenceService.getToken().then(token => {
        this.referenceService.getCmid().then(cmid => {
          this.gamemanagerService.getQuestionPage(token, escape_id, this.paramrouterService.param.pageid).subscribe((res:any) => {
            this.gamemanagerService.getAnswers(token, escape_id, this.paramrouterService.param.pageid, cmid).subscribe((answers:any) => {
            
              console.log(res);
              console.log(answers);
              /*
              delete answers.answers[0];
              delete answers.answers[1];
*/
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
    this.referenceService.getEscapeId().then(escape_id => {
      this.referenceService.getToken().then(token => {
        this.gamemanagerService.AnswerQuestionMultiple(token, escape_id, this.paramrouterService.param.pageid,this.formResponse).subscribe((res:any) => {
          console.log(res);
          if (res.hasOwnProperty("error")) {
            let alertOptions: AlertOptions = {
              header: 'Erreur',
              buttons: ['Ok']
            }
            alertOptions.message = "Erreur Moodle réponse web service Answer Question"
            this.alertController.create(alertOptions).then(alertFire => alertFire.present());
          } else {
            console.log("thats ok");
           // this.router.navigate(['/gameselect'])
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

  }
  mapToLocalValue(event: any, idresponse: Number) {
    console.log(idresponse);
    console.log(event.detail.value);
    this.formResponse.push([idresponse, event.detail.value]);
  }

}
