import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-results',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main class="results-container">
      <h1>Recipe Suggestions</h1>
      <div *ngIf="!suggestions?.length" class="no-results">No suggestions found.</div>
      <div class="recipe-cards" *ngIf="suggestions?.length">
        <div class="recipe-card" *ngFor="let recipe of suggestions">
          <h2>{{ recipe.title }}</h2>
          <p>{{ recipe.description }}</p>
          <div class="ingredients-list">
            <b>Ingredients:</b>
            <ul>
              <li *ngFor="let ing of recipe.ingredients">{{ ing }}</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  `,
  styleUrls: ['./recipe-results.component.scss']
})
export class RecipeResultsComponent {
  @Input() suggestions: any[] = [];
}
