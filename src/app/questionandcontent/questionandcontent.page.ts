import { Component, OnInit } from '@angular/core';
import { ParamrouterService } from '../services/paramrouter/paramrouter.service';
import { ReferenceService } from '../services/reference/reference.service';

@Component({
  selector: 'app-questionandcontent',
  templateUrl: './questionandcontent.page.html',
  styleUrls: ['./questionandcontent.page.scss'],
})
export class QuestionandcontentPage implements OnInit {
  
  constructor(
    private paramrouterService: ParamrouterService,
    private referenceService: ReferenceService) { }

  typeq = 0;

  ESCAPE_PAGE_TRUEFALSE = this.referenceService.ESCAPE_PAGE_TRUEFALSE;
  ESCAPE_PAGE_CLICKINGPICTURE = this.referenceService.ESCAPE_PAGE_CLICKINGPICTURE;
  ESCAPE_PAGE_SHORTANSWER = this.referenceService.ESCAPE_PAGE_SHORTANSWER;
  ESCAPE_PAGE_NUMERICAL = this.referenceService.ESCAPE_PAGE_NUMERICAL;
  ESCAPE_PAGE_MULTICHOICE = this.referenceService.ESCAPE_PAGE_MULTICHOICE;
  ESCAPE_PAGE_MATCHING = this.referenceService.ESCAPE_PAGE_MATCHING;
  ESCAPE_PAGE_BRANCHTABLE = this.referenceService.ESCAPE_PAGE_BRANCHTABLE

  ngOnInit() {
    this.typeq = this.paramrouterService.param.typeid;
  }
}
