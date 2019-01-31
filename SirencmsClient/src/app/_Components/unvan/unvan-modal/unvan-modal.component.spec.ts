import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnvanModalComponent } from './unvan-modal.component';

describe('UnvanModalComponent', () => {
  let component: UnvanModalComponent;
  let fixture: ComponentFixture<UnvanModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnvanModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnvanModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
