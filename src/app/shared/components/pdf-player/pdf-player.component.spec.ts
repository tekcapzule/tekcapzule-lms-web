import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PDFPlayerComponent } from './pdf-player.component';

describe('VideoPlayerComponent', () => {
  let component: PDFPlayerComponent;
  let fixture: ComponentFixture<PDFPlayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PDFPlayerComponent]
    });
    fixture = TestBed.createComponent(PDFPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
