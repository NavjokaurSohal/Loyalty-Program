import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./core/components/layout/layout.module').then(m => m.LayoutModule)},
  { path: 'signin', loadChildren: () => import('./main/signin/signin.module').then(m => m.SigninModule)},
  { path: 'signup', loadChildren: () => import('./main/signup/signup.module').then(m => m.SignupModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
