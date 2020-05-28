import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTrabajoOportunidadComponent } from './table-trabajo-oportunidad.component';

describe('TableTrabajoOportunidadComponent', () => {
  let component: TableTrabajoOportunidadComponent;
  let fixture: ComponentFixture<TableTrabajoOportunidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableTrabajoOportunidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableTrabajoOportunidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
