import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';



import { TruefalseComponent } from './truefalse.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [TruefalseComponent],
  exports: [TruefalseComponent]
})
export class TruefalseComponentModule {}

