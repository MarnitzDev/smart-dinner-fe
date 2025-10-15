import { ChangeDetectionStrategy, Component, signal, computed } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DietTypeSelectorComponent } from './components/selectors/diet-type-selector.component';
import { MoodSelectorComponent } from './components/selectors/mood-selector.component';
import { CookingMethodSelectorComponent } from './components/selectors/cooking-method-selector.component';
import { CommonModule } from '@angular/common';
import { IngredientsIncludedComponent } from './components/selectors/ingredients-included.component';
import { IngredientsExcludedComponent } from './components/selectors/ingredients-excluded.component';
import { SummaryComponent } from './components/summary.component';
import { RecipeResultsComponent } from './components/recipe-results.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, DietTypeSelectorComponent, CookingMethodSelectorComponent, MoodSelectorComponent, IngredientsIncludedComponent, IngredientsExcludedComponent, SummaryComponent, RecipeResultsComponent],
  template: `
    <main class="home-container">
      <header class="main-header">
        <h1>Smart Dinner Recipe Suggester</h1>
        <div class="subtitle">Get personalized meal ideas in just a few steps</div>
      </header>
      <div class="main-content-row">
        <section class="stepper-form">
          <div class="stepper-card-center">
            <div class="step-title">{{ stepTitle() }}</div>
            <div class="stepper-card" #stepperCard>
              <ng-container [ngSwitch]="step()">
                <section *ngSwitchCase="0">
                  <app-diet-type-selector (dietSelected)="onDietSelected($event)" [selected]="diet"></app-diet-type-selector>
                </section>
                <section *ngSwitchCase="1">
                  <app-mood-selector (moodSelected)="onMoodSelected($event)" [selected]="mood"></app-mood-selector>
                </section>
                <section *ngSwitchCase="2">
                  <app-cooking-method-selector (selectedChange)="onCookingMethodSelected($event)" [selected]="cookingMethod"></app-cooking-method-selector>
                </section>
                <section *ngSwitchCase="3">
                  <app-ingredients-included
                    [selected]="ingredients"
                    [dietType]="dietType"
                    (selectedChange)="onIngredientsChange($event)">
                  </app-ingredients-included>
                </section>
                <section *ngSwitchCase="4">
                  <app-ingredients-excluded
                    [selected]="constraints"
                    [dietType]="dietType"
                    (selectedChange)="onConstraintsChange($event)">
                  </app-ingredients-excluded>
                </section>
                <section *ngSwitchCase="5">
                  <app-summary
                    [diet]="diet()"
                    [mood]="mood()"
                    [cookingMethod]="cookingMethod()"
                    [ingredients]="ingredients()"
                    [constraints]="constraints()"
                  ></app-summary>
                </section>
                <section *ngSwitchCase="6">
                  <div *ngIf="loading()" class="result-loading">Loading suggestions...</div>
                  <div *ngIf="error()" class="result-error">{{ error() }}</div>
                  <app-recipe-results *ngIf="suggestions().length" [suggestions]="suggestions()"></app-recipe-results>
                </section>
              </ng-container>
            </div>
            <div class="stepper-actions">
              <ng-container [ngSwitch]="step()">
                <ng-container *ngSwitchCase="0">
                  <button type="button" class="btn btn-primary" [disabled]="!diet()" (click)="next()">
                    Next
                    <svg viewBox="0 0 20 20" style="width:1.1em;height:1.1em;vertical-align:middle;fill:currentColor;margin-left:0.3em;"><path d="M7.293 15.707a1 1 0 0 1 0-1.414L11.586 10 7.293 5.707a1 1 0 1 1 1.414-1.414l5 5a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414 0z"/></svg>
                  </button>
                </ng-container>
                <ng-container *ngSwitchCase="1">
                  <button type="button" class="btn btn-secondary" (click)="back()">Back</button>
                  <button type="button" class="btn btn-primary" [disabled]="!mood()" (click)="next()">
                    Next
                    <svg viewBox="0 0 20 20" style="width:1.1em;height:1.1em;vertical-align:middle;fill:currentColor;margin-left:0.3em;"><path d="M7.293 15.707a1 1 0 0 1 0-1.414L11.586 10 7.293 5.707a1 1 0 1 1 1.414-1.414l5 5a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414 0z"/></svg>
                  </button>
                </ng-container>
                <ng-container *ngSwitchCase="2">
                  <button type="button" class="btn btn-secondary" (click)="back()">Back</button>
                  <button type="button" class="btn btn-primary" [disabled]="!cookingMethod()" (click)="next()">
                    Next
                    <svg viewBox="0 0 20 20" style="width:1.1em;height:1.1em;vertical-align:middle;fill:currentColor;margin-left:0.3em;"><path d="M7.293 15.707a1 1 0 0 1 0-1.414L11.586 10 7.293 5.707a1 1 0 1 1 1.414-1.414l5 5a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414 0z"/></svg>
                  </button>
                </ng-container>
                <ng-container *ngSwitchCase="3">
                  <button type="button" class="btn btn-secondary" (click)="back()">Back</button>
                  <button type="button" class="btn btn-primary" (click)="next()">Next
                    <svg viewBox="0 0 20 20" style="width:1.1em;height:1.1em;vertical-align:middle;fill:currentColor;margin-left:0.3em;"><path d="M7.293 15.707a1 1 0 0 1 0-1.414L11.586 10 7.293 5.707a1 1 0 1 1 1.414-1.414l5 5a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414 0z"/></svg>
                  </button>
                </ng-container>
                <ng-container *ngSwitchCase="4">
                  <button type="button" class="btn btn-secondary" (click)="back()">Back</button>
                  <button type="button" class="btn btn-primary" (click)="next()">Next
                    <svg viewBox="0 0 20 20" style="width:1.1em;height:1.1em;vertical-align:middle;fill:currentColor;margin-left:0.3em;"><path d="M7.293 15.707a1 1 0 0 1 0-1.414L11.586 10 7.293 5.707a1 1 0 1 1 1.414-1.414l5 5a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414 0z"/></svg>
                  </button>
                </ng-container>
                <ng-container *ngSwitchCase="5">
                  <button type="button" class="btn btn-secondary" (click)="back()">Back</button>
                  <button type="button" class="btn btn-primary" (click)="onGenerateRecipes()">Generate Recipes</button>
                </ng-container>
              </ng-container>
            </div>
          <!-- end .stepper-card-center -->
        <!-- end .stepper-form -->
      <!-- end .main-content-row -->
    <!-- end main -->
  `,
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  step = signal(0);
  diet = signal<string | null>(null);
  cookingMethod = signal<string | null>(null);
  mood = signal<string | null>(null);
  ingredients = signal<string[]>([]);
  constraints = signal<string[]>([]);
  suggestions = signal<any[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  carouselIndex = 0;

  constructor(private http: HttpClient) {
    // Watch for suggestions changes to reset carousel
    const origSet = this.suggestions.set;
    this.suggestions.set = (val: any[]) => {
      this.carouselIndex = 0;
      origSet.call(this.suggestions, val);
    };
  }

  onCookingMethodSelected(method: string) {
    this.cookingMethod.set(method);
  }
  onConstraintsChange(constraints: string[]) {
    this.constraints.set(constraints);
  }
  onDietSelected(diet: string) {
    this.diet.set(diet);
  }
  onMoodSelected(mood: string) {
    this.mood.set(mood);
  }
  onIngredientsChange(ingredients: string[]) {
    this.ingredients.set(ingredients);
  }
  next() {
    this.step.set(this.step() + 1);
  }
  back() {
    this.step.set(Math.max(0, this.step() - 1));
  }
  carouselPrev() {
    if (this.carouselIndex > 0) {
      this.carouselIndex -= 3;
    }
  }
  carouselNext() {
    if (this.carouselIndex + 3 < this.suggestions().length) {
      this.carouselIndex += 3;
    }
  }
  stepTitle = computed(() => {
    switch (this.step()) {
      case 0: return 'Step 1: Choose Your Diet Type';
      case 1: return 'Step 2: Select Your Current Mood';
      case 2: return 'Step 3: Preferred Cooking Method';
      case 3: return 'Step 4: Ingredients You Have or Want to Use';
      case 4: return 'Step 5: Ingredients to Avoid';
      case 5: return 'Step 6: Review Your Choices';
      case 6: return 'Recipe Suggestions';
      default: return '';
    }
  });
  onGenerateRecipes() {
    this.step.set(6);
    const payload = {
      diet: this.diet(),
      cookingMethod: this.cookingMethod(),
      mood: this.mood(),
      ingredients: this.ingredients(),
      constraints: this.constraints(),
    };
    this.loading.set(true);
    this.error.set(null);
    this.suggestions.set([]);
    this.http.post<any>('http://localhost:5000/recipes/suggest', payload).subscribe({
      next: (result) => {
        this.suggestions.set(result.suggestions || []);
        this.loading.set(false);
        console.log('Received suggestions:', result);
      },
      error: (err) => {
        this.error.set('Failed to fetch suggestions');
        this.loading.set(false);
        console.error('Error from endpoint:', err);
      }
    });
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
      cookingMethod: this.cookingMethod(),
      mood: this.mood(),
      ingredients: this.ingredients(),
      constraints: this.constraints(),
    });
  }
}
