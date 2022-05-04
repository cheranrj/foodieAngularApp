import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeDomPipe } from './safe-dom/safe-dom.pipe';

@NgModule({
  declarations: [SafeDomPipe],
  imports: [
    CommonModule
  ],
  exports: [
    SafeDomPipe
  ],
  providers: [
    SafeDomPipe
  ]
})
export class PipeModule { }
