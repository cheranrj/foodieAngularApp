import { Component, OnInit } from '@angular/core';
import { GlobalFunctionService } from '../system/services/global-function.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public gfService: GlobalFunctionService) {}

  ngOnInit(): void {}

  logout() {
    this.gfService.routeNavigation('auth/login');
  }
}
