import { ChangeDetectionStrategy, Component, EventEmitter, Output, signal } from '@angular/core';

const DIET_OPTIONS = [
  { label: 'Vegetarian', value: 'vegetarian', icon: '🥦' },
  { label: 'Vegan', value: 'vegan', icon: '🥗' },
  { label: 'Non-Vegetarian', value: 'non-vegetarian', icon: '🍗' },
];

@Component({
  selector: 'app-diet-type-selector',
  template: `
    <div class="diet-type-selector">
      <h2 class="prompt">Do you prefer vegetarian, vegan, or non-vegetarian?</h2>
      <div class="options">
        @for (option of options; track option.value) {
          <button
            type="button"
            class="diet-btn"
            [class.selected]="selected() === option.value"
            (click)="select(option.value)"
            aria-label="{{ option.label }}"
          >
            <span class="icon" aria-hidden="true">{{ option.icon }}</span>
            <span class="label">{{ option.label }}</span>
          </button>
        }
      </div>
    </div>
  `,
  styles: [
    `
    .diet-type-selector {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
    }
    .prompt {
      font-size: 1.5rem;
      font-weight: 500;
      margin-bottom: 1rem;
      text-align: center;
    }
    .options {
      display: flex;
      gap: 2rem;
    }
    .diet-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      padding: 1.5rem 2.5rem;
      border: none;
      border-radius: 1.5rem;
      background: #f5f5f5;
      box-shadow: 0 2px 8px rgba(0,0,0,0.04);
      cursor: pointer;
      transition: background 0.2s, box-shadow 0.2s, transform 0.1s;
      outline: none;
      min-width: 120px;
      min-height: 120px;
    }
    .diet-btn.selected, .diet-btn:focus-visible {
      background: #e0ffe0;
      box-shadow: 0 4px 16px rgba(0,128,0,0.08);
      transform: scale(1.05);
    }
    .icon {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }
    .label {
      font-size: 1.1rem;
      font-weight: 500;
    }
    @media (max-width: 600px) {
      .options {
        flex-direction: column;
        gap: 1.2rem;
      }
      .diet-btn {
        min-width: 100px;
        min-height: 100px;
        font-size: 1rem;
      }
      .icon {
        font-size: 2rem;
      }
    }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DietTypeSelectorComponent {
  options = DIET_OPTIONS;
  selected = signal<string | null>(null);

  @Output() dietSelected = new EventEmitter<string>();

  select(value: string) {
    this.selected.set(value);
    this.dietSelected.emit(value);
  }
}
