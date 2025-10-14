import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { DietTypeSelectorComponent } from './components/diet-type-selector.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DietTypeSelectorComponent],
  template: `
    <main class="home-container">
      <section class="intro">
        <h1>Smart Dinner</h1>
        <p class="subtitle">Find the perfect recipe based on your mood, diet, and what you have at home.</p>
      </section>
      <section class="step step-diet">
        <app-diet-type-selector (dietSelected)="onDietSelected($event)"></app-diet-type-selector>
      </section>
      <!-- Next steps will be shown here based on selection -->
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
    .step {
      width: 100%;
      max-width: 420px;
      margin: 0 auto;
      background: #fff;
      border-radius: 1.5rem;
      box-shadow: 0 2px 12px rgba(0,0,0,0.06);
      padding: 2rem 1.5rem 1.5rem 1.5rem;
      margin-bottom: 2rem;
    }
    @media (max-width: 600px) {
      .step {
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
  selectedDiet = signal<string | null>(null);

  onDietSelected(diet: string) {
    this.selectedDiet.set(diet);
    // TODO: Show next step based on diet
  }
}
