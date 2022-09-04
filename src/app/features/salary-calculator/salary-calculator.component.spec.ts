import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule } from '@angular/common/http';
import { SalaryCalculatorComponent } from './salary-calculator.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
describe('SalaryCalculatorComponent', () => {
  let component: SalaryCalculatorComponent;
  let fixture: ComponentFixture<SalaryCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalaryCalculatorComponent],
      providers: [FormBuilder],
      imports: [
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
          },
        }),
        HttpClientModule,
        HttpClientTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SalaryCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be a valid form', () => {
    component.selectYear = new Date('Jan 01, 19');
    component.form.setValue({
      yearsExperience: 1,
      occupation: 'Teacher',
      city: 'Stockholm',
      incomeYear: component.selectYear.getFullYear(),
    });

    expect(component.form.valid).toEqual(true);
  });

  it('should not be a valid form', () => {
    component.selectYear = new Date('Jan 01, 19');
    component.form.setValue({
      yearsExperience: 1,
      occupation: '',
      city: '',
      incomeYear: component.selectYear.getFullYear(),
    });

    expect(component.form.valid).toEqual(false);
  });

  it('should return positive number', () => {
    component.selectYear = new Date('Jan 01, 19');
    component.form.setValue({
      yearsExperience: 1,
      occupation: 'Teacher',
      city: 'Stockholm',
      incomeYear: component.selectYear.getFullYear(),
    });

    expect(component.CalculateSalary(component.form)).toBeGreaterThan(0);
  });

  it('should not return any value, when entering wrong occupation', () => {
    component.selectYear = new Date('Jan 01, 19');
    component.form.setValue({
      yearsExperience: 1,
      occupation: 'Chef',
      city: 'Stockholm',
      incomeYear: component.selectYear.getFullYear(),
    });

    expect(component.CalculateSalary(component.form)).toBeNaN();
  });

  it('should not return any value, when entering wrong year', () => {
    component.selectYear = new Date('Jan 01, 2023');
    component.form.setValue({
      yearsExperience: 1,
      occupation: 'Teacher',
      city: 'Stockholm',
      incomeYear: component.selectYear.getFullYear(),
    });

    expect(component.CalculateSalary(component.form)).toBeNaN();
  });
});
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
