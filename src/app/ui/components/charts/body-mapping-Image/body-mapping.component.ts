import { Component, OnInit } from '@angular/core';

interface BodyPart {
  name: string;
  top: number;
  left: number;
}

@Component({
  selector: 'app-body-mapping',
  templateUrl: './body-mapping.component.html',
  styleUrls: ['./body-mapping.component.scss']
})

export class BodyMappingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  selectedParts: BodyPart[] = [];

  selectBodyPart(event: MouseEvent, partName: string): void {
    const existingPart = this.selectedParts.find(part => part.name === partName);

    if (existingPart) {
      // Remove the part if it is already selected
      this.selectedParts = this.selectedParts.filter(part => part.name !== partName);
    } else {
      // Add the part with its position
      const rect = (event.target as HTMLElement).getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const offsetY = event.clientY - rect.top;

      this.selectedParts.push({ name: partName, top: offsetY, left: offsetX });
    }
  }

}
