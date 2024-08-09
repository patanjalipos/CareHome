import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-care-signs-of-ill-being',
    templateUrl: './care-signs-of-ill-being.component.html',
    styleUrls: ['./care-signs-of-ill-being.component.scss'],
})
export class CareSignsOfIllBeingComponent implements OnInit {
    @Input() preSelectedFormData: any = <any>{};
    @Output() EmitUpdateForm: EventEmitter<any> = new EventEmitter<any>();
    constructor() {}

    ngOnInit(): void {}
    
}
