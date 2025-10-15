import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="summary-step">
      <ul class="summary-list">
        <li class="summary-row">
          <span class="label">Diet:</span>
          <span class="value">{{ diet }}</span>
        </li>
        <li class="summary-row">
          <span class="label">Mood:</span>
          <span class="value">{{ mood }}</span>
        </li>
        <li class="summary-row">
          <span class="label">Method:</span>
          <span class="value">{{ cookingMethod || 'none' }}</span>
        </li>
        <li class="summary-row align-top">
          <span class="label">Ingredients:</span>
          <span class="value">
            <ul class="sub-list" *ngIf="ingredients && ingredients.length; else noIngredients">
              <li *ngFor="let ing of ingredients">{{ ing }}</li>
            </ul>
            <ng-template #noIngredients><span class="none">none</span></ng-template>
          </span>
        </li>
        <li class="summary-row align-top">
          <span class="label">Constraints:</span>
          <span class="value">
            <ul class="sub-list" *ngIf="constraints && constraints.length; else noConstraints">
              <li *ngFor="let c of constraints">{{ c }}</li>
            </ul>
            <ng-template #noConstraints><span class="none">none</span></ng-template>
          </span>
        </li>
      </ul>
    </div>
  `,
  styleUrls: ['./summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SummaryComponent {
  @Input() diet: string | null = null;
  @Input() mood: string | null = null;
  @Input() cookingMethod: string | null = null;
  @Input() ingredients: string[] = [];
  @Input() constraints: string[] = [];
}
