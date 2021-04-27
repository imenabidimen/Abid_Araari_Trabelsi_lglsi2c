import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItalianComponent } from './menu-italian.component';

describe('MenuItalianComponent', () => {
  let component: MenuItalianComponent;
  let fixture: ComponentFixture<MenuItalianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuItalianComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuItalianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
