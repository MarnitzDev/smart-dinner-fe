import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-results',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main class="results-container">
      <div *ngIf="!suggestions?.length" class="no-results">No suggestions found.</div>
      <div class="recipe-cards" *ngIf="suggestions?.length">
        <div class="recipe-card" *ngFor="let recipe of suggestions; let i = index">
          <h2 class="suggestion-label">Suggestion {{ i + 1 }}</h2>
          <h3 class="recipe-title">{{ recipe.title }}</h3>
          <p class="recipe-description">{{ recipe.description }}</p>
          <div class="ingredients-list">
            <span class="ingredients-label"><b>Ingredients:</b></span>
            <ul class="ingredients-ul">
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
