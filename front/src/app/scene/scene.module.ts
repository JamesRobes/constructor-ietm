import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SceneRoutingModule } from './scene-routing.module';
import { SceneComponent } from './scene.component';
import { MatButtonModule } from '@angular/material/button';
import { ViewerToolbarComponent } from './components/viewer-toolbar/viewer-toolbar.component';
import { ViewerButtonComponent } from './components/viewer-button/viewer-button.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { ViewCubeComponent } from './components/view-cube/view-cube.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { ViewerAnnotationComponent } from './components/viewer-annotation/viewer-annotation.component';
import { TreeStructureModule } from '../tree-structure/tree-structure.module';

@NgModule({
  declarations: [
    SceneComponent,
    ViewerToolbarComponent,
    ViewerButtonComponent,
    ViewCubeComponent,
    ViewerAnnotationComponent,
  ],
  imports: [
    CommonModule,
    SceneRoutingModule,
    MatButtonModule,
    MatSliderModule,
    MatMenuModule,
    MatTooltipModule,
    MatRadioModule,
    FormsModule,
    MatCheckboxModule,
    MatDialogModule,
    TreeStructureModule
  ],
  exports: [SceneComponent],
})
export class SceneModule { }
