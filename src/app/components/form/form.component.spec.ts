import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

import { FormComponent } from './form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form correctly', () => {
    expect(component.appForm).toBeDefined();
    expect(component.appForm instanceof FormGroup).toBe(true);

    const controls = component.appForm.controls;

    expect(controls['name']).toBeDefined();
    expect(controls['name'] instanceof FormControl).toBe(true);
    expect(controls['documentNumber']).toBeDefined();
    expect(controls['documentNumber'] instanceof FormControl).toBe(true);
    expect(controls['documentoCifrado']).toBeDefined();
    expect(controls['documentoCifrado'] instanceof FormControl).toBe(true);
  });

  it('should call onSubmit method when form is submitted', () => {
    spyOn(component, 'onSubmit');

    const formElement: HTMLFormElement = fixture.nativeElement.querySelector('form');
    formElement.dispatchEvent(new Event('submit'));

    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should call encriptAndHideNumber method when documentNumber input is blurred', () => {
    spyOn(component, 'encriptAndHideNumber');

    const documentNumberInput: HTMLInputElement = fixture.nativeElement.querySelector('#documentNumber');
    documentNumberInput.dispatchEvent(new Event('blur'));

    expect(component.encriptAndHideNumber).toHaveBeenCalledWith('documentNumber');
  });

  it('should call clearInput method when documentNumber input focused', () => {
    spyOn(component, 'clearInput');

    const documentNumberInput: HTMLInputElement = fixture.nativeElement.querySelector('#documentNumber');
    documentNumberInput.dispatchEvent(new Event('focus'));

    expect(component.clearInput).toHaveBeenCalledWith('documentNumber');
  });

  it('should clear the value of the field when clearInput is called', () => {
    const campo = 'documentNumber';
    const initialValue = '123456789';

    component.appForm.get(campo)?.setValue(initialValue);

    component.clearInput(campo);

    const fieldValue = component.appForm.get(campo)?.value;

    expect(fieldValue).toEqual('');
  });

});
