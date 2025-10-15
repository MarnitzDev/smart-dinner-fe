import { ChangeDetectionStrategy, Component, EventEmitter, Output, signal, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { INGREDIENT_SUGGESTIONS } from './ingredient-suggestions.json';

@Component({
  selector: 'app-ingredient-multiselect',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="ingredient-multiselect">
      <div class="input-row center-row">
        <input
          type="text"
          class="ingredient-input"
          [value]="inputValue"
          (input)="onInput($event)"
          (keydown.enter)="addIngredient()"
          [attr.list]="'ingredient-suggestions'"
          placeholder="Type to search or add..."
          autocomplete="off"
          aria-label="Ingredient search"
        />
        <button type="button" class="btn btn-primary" (click)="addIngredient()" [disabled]="!inputValue.trim()">Add</button>
      </div>
      <div class="chips-container">
        @for (ingredient of selected(); track ingredient) {
          <span class="chip">
            {{ ingredient }}
            <button type="button" class="remove-btn" (click)="removeIngredient(ingredient)" aria-label="Remove {{ingredient}}">×</button>
          </span>
        }
      </div>
      <datalist id="ingredient-suggestions">
        <option *ngFor="let suggestion of filteredSuggestions()" [value]="suggestion"></option>
      </datalist>
    </div>
  `,
  styleUrls: ['./ingredient-multiselect.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IngredientMultiselectComponent {
  @Input() dietType: 'vegetarian' | 'vegan' | 'non-vegetarian' = 'vegetarian';
  @Input() selected = signal<string[]>([]);
  @Output() selectedChange = new EventEmitter<string[]>();

  get suggestions(): string[] {
    let list: string[];
    if (this.dietType === 'non-vegetarian') {
      list = [...INGREDIENT_SUGGESTIONS.vegetarian, ...INGREDIENT_SUGGESTIONS.nonVegetarian];
    } else if (this.dietType === 'vegan') {
      list = INGREDIENT_SUGGESTIONS.vegan;
    } else {
      list = INGREDIENT_SUGGESTIONS.vegetarian;
    }
    return Array.from(new Set(list));
  }

  inputValue = '';
  filteredSuggestions = signal<string[]>([]);

  onInput(event: Event) {
    this.inputValue = (event.target as HTMLInputElement).value;
    const val = this.inputValue.trim().toLowerCase();
    if (!val) {
      this.filteredSuggestions.set([]);
      return;
    }
    this.filteredSuggestions.set(
      this.suggestions.filter(s =>
        s.toLowerCase().includes(val) && !this.selected().includes(s)
      ).slice(0, 10)
    );
  }

  onChange(event: Event) {
    // Add ingredient if the value matches a suggestion or is not already selected
    const value = (event.target as HTMLInputElement).value.trim();
    if (value && (this.suggestions.includes(value) || !this.selected().includes(value))) {
      this.addIngredient();
    }
  }

  addIngredient() {
    const val = this.inputValue.trim();
    if (val && !this.selected().includes(val)) {
      this.selected.set([...this.selected(), val]);
      this.selectedChange.emit(this.selected());
    }
    this.inputValue = '';
    this.filteredSuggestions.set([]);
  }

  removeIngredient(ingredient: string) {
    this.selected.set(this.selected().filter(i => i !== ingredient));
    this.selectedChange.emit(this.selected());
  }
}
