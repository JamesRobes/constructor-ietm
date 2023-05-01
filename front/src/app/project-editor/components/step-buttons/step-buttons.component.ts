import { Location } from '@angular/common';
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { RepositoryService } from 'src/app/shared/services/repository.service';



@Component({
  selector: 'app-step-buttons',
  templateUrl: './step-buttons.component.html',
  styleUrls: ['./step-buttons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepButtonsComponent {
  @Input() step: number;
  @Input() nextBtnText = '';
  @Output() buttonClick = new EventEmitter();

  constructor(private location: Location,
    private repo: RepositoryService) {}

  navigateBack() {
    this.location.back();
  }

  OnClick()
  {
    this.repo.editMode = true;
    this.buttonClick.emit(this.step + 1);
  }
}
