import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { NotFoundComponent } from './components/not-found/not-found.component';
import { RouterModule, Routes } from '@angular/router';
// import { MatMenuModule } from '@angular/material/menu';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
const routes: Routes = [
  {
    path: "not-found",
    component: NotFoundComponent
  },
]
@NgModule({
  declarations: [
    
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    RouterModule.forChild(routes),
    // MatMenuModule,
   
  ],
  exports: [TranslateModule],
  providers: [TranslateService, CurrencyPipe]
})
export class SharedModule {
  // Looks for the module in the parent injector to see if it's already been loaded (only want it loaded once)
  // constructor(@Optional() @SkipSelf() parentModule: SharedModule) {
  //   super(parentModule);
  // }
}
