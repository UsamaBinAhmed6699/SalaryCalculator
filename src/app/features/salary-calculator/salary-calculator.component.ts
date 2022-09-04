import { Directive, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import * as _moment from 'moment';
import BaseSalaries from '../../../assets/data/BaseSalaries.json';
import SalaryRise from '../../../assets/data/SalaryRise.json';
import CityTaxRate from '../../../assets/data/CityTaxRate.json';
import HighIncomeTax from '../../../assets/data/HighIncomeTax.json';
import { MY_FORMATS } from 'src/app/core/constants/dateFormate';

@Component({
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: MY_FORMATS,
    },
  ],
  selector: 'app-salary-calculator',
  templateUrl: './salary-calculator.component.html',
  styleUrls: ['./salary-calculator.component.scss'],
})
export class SalaryCalculatorComponent implements OnInit {
  // Component Level properties and variables created
  @ViewChild('picker', { static: false })
  private picker!: MatDatepicker<Date>;
  selectYear: any;
  minDate = new Date(2019, 0, 1);
  maxDate = new Date(2020, 1, 1);
  totalSalary: number = 0;
  baseTax: number = 0;
  monthlyIncomeAfterTax: number = 0;
  form: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  chosenYearHandler(ev: { _d: any }, input: any) {
    let { _d } = ev;
    this.selectYear = _d;
    this.picker.close();
  }
  //Form created for Salary Calculator
  createForm() {
    this.form = this.fb.group({
      yearsExperience: [null, [Validators.required, Validators.maxLength(10)]],
      occupation: [null, [Validators.required]],
      city: [null, [Validators.required]],
      incomeYear: [null, [Validators.required]],
    });
  }

  //Calculate salary on submit form button .
  //Tax rates and salary rise are configurable and get from Json files creates in assets/data forlder .
  CalculateSalary(form: any) {
    const { occupation, yearsExperience, city, incomeYear } = form.value;

    let baseSalary = BaseSalaries.find(
      (salary: any) =>
        salary.Occupation.toLowerCase() == occupation.toLowerCase()
    )?.Salary;
    let payRise = SalaryRise.find(
      (rise: any) =>
        yearsExperience >= rise.MinExperience &&
        yearsExperience <=
          (rise.MaxExperience ? rise.MaxExperience : yearsExperience + 1)
    )?.PayRise;
    let taxRate = CityTaxRate.find(
      (rate: any) =>
        rate.city.toLowerCase() == city.toLowerCase() &&
        rate.year == this.selectYear.getFullYear()
    )?.rate;

    this.totalSalary = baseSalary * (payRise / 100.0) + baseSalary;
    this.baseTax = this.totalSalary * (taxRate / 100.0);
    let totalHignIncomeTax = 0;
    HighIncomeTax.map((salaryRange: any) => {
      if (this.totalSalary > salaryRange.MinRange) {
        let maxRange = salaryRange.MaxRange
          ? salaryRange.MaxRange
          : this.totalSalary + 1;
        totalHignIncomeTax +=
          ((this.totalSalary > maxRange ? maxRange : this.totalSalary) -
            salaryRange.MinRange) *
          (salaryRange.TaxRate / 100.0);
      }
    });

    this.monthlyIncomeAfterTax =
      this.totalSalary - this.baseTax - totalHignIncomeTax;
    return this.monthlyIncomeAfterTax;
  }
}
