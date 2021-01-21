import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionandcontentPage } from './questionandcontent.page';

const routes: Routes = [
  {
    path: '',
    component: QuestionandcontentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionandcontentPageRoutingModule {}
