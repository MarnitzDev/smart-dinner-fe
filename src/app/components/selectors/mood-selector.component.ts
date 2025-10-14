import { ChangeDetectionStrategy, Component, EventEmitter, Output, Input, signal } from '@angular/core';
import { OptionSelectorComponent, Option } from '../option-selector.component';

const MOOD_OPTIONS: Option<string>[] = [
	{ label: 'Quick & Easy', value: 'quick', icon: '⚡' },
	{ label: 'Comfort Food', value: 'comfort', icon: '🍲' },
	{ label: 'Healthy', value: 'healthy', icon: '🥗' },
	{ label: 'Fancy', value: 'fancy', icon: '🍽️' },
	{ label: 'Spicy', value: 'spicy', icon: '🌶️' },
];

@Component({
	selector: 'app-mood-selector',
	standalone: true,
	imports: [OptionSelectorComponent],
	template: `
		<app-option-selector
			[title]="'What kind of recipe are you in the mood for?'"
			[options]="options"
			[selected]="selectedSignal"
			(selectedChange)="onSelected($event)"
		></app-option-selector>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoodSelectorComponent {
	options = MOOD_OPTIONS;
	@Input() selected: string | null = null;
	private _selected = signal<string | null>(null);

	@Output() moodSelected = new EventEmitter<string>();

	get selectedSignal() {
		return this.selected !== null ? signal(this.selected) : this._selected;
	}

	onSelected(value: string) {
		this._selected.set(value);
		this.moodSelected.emit(value);
	}
}
