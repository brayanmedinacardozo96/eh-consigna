import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsignaManiobraListComponent } from './consigna-maniobra-list.component';

describe('ConsignaManiobraListComponent', () => {
  let component: ConsignaManiobraListComponent;
  let fixture: ComponentFixture<ConsignaManiobraListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsignaManiobraListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsignaManiobraListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
