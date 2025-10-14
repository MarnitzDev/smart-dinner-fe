import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { DietTypeSelectorComponent } from './components/selectors/diet-type-selector.component';
import { ProteinSelectorComponent } from './components/selectors/protein-selector.component';
import { MoodSelectorComponent } from './components/selectors/mood-selector.component';
import { CommonModule } from '@angular/common';
import { IngredientMultiselectComponent } from './components/ingredient-multiselect.component';
import { IngredientsIncludedComponent } from './components/selectors/ingredients-included.component';
import { IngredientsExcludedComponent } from './components/selectors/ingredients-excluded.component';
import { SummaryComponent } from './components/summary.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, DietTypeSelectorComponent, ProteinSelectorComponent, MoodSelectorComponent, IngredientMultiselectComponent, IngredientsIncludedComponent, IngredientsExcludedComponent, SummaryComponent],
  template: `
    <main class="home-container debug-layout">
      <section class="intro">
        <h1>Smart Dinner</h1>
        <p class="subtitle">Find the perfect recipe based on your mood, diet, and what you have at home.</p>
      </section>
      <div class="main-content-row">
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
                  <button type="button" class="next-btn" [disabled]="!mood()" (click)="next()" *ngIf="mood()">
                    Next
                    <svg viewBox="0 0 20 20" style="width:1.1em;height:1.1em;vertical-align:middle;fill:currentColor;margin-left:0.3em;"><path d="M7.293 15.707a1 1 0 0 1 0-1.414L11.586 10 7.293 5.707a1 1 0 1 1 1.414-1.414l5 5a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414 0z"/></svg>
                  </button>
                </div>
              </section>
              <section *ngSwitchCase="3">
                <app-ingredients-included
                  [selected]="ingredients"
                  [dietType]="dietType"
                  (selectedChange)="onIngredientsChange($event)">
                </app-ingredients-included>
                <div class="stepper-actions">
                  <button type="button" class="back-btn" (click)="back()">&#8592; Back</button>
                  <button type="button" class="next-btn" [disabled]="!ingredients().length" (click)="next()">Next</button>
                </div>
              </section>
              <section *ngSwitchCase="4">
                <app-ingredients-excluded
                  [selected]="constraints"
                  [dietType]="dietType"
                  (selectedChange)="onConstraintsChange($event)">
                </app-ingredients-excluded>
                <div class="stepper-actions">
                  <button type="button" class="back-btn" (click)="back()">&#8592; Back</button>
                  <button type="button" class="next-btn" (click)="next()">Next</button>
                </div>
              </section>
              <section *ngSwitchCase="5">
                <app-summary
                  [diet]="diet()"
                  [protein]="protein()"
                  [mood]="mood()"
                  [ingredients]="ingredients()"
                  [constraints]="constraints()"
                ></app-summary>
                <div class="stepper-actions">
                  <button type="button" class="back-btn" (click)="back()">&#8592; Back</button>
                  <button type="button" class="next-btn" (click)="onGenerateRecipes()">Generate Recipes</button>
                </div>
              </section>
            </ng-container>
          </form>
          </div>
        </section>
        <aside class="debug-panel">
          <h3>Debug: Selected Values</h3>
          <div class="debug-list"><b>Diet:</b> {{ diet() }}</div>
          <div class="debug-list"><b>Protein:</b> {{ protein() }}</div>
          <div class="debug-list"><b>Mood:</b> {{ mood() }}</div>
          <div class="debug-list"><b>Ingredients:</b>
            <ul>
              <li *ngFor="let ing of ingredients()">{{ ing }}</li>
            </ul>
          </div>
          <div class="debug-list constraints"><b>Constraints:</b>
            <ul>
              <li *ngFor="let c of constraints()">{{ c }}</li>
            </ul>
          </div>
        </aside>
      </div>
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
  ingredients = signal<string[]>([]);
  constraints = signal<string[]>([]);
  onConstraintsChange(constraints: string[]) {
    this.constraints.set(constraints);
  }

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

  onIngredientsChange(ingredients: string[]) {
    this.ingredients.set(ingredients);
  }

  next() {
    if (this.step() === 0 && this.diet() === 'non-vegetarian') {
      this.step.set(1);
    } else if (this.step() === 0 && this.diet() !== 'non-vegetarian') {
      this.step.set(2);
    } else if (this.step() === 1) {
      this.step.set(2);
    } else if (this.step() === 2) {
      this.step.set(3);
    } else if (this.step() === 3) {
      this.step.set(4);
    } else if (this.step() === 4) {
      this.step.set(5);
    }
  }

  back() {
    if (this.step() === 5) {
      this.step.set(4);
    } else if (this.step() === 4) {
      this.step.set(3);
    } else if (this.step() === 3) {
      this.step.set(2);
    } else if (this.step() === 2 && this.diet() === 'non-vegetarian') {
      this.step.set(1);
    } else if (this.step() === 2 && this.diet() !== 'non-vegetarian') {
      this.step.set(0);
      this.protein.set(null); // Reset protein if going back to diet and not non-veg
    } else if (this.step() === 1) {
      this.step.set(0);
    }
  }
  onGenerateRecipes() {
    // TODO: implement recipe generation logic
    alert('Recipe generation not implemented yet!');
  }

  get dietType(): 'vegetarian' | 'vegan' | 'non-vegetarian' {
    if (this.diet() === 'non-vegetarian') return 'non-vegetarian';
    if (this.diet() === 'vegan') return 'vegan';
    return 'vegetarian';
  }

  onSubmit() {
    // TODO: handle form submission
    console.log('Form submitted:', {
      diet: this.diet(),
      protein: this.protein(),
      mood: this.mood(),
      ingredients: this.ingredients(),
      constraints: this.constraints(),
    });
  }
}
