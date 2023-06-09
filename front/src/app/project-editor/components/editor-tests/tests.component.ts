import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TestsServiceService } from '../../../shared/services/tests-service.service';
import { SceneService } from 'src/app/scene/services/scene.service';

enum QuestionType {
  FindAPart,
  WhatAPart,
  OneOfThree
}
@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss'],

})
export class TestsComponent implements OnInit {
  @Input()
  public repoID: string;
  public tests: any[] = [];
  public testName: string = "";
  public editMode: boolean = false;
  public questionNum: number = 1;
  public questions: any[] = [];
  public formGroup: FormGroup;
  constructor(
    private testService: TestsServiceService,
    public sceneService: SceneService
    ) { }
  
  ngOnInit(): void {

    if (this.repoID) {
      this.testService.getTestsByRepoID(this.repoID)
        .subscribe(tests => { this.tests = tests; console.log(tests) });
    }

    this.formGroup = new FormGroup({
      header: new FormControl(''),
      type: new FormControl(QuestionType.FindAPart),
      selectedModel: new FormControl(''),
      answer: new FormControl(''),
      firstAnswer: new FormControl(''),
      secondAnswer: new FormControl(''),
      thirdAnswer: new FormControl(''),
      correctAnswer: new FormControl('')
    })
  }

  addTest() {
    this.editMode = true;
  }

  addQuestion() {
    if (this.formGroup.value.header === '' || this.formGroup.value.answer === '') {
      alert("Заполните заголовок вопроса и ответ на вопрос.");
      return
    }
    
    this.questions.push(this.formGroup.value);
    this.formGroup.reset({
      header: '',
      type: QuestionType.FindAPart,
      answer: ''
    });
  }

  confirmModel() {
    if (this.sceneService.selectedObj)
    this.formGroup.controls.answer.setValue(this.sceneService.selectedObj.userData.uuid);
  }
  
  finishTest() {
    if (this.testName === "") {
      alert("Введите название теста!")
      return
    }
    if (this.questions.length == 0) {
      alert("Добавьте хотя бы один (1) вопрос")
      return
    }

    const newTest = {
      name: this.testName,
      questions: this.questions,
      repoId: this.repoID
    };
    console.log(newTest)

    this.testService.createTest(
      newTest
    ).subscribe(res => { console.log(res) });
    this.editMode = false;
    this.questionNum = 1;
  }

  cancel() {
    this.editMode = false;
  }

  findAPart() {

  }

  public get questionType() {
    return QuestionType;
  }
}
