import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoParametrosComponent } from './tipo-parametros.component';

describe('TipoParametrosComponent', () => {
  let component: TipoParametrosComponent;
  let fixture: ComponentFixture<TipoParametrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoParametrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoParametrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
