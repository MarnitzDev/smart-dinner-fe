import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="summary-step">
      <h2 class="summary-title">Summary</h2>
      <ul class="summary-list">
        <li><span class="label">Diet:</span> <span class="value">{{ diet }}</span></li>
        <li *ngIf="diet === 'non-vegetarian'"><span class="label">Protein:</span> <span class="value">{{ protein }}</span></li>
        <li><span class="label">Mood:</span> <span class="value">{{ mood }}</span></li>
        <li><span class="label">Ingredients:</span>
          <ul class="sub-list">
            <li *ngFor="let ing of ingredients">{{ ing }}</li>
          </ul>
        </li>
        <li><span class="label">Constraints:</span>
          <ul class="sub-list">
            <li *ngFor="let c of constraints">{{ c }}</li>
          </ul>
        </li>
      </ul>
    </div>
  `,
  styleUrls: ['./summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SummaryComponent {
  @Input() diet: string | null = null;
  @Input() protein: string | null = null;
  @Input() mood: string | null = null;
  @Input() ingredients: string[] = [];
  @Input() constraints: string[] = [];
}
