import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { DietTypeSelectorComponent } from './components/selectors/diet-type-selector.component';
import { ProteinSelectorComponent } from './components/selectors/protein-selector.component';
import { MoodSelectorComponent } from './components/selectors/mood-selector.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DietTypeSelectorComponent, ProteinSelectorComponent, MoodSelectorComponent],
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
                <app-diet-type-selector (dietSelected)="onDietSelected($event)" [selected]="diet"></app-diet-type-selector>
                <div class="stepper-actions">
                  <button type="button" class="next-btn" [disabled]="!diet()" (click)="next()" *ngIf="diet()">
                    Next
                    <svg viewBox="0 0 20 20" style="width:1.1em;height:1.1em;vertical-align:middle;fill:currentColor;margin-left:0.3em;"><path d="M7.293 15.707a1 1 0 0 1 0-1.414L11.586 10 7.293 5.707a1 1 0 1 1 1.414-1.414l5 5a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414 0z"/></svg>
                  </button>
                </div>
              </section>
              <section *ngSwitchCase="1">
                <app-protein-selector (proteinSelected)="onProteinSelected($event)" [selected]="protein" *ngIf="diet() === 'non-vegetarian'"></app-protein-selector>
                <div class="stepper-actions">
                  <button type="button" class="back-btn" (click)="back()">&#8592; Back</button>
                  <button type="button" class="next-btn" [disabled]="!protein()" (click)="next()" *ngIf="protein()">
                    Next
                    <svg viewBox="0 0 20 20" style="width:1.1em;height:1.1em;vertical-align:middle;fill:currentColor;margin-left:0.3em;"><path d="M7.293 15.707a1 1 0 0 1 0-1.414L11.586 10 7.293 5.707a1 1 0 1 1 1.414-1.414l5 5a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414 0z"/></svg>
                  </button>
                </div>
              </section>
              <section *ngSwitchCase="2">
                <app-mood-selector (moodSelected)="onMoodSelected($event)" [selected]="mood"></app-mood-selector>
                <div class="stepper-actions">
                  <button type="button" class="back-btn" (click)="back()">&#8592; Back</button>
                  <button type="submit" class="next-btn" [disabled]="!mood()">Submit</button>
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
  diet = signal<string | null>(null);
  protein = signal<string | null>(null);
  mood = signal<string | null>(null);

  onDietSelected(diet: string) {
    this.diet.set(diet);
    if (diet !== 'non-vegetarian') {
      this.protein.set(null);
    }
  }

  onProteinSelected(protein: string) {
    this.protein.set(protein);
  }

  onMoodSelected(mood: string) {
    this.mood.set(mood);
  }

  next() {
    if (this.step() === 0 && this.diet() === 'non-vegetarian') {
      this.step.set(1);
    } else if (this.step() === 0 && this.diet() !== 'non-vegetarian') {
      this.step.set(2);
    } else if (this.step() === 1) {
      this.step.set(2);
    }
  }

  back() {
    if (this.step() === 2 && this.diet() === 'non-vegetarian') {
      this.step.set(1);
    } else if (this.step() === 2 && this.diet() !== 'non-vegetarian') {
      this.step.set(0);
    } else if (this.step() === 1) {
      this.step.set(0);
    }
  }

  onSubmit() {
    // TODO: handle form submission
    console.log('Form submitted:', {
      diet: this.diet(),
      protein: this.protein(),
      mood: this.mood()
    });
  }
}
