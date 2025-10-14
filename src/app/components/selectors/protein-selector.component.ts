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
			[selected]="selectedSignal"
			(selectedChange)="onSelected($event)"
		></app-option-selector>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProteinSelectorComponent {
	options = PROTEIN_OPTIONS;
	@Input() selected: string | null = null;
	private _selected = signal<string | null>(null);

	@Output() proteinSelected = new EventEmitter<string>();

	get selectedSignal() {
		return this.selected !== null ? signal(this.selected) : this._selected;
	}

	onSelected(value: string) {
		this._selected.set(value);
		this.proteinSelected.emit(value);
	}
}
