import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';

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

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have the 'tip-calculator' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('tip-calculator');
  });

  it('should calculate tha amount tip by person', () => {
    
  });

  it('should calculate tha total value of payment by person', () => {

  });

  it('should restore to initial values after click on reset button', () => { 

  })

  describe('it should show validation message if', () => {
    it('Bill input field has letters', () => { })
    it('People input field has letters', () => { })
    it('People input field has the number zero as value', () => { })
  })
});
