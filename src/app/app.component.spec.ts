import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
    })

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;

    fixture.detectChanges();
  });

  beforeEach(() => {
    app.billValue.set(1000);
    app.countPeople.set(4);
    app.tipValue.set(10);
    app.tipByPerson.set(10);
  });


  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have the 'tip-calculator' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('tip-calculator');
  })

  it('should set tip value and clean tip custom value', () => {
    app.onSetTip(5); // Clicks on 5%
    expect(app.tipValue()).toEqual(5)
    expect(app.tipByPerson()).toEqual(5)
    expect(app.tipCustomValue).toBe(null);
  });

  it('should set to false the tip validation when custom tip is more than 100 ', () => {
    app.onChangeCustomTip(101);
    expect(app.validated?.tip.status).toBeFalse()
    expect(app.validated?.tip.message).toMatch('This is not a valid number')
  })

  it('should clean all tip validation when custom tip is less or equal to 100 ', () => {
    app.onChangeCustomTip(100);
    expect(app.validated?.tip.status).toBeTruthy();
  })

  it('should set to bill model the sended value ', () => {
    app.onChangeBill(1000);
    expect(app.billValue()).toEqual(1000)
  })

  it('should calculate the tip per person correctly', () => {
    app.onChangeBill(1000);
    app.onSetTip(10)
    app.onCalculateTotalAmount();

    const totalAmountByPerson = app.tipAmount();
    expect(totalAmountByPerson).toBe(25);  // (1000 * 10%) / 4 = 25
  });

  it('should calculate the tip per person equal to 0 if number of people is zero', () => {
    app.countPeople.set(0)

    const totalAmountByPerson = app.tipAmount();
    expect(totalAmountByPerson).toBe(0);
  });

  it('should calculate the total payment per person correctly', () => {
    app.onCalculateTotalPayment();
    const totalPaymentByPerson = app.totalPayment();
    expect(totalPaymentByPerson).toBe(275);  // (1000 / 4) + 25 = 275
  });

  it('should return 0 if number of people is 0 for total payment', () => {
    app.countPeople.set(0);
    app.onCalculateTotalPayment();
    const totalPaymentByPerson = app.totalPayment();
    expect(totalPaymentByPerson).toBe(0);
  });

  it('should validate bill correctly', () => {
    app.validateBill({ data: '500' });
    expect(app.validated!.bill.status).toBeTrue();
  });

  it('should invalidate bill for non-numeric value', () => {
    app.validateBill({ data: 'abc' });
    expect(app.validated!.bill.status).toBeFalse();
  });

  it('should clear bill validations if typing is empty', () => {
    app.validateBill({ data: '' });
    expect(app.validated!.bill.status).toBeTruthy();
    expect(app.validated!.bill.message).toEqual([]);
  });

  it('should validate number of people correctly', () => {
    app.validatePeople({ data: '3' });
    expect(app.validated!.people.status).toBeTrue();
  });

  it('should clear number of people validations if typing is empty', () => {
    app.validatePeople({ data: '' });
    expect(app.validated!.people.status).toBeTrue();
    expect(app.validated!.people.message).toEqual([])
  });

  it('should invalidate number of people if it is 0', () => {
    app.validatePeople({ data: '0' });
    expect(app.validated!.people.status).toBeFalse();
    expect(app.validated!.people.message).toContain("Can't be zero");
  });

  it('should clear bill validations if typing is empty', () => {
    app.validatePeople({ data: '' });
    expect(app.validated!.people.status).toBeTruthy();
    expect(app.validated!.people.message).toEqual([])
  });

  it('should reset all values to their initial state', () => {
    app.onReset();
    expect(app.billValue()).toBeNull();
    expect(app.tipValue()).toBe(0);
    expect(app.tipByPerson()).toBe(0);
    expect(app.countPeople()).toBeNull();
    expect(app.validated!.bill.status).toBeTrue();
    expect(app.validated!.people.status).toBeTrue();
  });
});
