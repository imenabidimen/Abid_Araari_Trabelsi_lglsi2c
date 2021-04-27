import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialPCComponent } from './social-pc.component';

describe('SocialPCComponent', () => {
  let component: SocialPCComponent;
  let fixture: ComponentFixture<SocialPCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialPCComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialPCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
