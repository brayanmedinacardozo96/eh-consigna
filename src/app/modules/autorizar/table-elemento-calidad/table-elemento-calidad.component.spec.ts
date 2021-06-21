import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableElementoCalidadComponent } from './table-elemento-calidad.component';

describe('TableElementoCalidadComponent', () => {
  let component: TableElementoCalidadComponent;
  let fixture: ComponentFixture<TableElementoCalidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableElementoCalidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableElementoCalidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
