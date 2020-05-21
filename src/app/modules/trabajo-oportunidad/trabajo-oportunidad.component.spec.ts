import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabajoOportunidadComponent } from './trabajo-oportunidad.component';

describe('TrabajoOportunidadComponent', () => {
  let component: TrabajoOportunidadComponent;
  let fixture: ComponentFixture<TrabajoOportunidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrabajoOportunidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabajoOportunidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
