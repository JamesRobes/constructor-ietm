import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { UserResolverService } from './shared/resolvers/user-resolver';

const routes: Routes = [
  {
    path: 'iframe', loadChildren: () => import('./iframe/iframe.module').then(m => m.IframeModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [AuthGuard],
  },
  {
    path: '',
    loadChildren: () => import('./page/page.module').then((m) => m.PageModule),
    resolve: {
      user: UserResolverService,
    },
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
