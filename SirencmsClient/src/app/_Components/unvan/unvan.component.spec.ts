import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnvanComponent } from './unvan.component';

describe('UnvanComponent', () => {
  let component: UnvanComponent;
  let fixture: ComponentFixture<UnvanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnvanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnvanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
