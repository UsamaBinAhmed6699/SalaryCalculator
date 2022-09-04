import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../shared/components/not-found/not-found.component';
import { SalaryCalculatorComponent } from './salary-calculator/salary-calculator.component';

const routes: Routes = [
  {
    path: 'salary-calculator',
    component: SalaryCalculatorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesRoutingModule {}
