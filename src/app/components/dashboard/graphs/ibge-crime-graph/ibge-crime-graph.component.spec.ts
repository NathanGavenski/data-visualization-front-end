import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IbgeCrimeGraphComponent } from './ibge-crime-graph.component';

describe('IbgeCrimeGraphComponent', () => {
  let component: IbgeCrimeGraphComponent;
  let fixture: ComponentFixture<IbgeCrimeGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IbgeCrimeGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IbgeCrimeGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
