import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BaseService } from './services/base.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule],
  exports: [],
  providers: [BaseService],
})
export class CoreModule {}
