import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoAndTitleComponent } from './logo-and-title.component';

describe('LogoAndTitleComponent', () => {
  let component: LogoAndTitleComponent;
  let fixture: ComponentFixture<LogoAndTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoAndTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoAndTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
