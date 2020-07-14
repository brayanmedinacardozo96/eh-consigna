import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeguimientoConsignaComponent } from './seguimiento-consigna.component';

describe('SeguimientoConsignaComponent', () => {
  let component: SeguimientoConsignaComponent;
  let fixture: ComponentFixture<SeguimientoConsignaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeguimientoConsignaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeguimientoConsignaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
