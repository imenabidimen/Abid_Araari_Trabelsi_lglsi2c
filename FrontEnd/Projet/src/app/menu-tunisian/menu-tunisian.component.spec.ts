import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuTunisianComponent } from './menu-tunisian.component';

describe('MenuTunisianComponent', () => {
  let component: MenuTunisianComponent;
  let fixture: ComponentFixture<MenuTunisianComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuTunisianComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuTunisianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
