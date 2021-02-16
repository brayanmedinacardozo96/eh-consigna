import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableEjecucionComponent } from './table-ejecucion.component';

describe('TableEjecucionComponent', () => {
  let component: TableEjecucionComponent;
  let fixture: ComponentFixture<TableEjecucionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableEjecucionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableEjecucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
