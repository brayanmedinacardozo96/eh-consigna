import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParametrosRegistroComponent } from './parametros-registro.component';

describe('ParametrosRegistroComponent', () => {
  let component: ParametrosRegistroComponent;
  let fixture: ComponentFixture<ParametrosRegistroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParametrosRegistroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParametrosRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
