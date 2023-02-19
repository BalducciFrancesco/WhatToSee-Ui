import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesCenterPageComponent } from './messages-center-page.component';

describe('MessagesCenterPageComponent', () => {
  let component: MessagesCenterPageComponent;
  let fixture: ComponentFixture<MessagesCenterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessagesCenterPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagesCenterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
