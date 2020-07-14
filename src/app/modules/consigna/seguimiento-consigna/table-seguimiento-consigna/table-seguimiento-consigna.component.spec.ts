import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSeguimientoConsignaComponent } from './table-seguimiento-consigna.component';

describe('TableSeguimientoConsignaComponent', () => {
  let component: TableSeguimientoConsignaComponent;
  let fixture: ComponentFixture<TableSeguimientoConsignaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableSeguimientoConsignaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableSeguimientoConsignaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
