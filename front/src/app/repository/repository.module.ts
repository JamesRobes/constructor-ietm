import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RepositoryRoutingModule } from './repository-routing.module';
import { RepositoryComponent } from './repository.component';
import { SceneModule } from '../scene/scene.module';
import { ImageSanitizedModule } from '../shared/directives/image-sanitized/image-sanitized.module';
import { SummaryComponent } from './components/summary/summary.component';
import { MatButtonModule } from '@angular/material/button';
import { TreeComponent } from './components/tree/tree.component';
import { TreeStructureModule } from '../tree-structure/tree-structure.module';
import { HasRoleModule } from '../shared/directives/has-role/has-role.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DialogConfirmActionModule } from '../dialogs/dialog-confirm-action/dialog-confirm-action.module';
import { InstructionsComponent } from './components/instructions/instructions.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TestsComponent } from './components/tests/tests/tests.component';
import { TestPageComponent } from './components/test-page/test-page.component';
import { TestResultComponent } from './components/test-result/test-result.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipeModule } from '../shared/pipes/pipe.module';
import { MatTabsModule } from '@angular/material/tabs';
@NgModule({
  declarations: [RepositoryComponent, 
    SummaryComponent, 
    TreeComponent, 
    InstructionsComponent, 
    TestsComponent, 
    TestPageComponent, 
    TestResultComponent],
  imports: [
    CommonModule,
    RepositoryRoutingModule,
    SceneModule,
    ImageSanitizedModule,
    MatButtonModule,
    TreeStructureModule,
    DialogConfirmActionModule,
    HasRoleModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatInputModule,
    PipeModule,
    MatTabsModule
  ],
})
export class RepositoryModule {}
