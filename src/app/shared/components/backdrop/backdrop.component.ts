import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-backdrop',
  templateUrl: './backdrop.component.html',
  styleUrls: ['./backdrop.component.scss'],
})
export class BackdropComponent {
  @Input('isShowBackdrop') isShowBackdrop = false;
  @Output() onCloseBackdrop = new EventEmitter();

  handleCloseBackdrop() {
    this.onCloseBackdrop.emit();
  }
}
