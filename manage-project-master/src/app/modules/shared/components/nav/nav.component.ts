import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  @Output() toggle: EventEmitter<void> = new EventEmitter<void>();

  onToggle() {
    this.toggle.emit();
  }
}
