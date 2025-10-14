import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { DietTypeSelectorComponent } from './components/selectors/diet-type-selector.component';
import { ProteinSelectorComponent } from './components/selectors/protein-selector.component';
import { MoodSelectorComponent } from './components/selectors/mood-selector.component';
import { CommonModule } from '@angular/common';
// import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DietTypeSelectorComponent, ProteinSelectorComponent, MoodSelectorComponent],
  // animations: [],
  template: `
    <main class="home-container">
      <section class="intro">
        <h1>Smart Dinner</h1>
        <p class="subtitle">Find the perfect recipe based on your mood, diet, and what you have at home.</p>
      </section>
      <section class="stepper-form">
        <div class="stepper-card" #stepperCard>
          <form (ngSubmit)="onSubmit()" autocomplete="off">
            <ng-container [ngSwitch]="step()">
              <section *ngSwitchCase="0">
                <app-diet-type-selector (dietSelected)="onDietSelected($event)" [selected]="form.diet"></app-diet-type-selector>
                <div class="stepper-actions">
                  <button type="button" class="next-btn" [disabled]="!form.diet" (click)="next()" *ngIf="form.diet">
                    Next
                    <svg viewBox="0 0 20 20" style="width:1.1em;height:1.1em;vertical-align:middle;fill:currentColor;margin-left:0.3em;"><path d="M7.293 15.707a1 1 0 0 1 0-1.414L11.586 10 7.293 5.707a1 1 0 1 1 1.414-1.414l5 5a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414 0z"/></svg>
                  </button>
                </div>
              </section>
              <section *ngSwitchCase="1">
                <app-protein-selector (proteinSelected)="onProteinSelected($event)" [selected]="form.protein" *ngIf="form.diet === 'non-vegetarian'"></app-protein-selector>
                <div class="stepper-actions">
                  <button type="button" class="back-btn" (click)="back()">&#8592; Back</button>
                  <button type="button" class="next-btn" [disabled]="!form.protein" (click)="next()" *ngIf="form.protein">
                    Next
                    <svg viewBox="0 0 20 20" style="width:1.1em;height:1.1em;vertical-align:middle;fill:currentColor;margin-left:0.3em;"><path d="M7.293 15.707a1 1 0 0 1 0-1.414L11.586 10 7.293 5.707a1 1 0 1 1 1.414-1.414l5 5a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414 0z"/></svg>
                  </button>
                </div>
              </section>
              <section *ngSwitchCase="2">
                <app-mood-selector (moodSelected)="onMoodSelected($event)" [selected]="form.mood"></app-mood-selector>
                <div class="stepper-actions">
                  <button type="button" class="back-btn" (click)="back()">&#8592; Back</button>
                  <button type="submit" class="next-btn" [disabled]="!form.mood">Submit</button>
                </div>
              </section>
            </ng-container>
          </form>
        </div>
      </section>
    </main>
  `,
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  step = signal(0);
  form = {
    diet: null as string | null,
    protein: null as string | null,
    mood: null as string | null
  };


  onDietSelected(diet: string) {
    this.form.diet = diet;
    if (diet !== 'non-vegetarian') {
      this.form.protein = null;
    }
  }

  onProteinSelected(protein: string) {
    this.form.protein = protein;
  }

  onMoodSelected(mood: string) {
    this.form.mood = mood;
  }

  next() {
    if (this.step() === 0 && this.form.diet === 'non-vegetarian') {
      this.step.set(1);
    } else if (this.step() === 0 && this.form.diet !== 'non-vegetarian') {
      this.step.set(2);
    } else if (this.step() === 1) {
      this.step.set(2);
    }
  }

  back() {
    if (this.step() === 2 && this.form.diet === 'non-vegetarian') {
      this.step.set(1);
    } else if (this.step() === 2 && this.form.diet !== 'non-vegetarian') {
      this.step.set(0);
    } else if (this.step() === 1) {
      this.step.set(0);
    }
  }

  onSubmit() {
    // TODO: handle form submission
    console.log('Form submitted:', this.form);
  }
}
