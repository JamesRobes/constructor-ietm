import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IframeWrapperComponent } from './iframe-wrapper.component';
import { RepositoryResolverService } from '../repository/resolvers/repository-resolver.service';

const routes: Routes = [
  {
    path: 'repository/:repoId', component: IframeWrapperComponent, resolve: {
      repository: RepositoryResolverService,
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IframeRoutingModule { }
