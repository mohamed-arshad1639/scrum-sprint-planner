import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoryFormComponent } from './story-form/story-form.component';
import { StoryListComponent } from './story-list/story-list.component';
import { SprintCalculatorComponent } from './sprint-calculator/sprint-calculator.component';
import { AutoSelectedSprintComponent } from './auto-selected-sprint/auto-selected-sprint.component';


const routes: Routes = [
  { path: 'story-form', component: StoryFormComponent },
  { path: 'story-list', component: StoryListComponent },
  { path: 'sprint-calculator', component: SprintCalculatorComponent },
  { path: 'auto-selected-sprint', component: AutoSelectedSprintComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScrumRoutingModule {}
