import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourEditorPageComponent } from './tour-editor-page.component';

describe('TourEditorPageComponent', () => {
  let component: TourEditorPageComponent;
  let fixture: ComponentFixture<TourEditorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TourEditorPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TourEditorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
