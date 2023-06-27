import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormArray, FormControl, ReactiveFormsModule  } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SceneService } from 'src/app/scene/services/scene.service';
import { TestsServiceService } from 'src/app/shared/services/tests-service.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

enum QuestionType {
  FindAPart,
  WhatAPart,
  OneOfThree
}

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss'],
})
export class TestPageComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isOptional = false;
  test: any;
  currentQuestion: number = 0;
  answers: string[] = [];
  questionType = QuestionType;

  score: number = 0;

  constructor(
    private testService: TestsServiceService,
    private route: ActivatedRoute, 
    public sceneService: SceneService,
    private _formBuilder: FormBuilder) { }
    private modelUuid: string
  ngOnInit(): void {
    const repoID = this.route.snapshot.parent?.data.repository._id;
    const testName = this.route.snapshot.queryParams.testName;

    if(repoID && testName)
    {
      this.testService.getTestByName(repoID, testName)
      .subscribe(test => {
        this.test = test; console.log(test);
        this.firstFormGroup = this._formBuilder.group([
          ...this.test.questions.map((question: any) => ({
            [question.header]: '',
          }))
        ], {validators: [Validators.required, Validators.minLength(1)]});

        console.log(this.firstFormGroup);
      });


    }
  }

  next() {
    if (this.currentQuestion < this.test.questions.length - 1)
    this.currentQuestion++;
  }

  back() {
    if (this.currentQuestion > 0)
    this.currentQuestion--;
  }



  submit() {
    
  }

  endTest() {
    if(this.firstFormGroup.valid) {
      for(let question of this.test.questions)
      {
        if(question.answer == this.firstFormGroup.controls[question.header]) {
          this.score++;
        }
      }
    } 
  }
}
