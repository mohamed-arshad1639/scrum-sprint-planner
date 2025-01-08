import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScrumRoutingModule } from './scrum-routing.module';
import { StoryFormComponent } from './story-form/story-form.component';
import { StoryListComponent } from './story-list/story-list.component';
import { SprintCalculatorComponent } from './sprint-calculator/sprint-calculator.component';
import { AutoSelectedSprintComponent } from './auto-selected-sprint/auto-selected-sprint.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import{StoryService} from './services/story.service'
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    StoryFormComponent,
    StoryListComponent,
    SprintCalculatorComponent,
    AutoSelectedSprintComponent
  ],
  imports: [
    CommonModule,
    ScrumRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [StoryService],
})
export class ScrumModule { }
