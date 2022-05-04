import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalFunctionService } from 'src/app/system/services/global-function.service';
import { ApiService } from '../utilities/services/api.service';

@Component({
  selector: 'app-manage-outlet',
  templateUrl: './manage-outlet.component.html',
  styleUrls: ['./manage-outlet.component.scss']
})
export class ManageOutletComponent implements OnInit {

  action: 'addOutlet' | 'editOutlet';
  submitDisable: boolean = true;
  outLetForm: FormGroup;
  countryList = [{
    key: 'India',
    value: 1
  }];
  stateList = [{
    key: 'Tamil Nadu',
    value: 1
  }];
  cityList = [{
    key: 'Chennai',
    value: 1
  }];
  fileName;
  popupRef;
  outletDetail;
  title: string = 'Add Outlet Details';

  constructor(
    private fb: FormBuilder,
    public gfService: GlobalFunctionService,
    private cdref: ChangeDetectorRef,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {

    this.outLetForm = this.fb.group({
      outletName: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(70)]],
      emailID: ['', [Validators.required, Validators.email]],
      phoneNumberArray: this.fb.array([this.createItem()]),
      address: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
      pinCode: ['', [Validators.required, Validators.maxLength(7)]],
      outletImage: ['', [Validators.required]]
    });
    console.log(this.outLetForm)
    if (this.action === 'editOutlet') {
      this.title = 'Edit Outlet Details';
      this.getOutletDetail();
    } else {
      this.submitDisable = false;
    }

  }

  createItem(): FormGroup {
    return this.fb.group({
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9/]+$'), Validators.minLength(10), Validators.maxLength(10)]]
    });
  }

  // convenience getter for easy access to form fields
  get form() {
    return this.outLetForm.controls;
  }

  get t() {
    return this.form.phoneNumberArray as FormArray;
  }

  changeFields(type: string, index = null) {
    if (type === 'add') {
      this.t.push(this.createItem());
    } else {
      this.t.removeAt(index);
    }
  }

  triggerFile(input: HTMLInputElement) {
    this.form.outletImage.markAsTouched();
    input.click();
  }

  async uploadFile(event) {
    if (this.form.outletImage.untouched) {
      this.form.outletImage.markAsTouched();
    }
    if (event.target.files[0]) {
      this.fileName = null;
      const file = event.target.files[0];
      const fileExt = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase();
      if (['jpg', 'jpeg', 'png'].includes(fileExt)) {
        const finalValue = await this.gfService.fileToDataURL(file);
        this.form.outletImage.patchValue(finalValue, { emitEvent: false });
        this.fileName = file.name;
      } else {
        this.form.outletImage.patchValue(null, { emitEvent: false });
      }
    }
  }

  getOutletDetail() {
    // const headers: any = {};
    // this.apiService.getOutletDetail(this.outletDetail.recordID, headers).subscribe(
    //   	async (response) => {
    //   		if (response) {
    //         this.outletDetail = response;
    const formValue: any = {
      outletName: { value: this.outletDetail.outletName },
      description: { value: this.outletDetail.description },
      emailID: { value: this.outletDetail.emailID },
      address: { value: this.outletDetail.address },
      state: { value: this.outletDetail.state },
      city: { value: this.outletDetail.city },
      country: { value: this.outletDetail.country },
      pinCode: { value: this.outletDetail.pinCode },
      outletImage: { value: this.outletDetail.outletImage },
    };

    console.log(this.outletDetail)

    if (this.outletDetail.phoneNumberArray.length) {
      formValue.phoneNumberArray = [];
      this.outletDetail.phoneNumberArray.forEach((data, index) => {
        if (index) {
          this.changeFields('add');
        }
        formValue.phoneNumberArray.push(
          {
            phoneNumber: {
              value: data
            }
          }
        )

      });

    }
    this.gfService.updateFormValue(formValue, this.outLetForm);

    // 		}
    // 	},
    // 	(error) => {
    // 		// this.gfService.formErrorHandler(error, this.formObjectData.form);
    // 	}
    // )
    // 	.add(() => {
    this.submitDisable = false;
    // 			// this.loader = false;
    // 	});
  }

  submit() {
    console.log(this.outLetForm)
    console.log(this.outLetForm.getRawValue())
    this.submitDisable = true;
    if (this.outLetForm.valid) {
      const headers: any = {};
      const formData = this.outLetForm.getRawValue();
      formData.recordID = 1;
      console.log(formData)
      const apiValue = this.gfService.convertToFormData(formData);
      this.popupRef.close(formData);
      let method = this.apiService.saveOutlet;
      if (this.action === 'editOutlet') {
        method = this.apiService.updateOutlet;
      }
      // 	method.saveOutlet(apiValue, headers).subscribe(
      // 	async (response) => {
      // 		if (response) {
      // this.popupRef.close(this.gfService.JSONMerge(apiValue, response));
      // 			// this.gfService.openSnackBar('SUCCESS', {
      // 			// 	message: this.locale.translate(msg),
      // 			// 	icon: 'check_circle_outline',
      // 			// 	position: 'before'
      // 			// });
      // 		}
      // 	},
      // 	(error) => {
      // 		// this.gfService.formErrorHandler(error, this.formObjectData.form);
      // 	}
      // )
      // 	.add(() => {
      // 		this.submitDisable = false;			
      // 			// this.loader = false;
      // 	});

    } else {
      this.gfService.fieldControlMarkAsTouched(this.outLetForm)
      this.submitDisable = false;
    }
  }

}
