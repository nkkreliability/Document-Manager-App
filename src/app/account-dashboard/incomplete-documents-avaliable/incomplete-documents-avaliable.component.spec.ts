import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncompleteDocumentsAvaliableComponent } from './incomplete-documents-avaliable.component';

describe('IncompleteDocumentsAvaliableComponent', () => {
  let component: IncompleteDocumentsAvaliableComponent;
  let fixture: ComponentFixture<IncompleteDocumentsAvaliableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncompleteDocumentsAvaliableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncompleteDocumentsAvaliableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
