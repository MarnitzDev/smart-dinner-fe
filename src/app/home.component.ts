import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { DietTypeSelectorComponent } from './components/diet-type-selector.component';
import { ProteinSelectorComponent } from './components/protein-selector.component';
import { MoodSelectorComponent } from './components/mood-selector.component';
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
  styles: [
    `
    .home-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2rem 1rem 3rem 1rem;
      min-height: 100vh;
      background: linear-gradient(135deg, #f8fff8 0%, #e0ffe0 100%);
    }
    .intro {
      text-align: center;
      margin-bottom: 2.5rem;
    }
    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      color: #1a3a1a;
    }
    .subtitle {
      font-size: 1.2rem;
      color: #3a5a3a;
      margin-bottom: 0;
    }
    .stepper-form {
      width: 100%;
      max-width: 720px;
      margin: 0 auto;
      margin-bottom: 2rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .stepper-card {
      width: 100%;
      background: #fff;
      border-radius: 1.5rem;
      box-shadow: 0 2px 12px rgba(0,0,0,0.06);
      padding: 2rem 1.5rem 1.5rem 1.5rem;
      min-height: 320px;
      transition: min-height 250ms cubic-bezier(.4,0,.2,1), height 250ms cubic-bezier(.4,0,.2,1);
      position: relative;
      overflow: hidden;
    }
    .stepper-card section[ngswitchcase] {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: static;
      min-height: 180px;
    }
    .stepper-actions {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-top: 2rem;
    }
    .next-btn, .back-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5em;
      font-size: 1.1rem;
      font-weight: 600;
      border: none;
      border-radius: 2em;
      padding: 0.7em 1.7em;
      cursor: pointer;
      transition: background 0.18s, color 0.18s, box-shadow 0.18s;
      box-shadow: 0 1px 4px rgba(0,0,0,0.07);
      outline: none;
    }
    .next-btn {
      background: linear-gradient(90deg, #4caf50 60%, #81c784 100%);
      color: #fff;
    }
    .next-btn:disabled {
      background: #c8e6c9;
      color: #7cb342;
      cursor: not-allowed;
      opacity: 0.7;
    }
    .next-btn:not(:disabled):hover, .next-btn:not(:disabled):focus {
      background: linear-gradient(90deg, #388e3c 60%, #66bb6a 100%);
      color: #fff;
      box-shadow: 0 2px 8px rgba(76,175,80,0.13);
    }
    .back-btn {
      background: #f5f5f5;
      color: #388e3c;
      border: 1.5px solid #bdbdbd;
    }
    .back-btn:hover, .back-btn:focus {
      background: #e0e0e0;
      color: #1b5e20;
      border-color: #81c784;
    }
    @media (max-width: 600px) {
      .stepper-card {
        padding: 1.2rem 0.5rem 1rem 0.5rem;
      }
      h1 {
        font-size: 2rem;
      }
    }
    `
  ],
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
