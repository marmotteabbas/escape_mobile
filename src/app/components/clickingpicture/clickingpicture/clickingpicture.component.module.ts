import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';



import { ClickingpictureComponent } from './clickingpicture.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [ClickingpictureComponent],
  exports: [ClickingpictureComponent]
})
export class ClickingPictureComponentModule {}

