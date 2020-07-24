import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsignaSolicitudEstadoComponent } from './consigna-solicitud-estado.component';

describe('ConsignaSolicitudEstadoComponent', () => {
  let component: ConsignaSolicitudEstadoComponent;
  let fixture: ComponentFixture<ConsignaSolicitudEstadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsignaSolicitudEstadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsignaSolicitudEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
