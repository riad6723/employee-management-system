import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargeFormComponent } from './charge-form.component';

describe('ChargeFormComponent', () => {
  let component: ChargeFormComponent;
  let fixture: ComponentFixture<ChargeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChargeFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChargeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
