import { ChangeDetectionStrategy, Component, EventEmitter, Output, Input, signal } from '@angular/core';
import { OptionSelectorComponent, Option } from '../option-selector.component';

const DIET_OPTIONS: Option<string>[] = [
	{ label: 'Vegetarian', value: 'vegetarian', icon: '🥦' },
	{ label: 'Vegan', value: 'vegan', icon: '🥗' },
	{ label: 'Non-Vegetarian', value: 'non-vegetarian', icon: '🍗' },
];

@Component({
	selector: 'app-diet-type-selector',
	standalone: true,
	imports: [OptionSelectorComponent],
	template: `
		<app-option-selector
			[title]="'Do you prefer vegetarian, vegan, or non-vegetarian?'"
			[options]="options"
			[selected]="selectedSignal"
			(selectedChange)="onSelected($event)"
		></app-option-selector>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DietTypeSelectorComponent {
	options = DIET_OPTIONS;
	@Input() selected: string | null = null;
	private _selected = signal<string | null>(null);

	@Output() dietSelected = new EventEmitter<string>();

	get selectedSignal() {
		// Always use the input if provided, else local
		return this.selected !== null ? signal(this.selected) : this._selected;
	}

	onSelected(value: string) {
		this._selected.set(value);
		this.dietSelected.emit(value);
	}
}
