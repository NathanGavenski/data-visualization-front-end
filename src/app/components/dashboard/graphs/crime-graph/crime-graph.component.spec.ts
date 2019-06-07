import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrimeGraphComponent } from './crime-graph.component';

describe('CrimeGraphComponent', () => {
  let component: CrimeGraphComponent;
  let fixture: ComponentFixture<CrimeGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrimeGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrimeGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
