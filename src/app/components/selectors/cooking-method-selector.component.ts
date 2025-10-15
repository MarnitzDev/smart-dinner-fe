import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { OptionSelectorComponent, Option } from '../option-selector.component';

@Component({
  selector: 'app-cooking-method-selector',
  standalone: true,
  imports: [OptionSelectorComponent],
  template: `
    <div class="selector-container">
      <app-option-selector
        [options]="cookingMethods"
        [selected]="selected"
        (selectedChange)="selectedChange.emit($event)"
      ></app-option-selector>
    </div>
  `,
})
export class CookingMethodSelectorComponent {
  @Input() selected = signal<string | null>(null);
  @Output() selectedChange = new EventEmitter<string>();

  cookingMethods: Option<string>[] = [
    { label: 'Oven', value: 'oven' },
    { label: 'Stovetop', value: 'stovetop' },
    { label: 'Braai/Grill', value: 'braai' },
    { label: 'Air Fryer', value: 'air-fryer' },
    { label: 'Slow Cooker', value: 'slow-cooker' },
    { label: 'Microwave', value: 'microwave' },
    { label: 'No-cook', value: 'no-cook' },
  ];
}
