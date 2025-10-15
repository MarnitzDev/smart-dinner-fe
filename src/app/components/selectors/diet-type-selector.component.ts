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
			[options]="options"
			[selected]="selected"
			(selectedChange)="select($event)"
		></app-option-selector>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DietTypeSelectorComponent {
	options = DIET_OPTIONS;
	@Input({ required: true }) selected = signal<string | null>(null);
	@Output() dietSelected = new EventEmitter<string>();

	select(value: string) {
		this.selected.set(value);
		this.dietSelected.emit(value);
	}
}
