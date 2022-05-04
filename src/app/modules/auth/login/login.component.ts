import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GlobalFunctionService } from 'src/app/system/services/global-function.service';
import { Router } from '@angular/router';
import { AppInitializerService } from 'src/app/app-initializer.service';
import { BaseService } from 'src/app/system/services/base.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm') public loginForm: NgForm;
  data = {
    loginType: 2,
    userID: 'admin@gmail.com',
    password: '123456',
    mobileNumber: null,
  };
  loginTypes = [
    {
      key: 'Restaurant',
      value: 1,
    },
    {
      key: 'Customer',
      value: 2,
    },
    {
      key: 'Delivery',
      value: 3,
    },
  ];
  isEmail = true;
  submitDisable = false;

  constructor(
    private activatedRouter: ActivatedRoute,
    private appInit: AppInitializerService,
    private baseService: BaseService,
    public gfService: GlobalFunctionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRouter.url.subscribe((params) => {
      console.log(params);
    });

    // this.gfService.routeNavigation('restaurant/outletList');
  }

  submit() {
    console.log(this.loginForm);
    this.submitDisable = true;
    if (this.loginForm.valid) {
      if (
        this.data.userID === 'admin@gmail.com' &&
        this.data.password === '123456'
      ) {
        this.submitDisable = false;
        const loginType = this.baseService.referenceType(
          'roleStatus',
          this.data.loginType
        );

        this.data.loginType = loginType;

        if (this.appInit.configuration.setToken) {
          const expire = this.appInit.configuration.sessionExpireTime;
          const options = {
            expire,
          };
          // this.gfService.setCookie('token', response.token, options);
          this.gfService.setCookie('token', 'sdfsfsdfsdsfsfsd', options);
        }

        // this.router.navigate(['./restaurant', 'outletList']);
        this.gfService.routeNavigation('restaurant/outletList');
        // this.gfService.routeNavigation('restaurant/orders');
        this.gfService.sessionUser = this.data;
        console.log(this.data);

        if (['customer', 'restaurant'].includes(loginType.key)) {
          this.gfService.routeNavigation('restaurant/outletList');
        } else if (loginType.key === 'delivery') {
          this.gfService.routeNavigation('restaurant/orders');
        }

        const headers: any = {};
        // 	this.apiService.login(formData, headers).subscribe(
        // 	async (response) => {
        // 		if (response) {
        // 			// this.gfService.openSnackBar('SUCCESS', {
        // 			// 	message: this.locale.translate(msg),
        // 			// 	icon: 'check_circle_outline',
        // 			// 	position: 'before'
        // 			// });
        // 		}
        // 	},
        // 	(error) => {
        // 		// this.gfService.alertHandler(error, 'addResourceAlert', 'ERROR');
        // 		// this.gfService.formErrorHandler(error, this.formObjectData.form);
        // 	}
        // )
        // 	.add(() => {
        // 		this.submitDisable = false;
        // 			// this.loader = false;
        // 	});
      }
    } else {
      this.gfService.fieldControlMarkAsTouched(this.loginForm.form);
      this.submitDisable = false;
    }
  }

  toggleUserID() {
    this.isEmail = this.isEmail ? false : true;
  }
}
