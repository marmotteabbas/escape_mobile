import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { QuestionandcontentPage } from './questionandcontent.page';

import { QuestionandcontentPageRoutingModule } from './questionandcontent-routing.module';

import { TruefalseComponentModule } from '../components/truefalse/truefalse/truefalse.component.module';

import { ClickingPictureComponentModule } from '../components/clickingpicture/clickingpicture/clickingpicture.component.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuestionandcontentPageRoutingModule,
    TruefalseComponentModule,
    ClickingPictureComponentModule

  ],
  declarations: [QuestionandcontentPage]
})
export class QuestionandcontentPageModule {}
