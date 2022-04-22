import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongratContentComponent } from './congrat-content.component';

describe('CongratContentComponent', () => {
  let component: CongratContentComponent;
  let fixture: ComponentFixture<CongratContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CongratContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CongratContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
