import { ChangeDetectionStrategy } from '@angular/compiler';
import { SidebarComponent } from '../shared/components/sidebar/sidebar.component';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements AfterViewInit{
  @ViewChild('sidebarComponent') sidebarComponent: SidebarComponent | undefined;

  isLoading: boolean = false;

  constructor(private _authService: AuthService) {
   
  }
  ngAfterViewInit(): void {
    this._authService.isLoading$.subscribe(
      (res: boolean) => {
        setTimeout(() => {
          this.isLoading = res;
        });
      }
    )
  }

  onToggle() {
    this.sidebarComponent?.sidenav.toggle()
  }

}


