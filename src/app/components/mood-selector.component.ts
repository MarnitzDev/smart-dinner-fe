import { ChangeDetectionStrategy, Component, EventEmitter, Output, signal } from '@angular/core';
import { Input } from '@angular/core';

const MOOD_OPTIONS = [
  { label: 'Quick & Easy', value: 'quick', icon: '⚡' },
  { label: 'Comfort Food', value: 'comfort', icon: '🍲' },
  { label: 'Healthy', value: 'healthy', icon: '🥗' },
  { label: 'Fancy', value: 'fancy', icon: '🍽️' },
  { label: 'Spicy', value: 'spicy', icon: '🌶️' },
];

@Component({
  selector: 'app-mood-selector',
  standalone: true,
  template: `
    <div class="mood-selector">
      <h2 class="prompt">What kind of recipe are you in the mood for?</h2>
      <div class="options">
        @for (option of options; track option.value) {
          <button
            type="button"
            class="mood-btn"
            [class.selected]="selectedValue() === option.value"
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
    .mood-selector {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
    }
    .prompt {
      font-size: 1.3rem;
      font-weight: 500;
      margin-bottom: 1rem;
      text-align: center;
    }
    .options {
      display: flex;
      gap: 1.7rem;
      flex-wrap: wrap;
      justify-content: center;
    }
    .mood-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 1.13rem;
      padding: 1.7rem 2.3rem 1.3rem 2.3rem;
      border: 2.5px solid transparent;
      border-radius: 1.5rem;
      background: #fdfaf7;
      box-shadow: 0 2px 12px rgba(180,140,60,0.07);
      cursor: pointer;
      transition: background 0.18s, box-shadow 0.18s, border 0.18s, transform 0.12s;
      outline: none;
      min-width: 120px;
      min-height: 120px;
      margin-bottom: 0.2rem;
      position: relative;
    }
    .mood-btn.selected, .mood-btn:focus-visible {
      background: #fffbe0;
      border-color: #ffd600;
      box-shadow: 0 6px 24px rgba(255,214,0,0.13);
      transform: scale(1.07);
      z-index: 1;
    }
    .mood-btn:hover:not(:disabled):not(.selected) {
      background: #fff7e8;
      border-color: #ffe082;
      box-shadow: 0 2px 16px rgba(255,214,0,0.09);
      transform: scale(1.03);
    }
    .mood-btn:active {
      background: #ffe082;
      border-color: #ffb300;
      transform: scale(0.98);
    }
    .icon {
      font-size: 2.3rem;
      margin-bottom: 0.6rem;
      line-height: 1;
    }
    .label {
      font-size: 1.08rem;
      font-weight: 600;
      letter-spacing: 0.01em;
      color: #1a3a1a;
    }
    @media (max-width: 600px) {
      .options {
        gap: 1rem;
      }
      .mood-btn {
        min-width: 80px;
        min-height: 80px;
        font-size: 0.95rem;
        padding: 1.1rem 1.1rem 0.8rem 1.1rem;
      }
      .icon {
        font-size: 1.5rem;
      }
    }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoodSelectorComponent {
  options = MOOD_OPTIONS;
  @Input() selected: string | null = null;
  private _selected = signal<string | null>(null);

  @Output() moodSelected = new EventEmitter<string>();

  select(value: string) {
    this._selected.set(value);
    this.moodSelected.emit(value);
  }

  selectedValue(): string | null {
    return this.selected !== null ? this.selected : this._selected();
  }
}
