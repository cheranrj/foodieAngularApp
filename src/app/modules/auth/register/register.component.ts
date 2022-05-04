import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

import { GlobalFunctionService } from 'src/app/system/services/global-function.service';
import { CustomValidatorsService } from 'src/app/system/services/custom-validators.service';
import { ApiService } from '../utilities/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  data = {
    loginType: null,
    emailID: null,
    userName: null,
    password: null,
    confirmPassword: null,
    mobileNumber: null,
  };
  registerationTypes = [
    {
      key: 'Restaurant',
      value: 'Restaurant',
      icon: 'fastfood',
    },
    {
      key: 'Customer',
      value: 'Customer',
      icon: 'people',
    },
    {
      key: 'Delivery',
      value: 'Delivery',
      icon: 'motorcycle',
    },
  ];
  submitDisable = false;
  screenType: string = 'signUpType';
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public gfService: GlobalFunctionService,
    private customValidator: CustomValidatorsService,
    private cdref: ChangeDetectorRef,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setScreen(this.registerationTypes[1]);
  }

  setScreen(type) {
    console.log(type);
    this.screenType = 'signUpForm';
    // this.data.loginType = type.key;
    this.registerForm = this.fb.group(
      {
        loginType: [type.key, Validators.required],
        userName: ['', [Validators.required]],
        emailID: ['', [Validators.required, Validators.email]],
        mobileNumber: [
          '',
          [
            Validators.required,
            Validators.pattern('^[0-9/]+$'),
            Validators.minLength(10),
            Validators.maxLength(10),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.maxLength(10),
            Validators.minLength(6),
          ],
        ],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      {
        validator: this.customValidator.MatchPassword(
          'password',
          'confirmPassword'
        ),
      }
    );
  }

  // convenience getter for easy access to form fields
  get form() {
    return this.registerForm.controls;
  }

  submit() {
    console.log(this.registerForm);
    this.submitDisable = true;
    if (this.registerForm.valid) {
      this.router.navigate(['auth', 'login']);
      const headers: any = {};
      // 	this.apiService.saveUser(formData, headers).subscribe(
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
    } else {
      this.gfService.fieldControlMarkAsTouched(this.registerForm);
      this.submitDisable = false;
    }
  }
}
