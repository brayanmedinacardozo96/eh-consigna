import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BitacoraSubelementosVistaComponent } from './bitacora-subelementos-vista.component';

describe('BitacoraSubelementosVistaComponent', () => {
  let component: BitacoraSubelementosVistaComponent;
  let fixture: ComponentFixture<BitacoraSubelementosVistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BitacoraSubelementosVistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BitacoraSubelementosVistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
