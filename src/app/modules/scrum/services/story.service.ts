import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Story {
  name: string;
  points: number;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class StoryService {
  private stories: Story[] = [];
  private selectedStories: Story[] = [];
  private storiesSubject = new BehaviorSubject<Story[]>([]);
  private selectedStoriesSubject = new BehaviorSubject<Story[]>([]);
  stories$ = this.storiesSubject.asObservable();
  selectedStories$ = this.selectedStoriesSubject.asObservable();
  

  getStories(): Story[] {
    return this.storiesSubject.getValue();
  }

  // getStories(): Story[] {
  //     return this.stories;
  // }

  getSelectedStories(): Story[] {
    return this.selectedStories;
  }

  addStory(story: Story): boolean {
    const currentStories = this.storiesSubject.getValue();

    // Check for duplicates
    if (currentStories.find((s) => s.name === story.name)) {
      return false; // Do not add duplicate stories
    }

    // Add the new story to the list
    this.storiesSubject.next([...currentStories, story]);
    console.log('storiesSubject', this.storiesSubject);
    return true; // Successfully added
  }

  generateSprint(capacity: number): void {
    const currentStories = this.storiesSubject.getValue();
    const selected: Story[] = [];
    let totalPoints = 0;

    currentStories
      .sort((a, b) => b.points - a.points)
      .forEach((story) => {
        if (totalPoints + story.points <= capacity) {
          selected.push(story);
          totalPoints += story.points;
        }
      });

    this.selectedStoriesSubject.next(selected);
  }

  clearSelectedStories(): void {
    this.selectedStoriesSubject.next([]);
  }

  deleteAllStories(): void {
    this.storiesSubject.next([]); // Clear all stories
    this.selectedStoriesSubject.next([]);
  }

  clearStories(): void {
    this.stories = [];
  }

  
}
