import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicadorZonaComponent } from './indicador-zona.component';

describe('IndicadorZonaComponent', () => {
  let component: IndicadorZonaComponent;
  let fixture: ComponentFixture<IndicadorZonaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicadorZonaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicadorZonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
