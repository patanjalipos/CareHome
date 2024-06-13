import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';

interface BodyPart {
    name: string;
    top: number;
    left: number;
}

@Component({
    selector: 'app-body-mapping',
    templateUrl: './body-mapping.component.html',
    styleUrls: ['./body-mapping.component.scss'],
})
export class BodyMappingComponent implements OnInit {
    @Output() bodyData: EventEmitter<BodyPart[]> = new EventEmitter();
    @Input() preselectedBodyParts: any = <any>[];

    selectedParts: BodyPart[] = [];

    constructor() {}
    ngOnInit(): void {
        if (this.preselectedBodyParts) {
            this.selectedParts = [...this.preselectedBodyParts];
        }
    }

    removePart(part: { name: string, top: number, left: number }) {
        this.selectedParts = this.selectedParts.filter(p => p !== part);
        // Emit the selected parts
        this.bodyData.emit(this.selectedParts);
      }

    selectBodyPart(event: MouseEvent, partName: string): void {
        const existingPart = this.selectedParts.find(
            (part) => part.name === partName
        );

        if (existingPart) {
            // Remove the part if it is already selected
            this.selectedParts = this.selectedParts.filter(
                (part) => part.name !== partName
            );
        } else {
            // Add the part with its position
            const rect = (event.target as HTMLElement).getBoundingClientRect();
            const offsetX = event.clientX - rect.left;
            const offsetY = event.clientY - rect.top;

            this.selectedParts.push({
                left: offsetX,
                name: partName,
                top: offsetY,
            });
        }
        // Emit the selected parts
        this.bodyData.emit(this.selectedParts);
    }
}
