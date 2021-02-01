import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GamemanagerService } from 'src/app/services/gamemanager/gamemanager.service';
import { ParamrouterService } from 'src/app/services/paramrouter/paramrouter.service';
import { ReferenceService } from 'src/app/services/reference/reference.service';
import { AlertOptions } from '@ionic/core';
import { AlertController } from '@ionic/angular';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-clickingpicture',
  templateUrl: './clickingpicture.component.html',
  styleUrls: ['./clickingpicture.component.scss'],
})


export class ClickingpictureComponent implements OnInit {

  content_page: SafeHtml;
  middleText = '';
  constructor(private referenceService: ReferenceService,
    private gamemanagerService: GamemanagerService,
    private paramrouterService: ParamrouterService,
    private alertController: AlertController,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.referenceService.getEscapeId().then(escape_id => {
      this.referenceService.getToken().then(token => {
        //Get the page 
        this.gamemanagerService.getQuestionPage(token, escape_id, this.paramrouterService.param.pageid).subscribe((res:any) => {
        
        //Get Intro content
        let start = '<span id=\'intro_text_clicking_pix\'>';
        let end = '</span>';
        this.middleText = res.page.contents.split(start)[1].split(end)[0];

        //Clean html code
        let pureSvg: string = res.page.contents.replace('onclick="require(\'mod_escape/img_manager\').coordsandintro(event)"','').replace(".png",".png?forcedownload=1&token="+token).replace("/pluginfile.php","/webservice/pluginfile.php").replace('<span id=\'intro_text_clicking_pix\'>','').replace('</span>','').replace(this.middleText,'').replace('<br />','').replace('<div class="no-overflow">','').replace("</div>","");
        
        this.content_page=this.sanitizer.bypassSecurityTrustHtml(pureSvg);
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

  clickPicture(event) {
    let offsetTop = document.getElementById('content_page').offsetTop;
    let offsetLeft = document.getElementById('content_page').offsetLeft

    let offsetTopMiddleTexte = document.getElementById('middleTexte').offsetTop
    
    console.log(offsetLeft+" "+offsetTop);
    console.log(event.clientX+" "+event.clientY);
//https://forum.ionicframework.com/t/how-to-get-ion-header-height-in-angular-the-right-way/186481/3
    let x = event.clientX-offsetLeft;
    let y = event.clientY-offsetTop;
    console.log('x: ' + x +' y: ' + y);
  }

}
