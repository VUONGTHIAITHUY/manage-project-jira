import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavComponent } from './components/nav/nav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { FirstCharacterPipePipe } from './pipes/first-character-pipe.pipe';
import { UserPopupComponent } from './components/user-popup/user-popup.component';

const COMPONENTS = [
  SidebarComponent,
  NavComponent,
  BreadcrumbComponent,
]

@NgModule({
  declarations: [
    COMPONENTS,
    UserPopupComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    RouterModule,
    MatExpansionModule,
    MatTooltipModule,
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class SharedModule { }
