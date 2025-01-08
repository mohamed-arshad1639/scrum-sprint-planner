import { Component, OnInit, Input } from '@angular/core';
import { StoryService, Story } from '../services/story.service';

@Component({
  selector: 'app-auto-selected-sprint',
  templateUrl: './auto-selected-sprint.component.html',
  styleUrls: ['./auto-selected-sprint.component.scss'],
})
export class AutoSelectedSprintComponent implements OnInit {
  @Input() sprintName: string = '';
  @Input() sprintCapacity: number = 0; // Input to receive sprint name
  selectedStories: Story[] = [];

  constructor(private storyService: StoryService) {}

  ngOnInit(): void {
    // Subscribe to selected stories
    this.storyService.selectedStories$.subscribe((stories) => {
      this.selectedStories = stories;
    });
  }
}
