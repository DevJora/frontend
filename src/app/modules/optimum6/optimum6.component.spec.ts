import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Optimum6Component } from './optimum6.component';

describe('Optimum6Component', () => {
  let component: Optimum6Component;
  let fixture: ComponentFixture<Optimum6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Optimum6Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Optimum6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
