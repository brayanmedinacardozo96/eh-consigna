import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManiobraComponent } from './maniobra.component';

describe('ManiobraComponent', () => {
  let component: ManiobraComponent;
  let fixture: ComponentFixture<ManiobraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManiobraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManiobraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
