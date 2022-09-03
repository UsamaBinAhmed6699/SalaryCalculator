import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BaseService } from './services/base.service';
import { CurrencyDirectiveDirective } from './directives/currency-directive.directive';



@NgModule({
  declarations: [

  
    CurrencyDirectiveDirective
  ],
  imports: [
    CommonModule, RouterModule  ],
    exports:[
    CurrencyDirectiveDirective
  ],
    providers: [BaseService]
})
export class CoreModule { 

}
