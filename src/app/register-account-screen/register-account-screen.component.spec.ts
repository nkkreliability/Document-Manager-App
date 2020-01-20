import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAccountScreenComponent } from './register-account-screen.component';

describe('RegisterAccountScreenComponent', () => {
  let component: RegisterAccountScreenComponent;
  let fixture: ComponentFixture<RegisterAccountScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterAccountScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterAccountScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
