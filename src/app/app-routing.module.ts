import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/scrum/story-form', pathMatch: 'full' },
  {
    path: 'scrum',
    loadChildren: () =>
      import('./modules/scrum/scrum.module').then((m) => m.ScrumModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
