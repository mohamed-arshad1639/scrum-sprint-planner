import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoryService, Story } from '../services/story.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sprint-calculator',
  templateUrl: './sprint-calculator.component.html',
  styleUrls: ['./sprint-calculator.component.scss'],
})
export class SprintCalculatorComponent implements OnInit {
  sprintForm!: FormGroup;
  sprintCapacity: number = 0; // Holds the sprint capacity
  sprintName: string = ''; // Holds the sprint name
  storiesAvailable: boolean = true; // Flag to check if stories are available
  selectedStoriesAvailable: boolean = false; // Flag to check if selected stories are available

  constructor(
    private fb: FormBuilder,
    private storyService: StoryService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.sprintForm = this.fb.group({
      capacity: [0, [Validators.required, Validators.min(1)]],
      sprintName: ['', [Validators.required]], // New field for sprint name
    });

    // Check if there are stories available
    this.storyService.stories$.subscribe((stories) => {
      this.storiesAvailable = stories.length > 0;
    });

    // Check if there are selected stories
    this.storyService.selectedStories$.subscribe((selectedStories) => {
      this.selectedStoriesAvailable = selectedStories.length > 0;
    });

    // this.storyService.clearSelectedStories();
  }

  onGenerateSprint(): void {
    if (this.sprintForm.invalid || !this.storiesAvailable) {
      return; // Prevent generation if form is invalid or no stories are available
    }

    const capacity = +this.sprintForm.value.capacity;
    this.sprintCapacity = capacity; // Set sprint capacity
    this.sprintName = this.sprintForm.value.sprintName; // Set sprint name
    this.sprintName = this.sprintForm.value.sprintName; // Get sprint name

    this.storyService.generateSprint(capacity);
    this.sprintForm.reset(); 
  }

  clearStories(): void {
    this.storyService.deleteAllStories(); // Clear all stories
  }

  clearSelectedStories(): void {
    this.storyService.clearSelectedStories(); // Clear selected stories
  }

  deleteAllStories(): void {
    const confirmed = confirm('Are you sure you want to delete all stories?');
    console.log('this.storiesAvailable',this.storiesAvailable)

    if (confirmed) {
      if (this.storiesAvailable) {
        this.storyService.deleteAllStories();
        this.snackBar.open('All story deleted successfully!', 'Close', {
          duration: 3000, // Snackbar will auto-close after 3 seconds
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      } else {
        this.snackBar.open('No stories available for deletion.', 'Close', {
          duration: 3000, // Snackbar will auto-close after 3 seconds
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      }
    }
  }
}
