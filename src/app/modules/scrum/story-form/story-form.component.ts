import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoryService } from '../services/story.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-story-form',
  templateUrl: './story-form.component.html',
  styleUrls: ['./story-form.component.scss']
})
export class StoryFormComponent implements OnInit {
  storyForm!: FormGroup;

  constructor(private fb: FormBuilder, private storyService: StoryService,private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.storyForm = this.fb.group({
      name: ['', [Validators.required]], // Story Name (Required)
      points: [0, [Validators.required, Validators.min(1)]], // Story Points (Required, Positive)
      description: ['', [Validators.required, Validators.minLength(10)]] // Description (Required, Min Length 10)
    });
  }

  onSubmit(): void {

    // debugger

    if (this.storyForm.valid) {
      const { name, points, description } = this.storyForm.value;
      const success = this.storyService.addStory({ name, points: +points, description });
      if (!success) {
        this.snackBar.open('Story name must be unique!', 'Close', {
          duration: 3000, // Snackbar will auto-close after 3 seconds
          panelClass: ['warning-snackbar'], // Optional: custom class for styling
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      } else {
        this.snackBar.open('Story added successfully!', 'Close', {
          duration: 3000, // Snackbar will auto-close after 3 seconds
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
        this.storyForm.reset();
      }

    }
  }
}
