import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryUserComponent } from './entry-user.component';

describe('EntryUserComponent', () => {
  let component: EntryUserComponent;
  let fixture: ComponentFixture<EntryUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntryUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
