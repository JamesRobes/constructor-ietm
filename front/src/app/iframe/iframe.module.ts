import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IframeRoutingModule } from './iframe-routing.module';
import { IframeWrapperComponent } from './iframe-wrapper.component';
import { SceneModule } from "../scene/scene.module";


@NgModule({
  declarations: [
    IframeWrapperComponent
  ],
  imports: [
    CommonModule,
    IframeRoutingModule,
    SceneModule,
  ]
})
export class IframeModule { }
