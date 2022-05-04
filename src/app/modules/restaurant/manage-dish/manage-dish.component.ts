import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalFunctionService } from 'src/app/system/services/global-function.service';
import { ApiService } from '../utilities/services/api.service';

@Component({
  selector: 'app-manage-dish',
  templateUrl: './manage-dish.component.html',
  styleUrls: ['./manage-dish.component.scss']
})
export class ManageDishComponent implements OnInit {

  action: 'addDish' | 'editDish';
  submitDisable: boolean = true;
  dishForm: FormGroup;
  fileName;
  popupRef;
  dishDetail;
  title: string = 'Add Dish Details';
  dishCategorys = [{
    key: 'Veg',
    value: 'Veg'
  },
  {
    key: 'Non-veg',
    value: 'Non-veg'
  }];

  constructor(
    private fb: FormBuilder,
    public gfService: GlobalFunctionService,
    private cdref: ChangeDetectorRef,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {

    this.dishForm = this.fb.group({
      dishName: ['', [Validators.required]],
      dishCategory: ['', [Validators.required]],
      dishType: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.max(1000)]],
      discount: ['', [Validators.max(100)]],
      dishImage: ['']
    });
    console.log(this.dishDetail)
    if (this.action === 'editDish') {
      this.title = 'Edit Dish Details';
      this.getDishDetail();
    } else {
      this.submitDisable = false;
    }
  }

  getDishDetail() {
    // const headers: any = {};
    // this.apiService.getDishDetail(this.dishDetail.recordID, headers).subscribe(
    //   	async (response) => {
    //   		if (response) {
    //         this.dishDetail = response;
    const formValue: any = {
      dishName: { value: this.dishDetail.dishName },
      dishCategory: { value: this.dishDetail.dishCategory },
      dishType: { value: this.dishDetail.dishType },
      amount: { value: this.dishDetail.amount },
      discount: { value: this.dishDetail.discount },
      dishImage: { value: this.dishDetail.dishImage }
    };

    console.log(this.dishDetail)

    this.gfService.updateFormValue(formValue, this.dishForm);

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

  // convenience getter for easy access to form fields
  get form() {
    return this.dishForm.controls;
  }

  triggerFile(input: HTMLInputElement) {
    this.form.dishImage.markAsTouched();
    input.click();
  }

  async uploadFile(event) {
    if (this.form.dishImage.untouched) {
      this.form.dishImage.markAsTouched();
    }
    if (event.target.files[0]) {
      this.fileName = null;
      const file = event.target.files[0];
      const fileExt = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase();
      if (['jpg', 'jpeg', 'png'].includes(fileExt)) {
        const finalValue = await this.gfService.fileToDataURL(file);
        this.form.dishImage.patchValue(finalValue, { emitEvent: false });
        this.fileName = file.name;
      } else {
        this.form.dishImage.patchValue(null, { emitEvent: false });
      }
    }
  }

  submit() {
    console.log(this.dishForm)
    console.log(this.dishForm.getRawValue())
    this.submitDisable = true;
    if (this.dishForm.valid) {
      const headers: any = {};
      const formData = this.dishForm.getRawValue();
      formData.recordID = 1;
      console.log(formData)
      const apiValue = this.gfService.convertToFormData(formData);
      this.popupRef.close(formData);
      let method = this.apiService.saveDish(apiValue, headers);
      if (this.action === 'editDish') {
        method = this.apiService.updateDish(apiValue, this.dishDetail.dishID, headers);
      }
      // 	method.subscribe(
      // 	async (response) => {
      // 		if (response) {
      this.popupRef.close(this.gfService.JSONMerge(formData, { recordID: 1 }));
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
      this.gfService.fieldControlMarkAsTouched(this.dishForm)
      this.submitDisable = false;
    }
  }

}
