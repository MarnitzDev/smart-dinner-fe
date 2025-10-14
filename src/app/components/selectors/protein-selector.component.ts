import { ChangeDetectionStrategy, Component, EventEmitter, Output, Input, signal } from '@angular/core';
import { OptionSelectorComponent, Option } from '../option-selector.component';

const PROTEIN_OPTIONS: Option<string>[] = [
	{ label: 'Chicken', value: 'chicken', icon: '🍗' },
	{ label: 'Beef', value: 'beef', icon: '🥩' },
	{ label: 'Pork', value: 'pork', icon: '🍖' },
	{ label: 'Fish', value: 'fish', icon: '🐟' },
	{ label: 'Eggs', value: 'eggs', icon: '🥚' },
];

@Component({
	selector: 'app-protein-selector',
	standalone: true,
	imports: [OptionSelectorComponent],
	template: `
		<app-option-selector
			[title]="'What type of main protein do you want?'"
			[options]="options"
			[selected]="selected"
			(selectedChange)="select($event)"
		></app-option-selector>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProteinSelectorComponent {
	options = PROTEIN_OPTIONS;
	@Input({ required: true }) selected = signal<string | null>(null);
	@Output() proteinSelected = new EventEmitter<string>();

	select(value: string) {
		this.selected.set(value);
		this.proteinSelected.emit(value);
	}
}
