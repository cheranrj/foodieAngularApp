import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AppInitializerService } from './app-initializer.service';
import { GlobalFunctionService } from './system/services/global-function.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'foodieApp';
	menuList = [];

	constructor(
		private iconRegistry: MatIconRegistry,
		private appInit: AppInitializerService,
		public gfService: GlobalFunctionService,
		private sanitizer: DomSanitizer,
	) {

		iconRegistry.addSvgIcon('image_collection', sanitizer.bypassSecurityTrustResourceUrl('/assets/svg/image-collection.svg'));
		this.gfService.sessionUser = this.appInit.sessionUser;
	}
	ngOnInit(): void {
		console.log('in')
		this.menuList.push({
			key: ''
		});
	}
}
