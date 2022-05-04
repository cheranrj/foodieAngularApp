import { DatePipe } from '@angular/common';
import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppInitializerService } from 'src/app/app-initializer.service';

@Injectable({
	providedIn: 'root'
})
export class GlobalFunctionService {

	sessionUser: any = null;
	constructor(
		private router: Router,
		private appInit: AppInitializerService,
		private componentFactoryResolver: ComponentFactoryResolver,
	) { }

	validationMsg(ctrl) {
		if (ctrl) {
			// console.log(ctrl)
			if (ctrl.errors) {
				if (ctrl.errors.required) {
					return '<span>This field is required. </span>';
				} else if (ctrl.errors.pattern) {
					return '<span> Invalid pattern </span>';
				} else if (ctrl.errors.minlength) {
					return '<span> Minimum length required is ' + ctrl.errors.minlength.requiredLength + '</span>';
				} else if (ctrl.errors.maxlength) {
					return '<span> Maximum length required is ' + ctrl.errors.maxlength.requiredLength + '</span>';
				} else if (ctrl.errors.min) {
					return '<span> Minimum value allowed is ' + ctrl.errors.min.min + '</span>';
				} else if (ctrl.errors.max) {
					return '<span> Maximum value allowed is ' + ctrl.errors.max.max + '</span>';
				} else if (ctrl.errors.passwordMismatch) {
					return '<span> Mismatch Password  </span>';
				}
			}
		}
	}

	fieldControlMarkAsTouched(form): void {
		Object.keys(form.controls).forEach(key => {
			if (form.controls[key].controls) {
				this.fieldControlMarkAsTouched(form.controls[key]);
			} else {
				if (
					form.controls[key].touched === false &&
					form.controls[key].status === 'INVALID'
				) {
					form.controls[key].markAsTouched();
				}

			}
		});
	}

	JSONMerge(source: object, data: object): any {
		const sourceVal = Object.assign({}, source);
		const dataVal = Object.assign({}, data);
		if (![null, undefined].includes(sourceVal) && ![null, undefined].includes(dataVal)) {
			for (const key in dataVal) {
				if (
					typeof sourceVal === 'object' &&
					sourceVal.hasOwnProperty(key) &&
					typeof sourceVal[key] === 'object' &&
					!Array.isArray(sourceVal[key])
				) {
					sourceVal[key] = this.JSONMerge(sourceVal[key], dataVal[key]);
				} else if (typeof sourceVal === 'object') {
					sourceVal[key] = dataVal[key];
				}
			}
		}

		return sourceVal;
	}

	routeNavigation(link: string, additionalData = null, params = null) {
		if (![null, undefined, ''].includes(link)) {
			if (![null, undefined, ''].includes(additionalData) && ![null, undefined, ''].includes(params)) {
				let linkData: any = [];
				linkData.push(link);
				linkData = linkData.concat(params);
				this.router.navigate(linkData, additionalData);
			} else if (![null, undefined, ''].includes(additionalData) && [null, ''].includes(params)) {
				this.router.navigate([link], { queryParams: additionalData });
			} else if (![null, undefined, ''].includes(params) && [null, ''].includes(additionalData)) {
				let linkData: any = [];
				linkData.push(link);
				linkData = linkData.concat(params);
				this.router.navigate(linkData);
			} else {
				this.router.navigate([link]);
			}
		}
		return false;
	}

	async loadComponent(component, container: ViewContainerRef, record: Array<{ variableName: string, value: any }>) {
		if (!Array.isArray(record)) {
			throw new Error('Record must be an array of json');
		} else if ([null, undefined, ''].includes(component)) {
			throw new Error('Component name should not be empty');
		}
		try {
			if (typeof component === 'object') {
				const actualComponent = await component;
				const key = Object.keys(actualComponent)[0];
				component = actualComponent[key];
			}
			const factory = this.componentFactoryResolver.resolveComponentFactory(component);
			// container.clear();
			const ref = container.createComponent(factory);
			for (const data of record) {
				ref.instance[data.variableName] = data.value;
			}
			ref.changeDetectorRef.detectChanges();
			return ref.instance;
		} catch (error) {
			throw new Error(error);
		}
	}

	async fileToDataURL(event) {
		return new Promise((resolve, reject) => {
			let file: File = event;
			if (event.target) {
				const target = event.target;
				const fileList: FileList = target.files;
				file = fileList[0];
			}
			if (file) {
				const ext = file.name.substring(file.name.lastIndexOf('.') + 1);
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = async () => {
					// if (['jpg', 'jpeg', 'png'].includes(ext)) {
					const result: string = reader.result.toString();
					resolve(result);
					// }
				};
			} else {
				reject('File is required.');
			}
		});
	}

	convertToFormData(apiValues): FormData {
		const formData = new FormData();
		for (const key of Object.keys(apiValues)) {
			let value = apiValues[key];
			if (Array.isArray(value)) {
				value = JSON.stringify(value);
			} else if (value && typeof value === 'object' && Object.keys(value).length) {
				value = JSON.stringify(value);
			}
			formData.append(key, value);
		}
		return formData;
	}

	updateFormValue(formValue, form: FormGroup | FormArray) {
		Object.keys(form.controls).forEach((key, index) => {
			if (form.controls[key].controls) {
				form.controls[key].controls.forEach((formArrayCtrl, formArrayCtrlIndex) => {
					this.updateFormValue(formValue[key][formArrayCtrlIndex], formArrayCtrl);
				});
			} else {
				if (!formValue[key].emitEvent) {
					formValue[key].emitEvent = false;
				}
				form.controls[key].patchValue(formValue[key].value, { emitEvent: formValue[key].emitEvent });
			}
		});

		if (form.untouched) {
			form.markAsTouched();
		}

	}

	trackByID(index: number, item) {
		if (this.hasOwnProperty('key') && item) {
			return item[this['key']];
		}
	}

	dateFormat(date: number, format: string) {
		return new DatePipe('en-US').transform(date, format);
	}

	refreshCookies(): void {
		// const currentUser = this.getCookie('currentUser');
		const expire = this.appInit.configuration.sessionExpireTime;
		const options = {
			expire
		};
		const token = this.getCookie('token');
		this.setCookie('token', token, options);
		// this.setCookie('currentUser', currentUser, options);
	}

	setCookie(name: string, value: any, options?): void {
		if (![null, undefined].includes(options.expire)) {
			const d: Date = new Date();
			d.setTime(d.getTime() + options.expire);
			const expires = `expires=${d.toUTCString()}`;
			if (this.isJson(value)) {
				value = JSON.stringify(value);
			}
			document.cookie = `${name}=${value}; ${expires}`;
		} else {
			document.cookie = `${name}=${value};`;
		}
	}

	getCookie(name: string) {
		try {
			const ca: Array<string> = decodeURIComponent(document.cookie).split(';');
			const caLen: number = ca.length;
			const cookieName = `${name}=`;
			let c: string;
			for (let i = 0; i < caLen; i += 1) {
				c = ca[i].replace(/^\s+/g, '');
				if (c.indexOf(cookieName) === 0) {
					const returnData = c.substring(cookieName.length, c.length);
					if (returnData) {
						if (this.isJson(returnData)) {
							return JSON.parse(returnData);
						}
						return returnData;
					}
				}
			}
		} catch (err) {
			return null;
		}
	}

	private isJson(item) {
		item = typeof item !== 'string' ? JSON.stringify(item) : item;
		try {
			item = JSON.parse(item);
		} catch (e) {
			// console.error(e);
			return false;
		}

		if (typeof item === 'object' && item !== null) {
			return true;
		}

		return false;
	}

	get isLogin() {
		return true;
		const currentUser = this.sessionUser;
		const token = this.getCookie('token');
		if (![null, undefined, ''].includes(currentUser) && ![null, undefined, ''].includes(token)) {
			this.refreshCookies();
			return true;
		}
		return false;
	}
}
