import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultIndicatorComponent } from './result-indicator.component';

describe('ResultIndicatorComponent', () => {
  let component: ResultIndicatorComponent;
  let fixture: ComponentFixture<ResultIndicatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultIndicatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
