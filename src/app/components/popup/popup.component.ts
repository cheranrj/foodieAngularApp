import { Component, OnInit, Inject, AfterViewInit, ViewChild, ViewContainerRef, ComponentRef, OnDestroy, ElementRef, ChangeDetectorRef, Injector, ContentChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GlobalFunctionService } from '../../system/services/global-function.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('content', { read: ViewContainerRef })
  vcRef: ViewContainerRef;

  componentRef: ComponentRef<any>;
  dialogCloseData;
  loader = true;
  submitDisable = false;
  clearTimeout;
  popupLoader = false;
  componentReference;

  constructor(
    public dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any = {},
    public gfService: GlobalFunctionService,
    private cdref: ChangeDetectorRef
  ) {
    if (!navigator.onLine) {
      this.dialogRef.close();
    }
  }

  ngOnInit() {
  }

  async ngAfterViewInit() {
    if (navigator.onLine) {
      if (this.data.action === 'dynamic') {
        setTimeout(async () => {
          let data = [];
          if (this.data.componentData) {
            data = this.data.componentData;
            if (typeof this.data.componentData === 'object' && !Array.isArray(this.data.componentData)) {
              data = [this.data.componentData];
            }
          }
          data = data.concat([{ variableName: 'popupRef', value: this.dialogRef }]);
          this.componentReference = await this.gfService.loadComponent(this.data.component, this.vcRef, data);
          this.loader = false;
        });
      } else if (this.data.action === 'alert') {
        this.loader = false;
        this.cdref.detectChanges();
      }
    }
  }


  close() {
    if (this.componentReference && this.componentReference.dialogClose) {
      this.componentReference.dialogClose();
    } else {
      this.dialogRef.close(this.dialogCloseData || 'close');
    }
  }

  buttonTrigger(data) {
    this.dialogRef.close(data);
  }

  ngOnDestroy() {
    if (this.data.triggerEl) {
      const el: HTMLElement = this.data.triggerEl['_elementRef'].nativeElement;
      setTimeout(() => {
        el.blur();
      });
    }
  }
}
