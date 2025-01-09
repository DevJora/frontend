import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Optimum7Component } from './optimum7.component';

describe('Optimum7Component', () => {
  let component: Optimum7Component;
  let fixture: ComponentFixture<Optimum7Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Optimum7Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Optimum7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
