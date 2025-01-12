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
    // console.log('storiesSubject', this.storiesSubject);
    return true; // Successfully added
  }

  generateSprint(capacity: number): void {
    const currentStories = this.storiesSubject.getValue();
    let selected: Story[] = [];
    let totalPoints = 0;
  
    // Helper function to find combinations that sum to the exact capacity
    const findExactCombination = (stories: Story[], target: number): Story[] | null => {
      const result: Story[] = [];
  
      const backtrack = (start: number, combination: Story[], total: number) => {
        if (total === target) {
          result.push(...combination); // Store the valid combination
          return true; // Found an exact match, stop further exploration
        }
        if (total > target) return false; // Exceeds capacity, backtrack
  
        for (let i = start; i < stories.length; i++) {
          combination.push(stories[i]);
          if (backtrack(i + 1, combination, total + stories[i].points)) return true;
          combination.pop();
        }
        return false;
      };
  
      backtrack(0, [], 0);
      return result.length > 0 ? result : null;
    };
  
    // Step 1: Try to find an exact match
    const exactCombination = findExactCombination(currentStories, capacity);
  
    if (exactCombination) {
      selected = exactCombination; // Use the exact match if found
    } else {
      // Step 2: Fallback to selecting the highest-point stories without exceeding capacity
      currentStories
        .sort((a, b) => b.points - a.points) // Sort in descending order of points
        .forEach((story) => {
          if (totalPoints + story.points <= capacity) {
            selected.push(story);
            totalPoints += story.points;
          }
        });
    }
  
    // Emit the selected stories
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
