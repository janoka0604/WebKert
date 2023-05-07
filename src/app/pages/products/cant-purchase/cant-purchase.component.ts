import { Component,  Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cant-purchase',
  templateUrl: './cant-purchase.component.html',
  styleUrls: ['./cant-purchase.component.scss'],
  template: `
    <button (click)="onButtonClick()">Vásárlás</button>
  `
})
export class CantPurchaseComponent {
  @Output() orderClick: EventEmitter<string> = new EventEmitter<string>();

  onButtonClick(): void {
    // Emit the message to the parent component
    this.orderClick.emit("Nem lehet jelenleg rendelni");
  }
}
