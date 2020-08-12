import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTipoParametroComponent } from './table-tipo-parametro.component';

describe('TableTipoParametroComponent', () => {
  let component: TableTipoParametroComponent;
  let fixture: ComponentFixture<TableTipoParametroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableTipoParametroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableTipoParametroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
