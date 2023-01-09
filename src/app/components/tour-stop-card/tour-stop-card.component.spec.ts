import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourStopCardComponent } from './tour-stop-card.component';

describe('TourStopCardComponent', () => {
  let component: TourStopCardComponent;
  let fixture: ComponentFixture<TourStopCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TourStopCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TourStopCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
