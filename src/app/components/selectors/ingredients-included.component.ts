import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { INGREDIENT_SUGGESTIONS } from '../ingredient-suggestions.json';
import { IngredientMultiselectComponent } from '../ingredient-multiselect.component';

@Component({
  selector: 'app-ingredients-included',
  standalone: true,
  imports: [CommonModule, IngredientMultiselectComponent],
  template: `
    <app-ingredient-multiselect
      [selected]="selected"
      [dietType]="dietType"
      [chipsLabel]="'Included items:'"
      [prompt]="'Select ingredients you have or want to use'"
      (selectedChange)="selectedChange.emit($event)">
    </app-ingredient-multiselect>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IngredientsIncludedComponent {
  @Input() selected = signal<string[]>([]);
  @Input() dietType: 'vegetarian' | 'vegan' | 'non-vegetarian' = 'vegetarian';
  @Output() selectedChange = new EventEmitter<string[]>();
}
