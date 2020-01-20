import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvaliableDocumentsComponent } from './avaliable-documents.component';

describe('AvaliableDocumentsComponent', () => {
  let component: AvaliableDocumentsComponent;
  let fixture: ComponentFixture<AvaliableDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvaliableDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvaliableDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
