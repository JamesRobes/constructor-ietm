import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TestsServiceService } from 'src/app/shared/services/tests-service.service';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss'],
})
export class TestsComponent implements OnInit {
  @Input()
  public repoID: string;
  public tests: any[] = [];
  constructor(private testService: TestsServiceService, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    if(this.route.snapshot.parent?.data.repository._id)
    {
      this.testService.getTestsByRepoID(this.route.snapshot.parent.data.repository._id)
      .subscribe(tests => {this.tests = tests; console.log(tests)});
    }
  }

}
