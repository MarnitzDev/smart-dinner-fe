import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngredientMultiselectComponent } from '../ingredient-multiselect.component';

@Component({
  selector: 'app-ingredients-excluded',
  standalone: true,
  imports: [CommonModule, IngredientMultiselectComponent],
  template: `
    <app-ingredient-multiselect
      [selected]="selected"
      [dietType]="dietType"
      (selectedChange)="selectedChange.emit($event)">
    </app-ingredient-multiselect>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IngredientsExcludedComponent {
  @Input() selected = signal<string[]>([]);
  @Input() dietType: 'vegetarian' | 'vegan' | 'non-vegetarian' = 'vegetarian';
  @Output() selectedChange = new EventEmitter<string[]>();
}
