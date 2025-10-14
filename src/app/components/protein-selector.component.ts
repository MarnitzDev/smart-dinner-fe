import { ChangeDetectionStrategy, Component, EventEmitter, Output, Input, signal } from '@angular/core';

const PROTEIN_OPTIONS = [
  { label: 'Chicken', value: 'chicken', icon: '🍗' },
  { label: 'Beef', value: 'beef', icon: '🥩' },
  { label: 'Pork', value: 'pork', icon: '🍖' },
  { label: 'Fish', value: 'fish', icon: '🐟' },
  { label: 'Eggs', value: 'eggs', icon: '🥚' },
  { label: 'None', value: 'none', icon: '❌' },
];

@Component({
  selector: 'app-protein-selector',
  standalone: true,
  template: `
    <div class="protein-selector">
      <h2 class="prompt">What type of main protein do you want?</h2>
      <div class="options">
        @for (option of options; track option.value) {
          <button
            type="button"
            class="protein-btn"
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
    .protein-selector {
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
    .protein-btn {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 1.13rem;
      padding: 1.7rem 2.3rem 1.3rem 2.3rem;
      border: 2.5px solid transparent;
      border-radius: 1.5rem;
      background: #f7fafd;
      box-shadow: 0 2px 12px rgba(60,120,180,0.07);
      cursor: pointer;
      transition: background 0.18s, box-shadow 0.18s, border 0.18s, transform 0.12s;
      outline: none;
      min-width: 120px;
      min-height: 120px;
      margin-bottom: 0.2rem;
      position: relative;
    }
    .protein-btn.selected, .protein-btn:focus-visible {
      background: #e0f7ff;
      border-color: #2196f3;
      box-shadow: 0 6px 24px rgba(33,150,243,0.13);
      transform: scale(1.07);
      z-index: 1;
    }
    .protein-btn:hover:not(:disabled):not(.selected) {
      background: #e8f4fb;
      border-color: #b3e5fc;
      box-shadow: 0 2px 16px rgba(33,150,243,0.09);
      transform: scale(1.03);
    }
    .protein-btn:active {
      background: #b3e5fc;
      border-color: #1976d2;
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
      .protein-btn {
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
export class ProteinSelectorComponent {
  options = PROTEIN_OPTIONS;
  @Input() selected: string | null = null;
  private _selected = signal<string | null>(null);

  @Output() proteinSelected = new EventEmitter<string>();

  select(value: string) {
    this._selected.set(value);
    this.proteinSelected.emit(value);
  }

  selectedValue(): string | null {
    return this.selected !== null ? this.selected : this._selected();
  }
}
