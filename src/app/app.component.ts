import { Component, computed, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ValidationType } from './types/validation.type';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'tip-calculator';

  billValue: WritableSignal<number | null> = signal(null);
  tipValue = signal(0);
  tipByPerson = signal(0);
  countPeople: WritableSignal<number | null> = signal(null);
  tipAmount = computed(() => {
    const totalAmoutByPerson = Number(this.onCalculateTotalAmount());
    return totalAmoutByPerson;
  });
  totalPayment = computed(() => {
    const totalPaymentByPerson = Number(this.onCalculateTotalPayment());
    return totalPaymentByPerson;
  });

  tipCustomValue = null;
  tipPercentages = [5, 10, 15, 25, 50];
  regex = /^[0-9]*\.?[0-9]*$/;


  constructor() {
    this.validations();
  }
  
  private validationMessages = {
    number: 'This is not a valid number',
    peopleMoreThanZero: "Can't be zero",
  }

  public validated: { bill: ValidationType, people: ValidationType, tip: ValidationType } | null = null;

  
  public onSetTip(percentaje: number) {
    this.tipValue.set(percentaje);
    this.tipCustomValue = null;
    this.tipByPerson.set(percentaje);
  }

  public onChangeCustomTip(tipValue: number) {
    if (tipValue) {
      if (tipValue <= 100) {
        this.tipValue.set(0);
        this.tipByPerson.set(tipValue);
        this.cleanValidation(this.validated!.tip);
      } else {
        this.validated!.tip = this.validateStatusNumber(false, this.validated!.tip);
      }
    }
  }

  public onChangeBill(event: number) {
    if (event) {
      this.billValue.set(event);
    }
  }

  public onCalculateTotalAmount() {
    if (!this.countPeople() || this.countPeople()! <= 0) return 0
    return ((this.billValue()! * (this.tipByPerson() / 100)) / this.countPeople()!).toFixed(2);;
  }

  public onCalculateTotalPayment() {
    if (!this.countPeople() || this.countPeople()! <= 0) return 0
    return ((this.billValue()! / this.countPeople()!) + Number(this.onCalculateTotalAmount())).toFixed(2);
  }

  public onReset() {
    this.validations();
    this.billValue.set(null);
    this.tipValue.set(0);
    this.tipByPerson.set(0);
    this.countPeople.set(null);
  }

  public validateBill(event: any) {
    const value = event.data as String;
    if (value && value.length > 0) {
      const isNumber = this.regex.test(String(value));
      this.validated!.bill = this.validateStatusNumber(isNumber, this.validated!.bill);
    }
    else {
      this.cleanValidation(this.validated!.bill);
    }
  }

  public validatePeople(event: any) {
    const value = event.data as String;
    if (value && value.length > 0) {
      const isNumber = this.regex.test(String(value));
      const isNumberMoreThanZero = isNumber ? Number(value) > 0 : true;
      this.validated!.people = this.validateStatusNumber(isNumber, this.validated!.people);
      if (this.validated!.people.status)
        this.validated!.people = this.validateNumberMoreThanZero(isNumberMoreThanZero, this.validated!.people);
    } else {
      this.cleanValidation(this.validated!.people);
    }
  }

  private validateStatusNumber(isNumber: boolean, validation: ValidationType): ValidationType {
    let idxValidationNumber = -1;
    if (!isNumber) {
      idxValidationNumber = this.getMessagePosition(validation.message, this.validationMessages.number);
      if (idxValidationNumber === -1) {
        validation.status = false;
        validation.message.push(this.validationMessages.number);
      }
    } else {
      this.cleanValidation(validation);
    }
    return validation;
  }

  private validateNumberMoreThanZero(isNumberMoreThanZero: boolean, validation: ValidationType): ValidationType {
    if (!isNumberMoreThanZero) {
      validation.status = isNumberMoreThanZero;
      validation.message.push(this.validationMessages.peopleMoreThanZero)
    } else {
      this.cleanValidation(validation);
    }
    return validation;
  }

  private getMessagePosition(messages: string[], validationMessage: string) {
    let idxValidationNumber = messages.findIndex(item => item === validationMessage)
    return idxValidationNumber;
  }

  private cleanValidation(validation: ValidationType) {
    validation.status = true;
    validation.message = [];
  }

  private validations() {
    this.validated = {
      bill: {
        message: [],
        status: true
      },
      people: {
        message: [],
        status: true
      },
      tip: {
        message: [],
        status: true
      }
    }
  }
}
