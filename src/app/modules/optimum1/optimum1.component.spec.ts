import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Optimum1Component } from './optimum1.component';

describe('Optimum1Component', () => {
  let component: Optimum1Component;
  let fixture: ComponentFixture<Optimum1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Optimum1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Optimum1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
