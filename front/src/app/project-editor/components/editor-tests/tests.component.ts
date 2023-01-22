import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { TestsServiceService } from '../../../shared/services/tests-service.service';

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
  constructor(private testService: TestsServiceService) { }

  ngOnInit(): void {

    if(this.repoID)
    {
      this.testService.getTestsByRepoID(this.repoID)
      .subscribe(tests => {this.tests = tests; console.log(tests)});
    }
  }

  addTest()
  {
    this.editMode = true;
  }

  addQuestion()
  {   
    var question = document.createElement("div");
    question.innerHTML = " <div id='question' class='questionDiv'>\n<div>Вопрос №"+ this.questionNum +"</div>\n<div>Выберите тип вопроса</div>\n<div>\n<div>\n<input type='radio' id='questionType_0' name='questionType'>\n <label for='questionType_0'>Выберите деталь</label>\n</div>\n<div>\n<input type='radio' id='questionType_1' name='questionType'>\n<label for='questionType_1'>Какая деталь на экране?</label>\n</div>\n<div>\n<input type='radio' id='questionType_2' name='questionType'>\n<label for='questionType_2'>Впишите название детали на экране</label>\n</div>\n</div>\n<div>\n<div> Введите текст вопроса</div>\n<input placeholder='Текст вопроса'>\n</div>\n</div>";
    document.getElementById("test")?.appendChild(question);
    this.questionNum++;
    return false;
  }

  finishTest()
  {
    if(this.testName != "")
    {
      this.tests.push(this.testName);
      console.log(this.testName);
      this.testName = "";
      this.editMode = false;
      this.questionNum = 1;
    }
    else alert("Введите название теста!");
  }

  cancel()
  {
    this.editMode = false;
  }
}
