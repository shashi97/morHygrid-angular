import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HfadataBaseEntryComponent } from './hfadata-base-entry.component';

describe('HfadataBaseEntryComponent', () => {
  let component: HfadataBaseEntryComponent;
  let fixture: ComponentFixture<HfadataBaseEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HfadataBaseEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HfadataBaseEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
