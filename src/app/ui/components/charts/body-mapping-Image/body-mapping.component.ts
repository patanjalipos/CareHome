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
    @Output() bodyData: EventEmitter<any> = new EventEmitter();
    @Input() preSelectedBodyMapData: any = <any>[];
    @Input() isReadOnly: boolean = false; //View Mode

    bodyMapData: any;
    selectedParts: BodyPart[] = [];
    selectedPartsCheck: BodyPart[] = [];
    lstStatusOptions: any = ['InActive', 'Active'];
    selectedStatus: string | null = null;
    SelectOrRemoveCheck: boolean = false;

    constructor() { }
    ngOnInit(): void {debugger
        if (this.preSelectedBodyMapData && this.preSelectedBodyMapData.buttoncheck == true) {
            this.selectedParts = [...this.preSelectedBodyMapData.preselectedBodyParts];
            this.selectedStatus = this.preSelectedBodyMapData.status
        }
        else if (this.preSelectedBodyMapData.count >= 0 && this.preSelectedBodyMapData.buttoncheck == false) {
            if (this.preSelectedBodyMapData.UpdatedParts.length == 0 && this.preSelectedBodyMapData.SelectionRemovalCheck == false) {
                this.selectedParts = [...this.preSelectedBodyMapData.lastSelectedBodyPart];
            }
            else {
                this.selectedParts = [...this.preSelectedBodyMapData.UpdatedParts];
            }
            this.selectedParts = [...new Set(this.selectedParts)];
            this.selectedStatus = this.preSelectedBodyMapData.status;
        }
        this.emitData();
    }


    // Emit the selected parts and Status
    emitData() {
        if (!this.isReadOnly) {
            this.bodyMapData = {
                selectedBodyParts: this.selectedParts,
                bodyMapStatus: this.selectedStatus != null ? this.selectedStatus : this.lstStatusOptions[0],
                selectOrRemoveCheck: this.SelectOrRemoveCheck
            };
            this.bodyData.emit(this.bodyMapData);
        }
    }

    removePart(part: { name: string; top: number; left: number }) {
        this.SelectOrRemoveCheck = true;
        this.selectedParts = this.selectedParts.filter((p) => p !== part);
        this.selectedPartsCheck = this.selectedPartsCheck.filter((p) => p !== part);
        // Emit the selected parts
        this.emitData();
    }

    selectBodyPart(event: MouseEvent, partName: string): void {
        this.SelectOrRemoveCheck = true;
        const existingPart = this.selectedParts.find(
            (part) => part.name === partName
        );

        if (existingPart) {
            // Remove the part if it is already selected
            this.selectedParts = this.selectedParts.filter(
                (part) => part.name !== partName
            );
            this.selectedPartsCheck = this.selectedPartsCheck.filter(
                (part) => part.name !== partName
            )
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
        this.emitData();
    }
}
