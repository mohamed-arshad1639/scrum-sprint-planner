import { Component } from '@angular/core';
import { StoryService, Story } from '../services/story.service';

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.scss']
})
export class StoryListComponent {
  stories: Story[] = [];

  constructor(private storyService: StoryService) {}

  ngOnInit(): void {
    this.storyService.stories$.subscribe((stories) => {
      this.stories = stories; // Update the stories list dynamically
    });
  }

  deleteAllStories(): void {
    const confirmed = confirm('Are you sure you want to delete all stories?');
    if (confirmed) {
      this.storyService.deleteAllStories();
    }
  }

}
