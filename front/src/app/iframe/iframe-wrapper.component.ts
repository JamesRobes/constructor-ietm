import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RepositoryI } from '../shared/models/repository.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-iframe-wrapper',
  templateUrl: './iframe-wrapper.component.html',
  styleUrls: ['./iframe-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IframeWrapperComponent implements OnInit {
  repository!: RepositoryI;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.repository = this.route.snapshot.data.repository
  }

}
