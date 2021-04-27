import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAsianComponent } from './menu-asian.component';

describe('MenuAsianComponent', () => {
  let component: MenuAsianComponent;
  let fixture: ComponentFixture<MenuAsianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuAsianComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuAsianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
