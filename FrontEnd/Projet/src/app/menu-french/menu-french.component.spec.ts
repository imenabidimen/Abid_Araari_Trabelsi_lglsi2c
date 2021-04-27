import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuFrenchComponent } from './menu-french.component';

describe('MenuFrenchComponent', () => {
  let component: MenuFrenchComponent;
  let fixture: ComponentFixture<MenuFrenchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuFrenchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuFrenchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
