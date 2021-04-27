import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialMobileComponent } from './social-mobile.component';

describe('SocialMobileComponent', () => {
  let component: SocialMobileComponent;
  let fixture: ComponentFixture<SocialMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
