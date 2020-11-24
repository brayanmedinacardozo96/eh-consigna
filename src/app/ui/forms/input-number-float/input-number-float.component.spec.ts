import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputNumberFloatComponent } from './input-number-float.component';

describe('InputNumberFloatComponent', () => {
  let component: InputNumberFloatComponent;
  let fixture: ComponentFixture<InputNumberFloatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputNumberFloatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputNumberFloatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
