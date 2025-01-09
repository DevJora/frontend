import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Optimum5Component } from './optimum5.component';

describe('Optimum5Component', () => {
  let component: Optimum5Component;
  let fixture: ComponentFixture<Optimum5Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Optimum5Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Optimum5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
