import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableParametroComponent } from './table-parametro.component';

describe('TableParametroComponent', () => {
  let component: TableParametroComponent;
  let fixture: ComponentFixture<TableParametroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableParametroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableParametroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
