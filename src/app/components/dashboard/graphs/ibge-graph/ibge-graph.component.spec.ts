import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IbgeGraphComponent } from './ibge-graph.component';

describe('IbgeGraphComponent', () => {
  let component: IbgeGraphComponent;
  let fixture: ComponentFixture<IbgeGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IbgeGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IbgeGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
