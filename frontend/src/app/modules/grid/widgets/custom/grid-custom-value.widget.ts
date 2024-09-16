import {AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {GridService} from '../../grid.service';
import {GridColCustomSpec} from '../../grid.interfaces';
import {GridColumnBaseComponent} from '../grid-column-base.component';
import {TomeIconComponent} from '../../../shared/grid-columns/tome-icon/tome-icon.component';
import {VerseBodyCellComponent} from '../../../shared/grid-columns/verse-body-cell/verse-body-cell.component';

@Component({
	selector: 'grid-custom-value',
	templateUrl: './grid-custom-value.widget.html',
	styleUrls: ['../../grid.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class GridCustomValueWidget extends GridColumnBaseComponent implements OnInit, OnDestroy, AfterViewInit {
	// N.B. Inputs and Outputs are inherited.
	@ViewChild('dynamicContentDiv', {static: false, read: ViewContainerRef}) dynamicContentDiv?: ViewContainerRef;

	public spec: GridColCustomSpec | undefined = undefined;

	constructor(public gridService: GridService,
				private componentFactoryResolver: ComponentFactoryResolver,
				private changeDetectorRef: ChangeDetectorRef) {
		super(gridService);
	}

	ngOnInit(): void {
		super.ngOnInit();
		this.spec = this.colSpec && this.colSpec.typeSpec ? this.colSpec.typeSpec as GridColCustomSpec : undefined;
	}

	ngAfterViewInit(): void {
		if (this.spec && this.spec.componentName) {
			try {
				// const templateTypes: { [name: string]: Type<any> } =
				//     this.gridService.customComponents.reduce((p, c) => {
				//             (p as any)[c.name] = c;
				//             return p
				//         }, {}
				//     );
				// const templateType = templateTypes[this.spec.componentName];
				// console.log('customComponents:', this.gridService.customComponents);
				// console.log('templateTypes:', templateType, templateTypes);
				// const componentFactory = this.componentFactoryResolver.resolveComponentFactory(templateType);
				const comp = this.spec.componentName === 'TomeIconComponent' ? TomeIconComponent : VerseBodyCellComponent;
				const componentFactory = this.componentFactoryResolver.resolveComponentFactory(comp);
				if (componentFactory && this.dynamicContentDiv && this.item) {
					this.dynamicContentDiv.clear();
					const componentRef = this.dynamicContentDiv.createComponent(componentFactory);
					if (componentRef) {
						componentRef.instance['data'] = this.item.record;
						if (this.spec.componentInputs) {
							for (const input of this.spec.componentInputs) {
								(componentRef.instance as any)[input.name] = input.value;
							}
						}
						this.changeDetectorRef.detectChanges();
					} else {
						console.warn('Component not found:' + this.spec.componentName);
					}
				} else {
					console.warn('Cannot resolve custom component:' + this.spec.componentName);
				}
			} catch (exception) {
				console.error('Custom grid component exception:', exception);
			}
		}
	}

	ngOnDestroy(): void {
		super.ngOnDestroy();
	}
}
