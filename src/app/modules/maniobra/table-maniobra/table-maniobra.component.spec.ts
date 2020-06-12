import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableManiobraComponent } from './table-maniobra.component';

describe('TableManiobraComponent', () => {
  let component: TableManiobraComponent;
  let fixture: ComponentFixture<TableManiobraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableManiobraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableManiobraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
