import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GamemanagerService } from 'src/app/services/gamemanager/gamemanager.service';
import { ParamrouterService } from 'src/app/services/paramrouter/paramrouter.service';
import { ReferenceService } from 'src/app/services/reference/reference.service';
import { AlertOptions } from '@ionic/core';
import { AlertController, Platform } from '@ionic/angular';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { QuestionandcontentPage } from 'src/app/questionandcontent/questionandcontent.page';

@Component({
  selector: 'app-clickingpicture',
  templateUrl: './clickingpicture.component.html',
  styleUrls: ['./clickingpicture.component.scss'],
})


export class ClickingpictureComponent implements OnInit {

  content_page: SafeHtml;
  middleText = '';
  ratio=1;
  constructor(private referenceService: ReferenceService,
    private gamemanagerService: GamemanagerService,
    private paramrouterService: ParamrouterService,
    private alertController: AlertController,
    private sanitizer: DomSanitizer,
    private questionandcontentPage: QuestionandcontentPage,
    private platform: Platform) { }

  ngOnInit() {
    this.referenceService.getEscapeId().then(escape_id => {
      this.referenceService.getToken().then(token => {
        //Get the page 
        this.gamemanagerService.getQuestionPage(token, escape_id, this.paramrouterService.param.pageid).subscribe((res:any) => {

        //Get Intro content
        let start = '<span id=\'intro_text_clicking_pix\'>';
        let end = '</span>';
        this.middleText = res.page.contents.split(start)[1].split(end)[0];

        let svg = this.purifingSvg(res, token);
        this.content_page=this.sanitizer.bypassSecurityTrustHtml(svg);
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

  purifingSvg(res: any, token: string) {
    //Clean html code
    let pureSvg: string = res.page.contents.replace('onclick="require(\'mod_escape/img_manager\').coordsandintro(event)"','').replace(".png",".png?forcedownload=1&token="+token).replace("/pluginfile.php","/webservice/pluginfile.php").replace('<span id=\'intro_text_clicking_pix\'>','').replace('</span>','').replace(this.middleText,'').replace('<br />','').replace('<div class="no-overflow">','').replace("</div>","");
    
    var indexHeight = pureSvg.indexOf("height");
    var indexEndBalise = pureSvg.indexOf(">");
    
    
    let sizeSubstring: String = pureSvg.substr(indexHeight, (indexEndBalise-indexHeight)+1);

    let sizeFirstIndex = sizeSubstring.indexOf('width="')+7;
    let sizeLastIndex = sizeSubstring.indexOf('" >');
    var widthSVG = +sizeSubstring.substr(sizeFirstIndex, sizeLastIndex-sizeFirstIndex)

    let heightData = sizeSubstring.indexOf('height="')+8;
    let heightDataEnd = sizeSubstring.indexOf('" width=');
    let heightSVG = +sizeSubstring.substr(heightData,heightDataEnd-heightData)
    
    pureSvg = pureSvg.replace(pureSvg.substr(indexHeight, indexEndBalise-indexHeight), "");

    let ratio = this.platform.width()/widthSVG;

    if (!((this.platform.width() >= (ratio*widthSVG)) && (this.platform.height() >= (ratio*heightSVG)))) {
      ratio = this.platform.height()/heightSVG;
      console.log("new ratio");
    }
    
    console.log(ratio*widthSVG);
    console.log(ratio*heightSVG);
    this.ratio = ratio;
    
    var circles: Array<String> = new Array();

    /* Manage circles */
    while (pureSvg.indexOf('<circle') !== -1) {
      let start = pureSvg.indexOf('<circle');
      let end = pureSvg.indexOf('</circle>');
      let oneCircle = pureSvg.substr(start, end-start+9);
  
      let cx = oneCircle.indexOf('cx="')+4;
      let cxEnd = oneCircle.indexOf('" cy');
      let xValue = +oneCircle.substr(cx, cxEnd-cx);
  
      let cy = oneCircle.indexOf('cy="')+4;
      let cyEnd = oneCircle.indexOf('" r=');
      let yValue = +oneCircle.substr(cy, cyEnd-cy);
      
      let newx = xValue*ratio;
      let newy = yValue*ratio;
      oneCircle = oneCircle.replace('cx="'+xValue, 'cx="'+newx.toFixed(3)).replace('cy="'+yValue, 'cy="'+newy.toFixed(3));
  
      circles.push(oneCircle);
      pureSvg = pureSvg.replace(pureSvg.substr(start, end-start+9), "");
    }

    circles.forEach(cir => pureSvg = pureSvg.replace("</svg>", cir+"</svg>"));
    pureSvg = pureSvg.replace("<svg ", "<svg "+'width="'+(ratio*widthSVG)+'" height="'+(ratio*heightSVG)+'"');

    let idw1 = pureSvg.indexOf('style="width:');
    let idw2 = pureSvg.indexOf(';">');
    let subw = pureSvg.substr(idw1, idw2 -idw1);

    let neww = 'style="width:'+this.platform.width();
    pureSvg = pureSvg.replace(subw, neww);
    /************************/

    return pureSvg;
  }

  clickPicture(event) {
    let offsetTop = document.getElementById('content_page').offsetTop;
    let offsetLeft = document.getElementById('content_page').offsetLeft

    let offsetTopMiddleTexte = document.getElementById('middleTexte').offsetTop
    
    let x = event.clientX-offsetLeft;
    let y = event.clientY-offsetTop-this.questionandcontentPage.getHeaderHeight();

    this.referenceService.getEscapeId().then(escape_id => {
      this.referenceService.getToken().then(token => {
        this.referenceService.getCmid().then(cmid => {
        this.gamemanagerService.getAnswers(token,escape_id , this.paramrouterService.param.pageid, cmid).subscribe((answers:any) => {     
          var el;
          answers.answers.forEach(
            element => {
              if ((parseInt(this.cleanCoord(element.answer)[0])*this.ratio) < (x+10) && (parseInt(this.cleanCoord(element.answer)[0])*this.ratio) > (x-10)) {
                if ((parseInt(this.cleanCoord(element.answer)[1])*this.ratio) < (y+10) && (parseInt(this.cleanCoord(element.answer)[1])*this.ratio) > (y-10)) {
                    el = element;
                }
              }
            }
          );
          this.gamemanagerService.ProcessPage(token,escape_id , this.paramrouterService.param.pageid, el.jumpto, cmid).subscribe((processp:any) => { 
              this.referenceService.getQuestionsList().then(getQuestionsList => { 
                this.nextpagerouting(processp, getQuestionsList);
              })

            }, ( async (error: HttpResponse<Object>) => {
              let alertOptions: AlertOptions = {
                header: 'Erreur',
                message: error.statusText,
                buttons: ['Ok']
              }
                alertOptions.message = "Erreur Web avec service get Process page cliking picture";
              
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
              alertOptions.message = "Erreur Web avec service get answers Clicking Picture";
            
              let alertFire = await this.alertController.create(alertOptions);
              alertFire.present();
          })
        )
        });
      });
    });
  }

  cleanCoord(StringCoord: String) {
    return StringCoord.slice(1,-1).split(",");
  }

  nextpagerouting(res, getQuestionsList) {
    this.questionandcontentPage.nextpagerouting(res, getQuestionsList);
  }
  

}
