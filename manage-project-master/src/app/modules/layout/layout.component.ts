import { ChangeDetectionStrategy } from '@angular/compiler';
import { SidebarComponent } from '../shared/components/sidebar/sidebar.component';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  @ViewChild('sidebarComponent') sidebarComponent: SidebarComponent | undefined;

  onToggle() {
    this.sidebarComponent?.sidenav.toggle()
  }

}

