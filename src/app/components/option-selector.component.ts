import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Option<T> {
  label: string;
  value: T;
  icon?: string;
}

@Component({
  selector: 'app-option-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="option-selector">
      <div class="options">
        @for (option of options; track option.value) {
          <button
            type="button"
            class="option-btn"
            [class.selected]="selected() === option.value"
            (click)="select(option.value)"
            aria-label="{{ option.label }}"
          >
            <span *ngIf="option.icon" class="icon" aria-hidden="true">{{ option.icon }}</span>
            <span class="label">{{ option.label }}</span>
          </button>
        }
      </div>
    </div>
  `,
  styleUrls: ['./option-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionSelectorComponent<T> {
  @Input() options: Option<T>[] = [];
  @Input() selected = signal<T | null>(null);
  @Output() selectedChange = new EventEmitter<T>();

  select(value: T) {
    this.selected.set(value);
    this.selectedChange.emit(value);
  }
}
