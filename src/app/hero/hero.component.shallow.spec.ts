import { TestBed, ComponentFixture } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";

import { HeroComponent } from "./hero.component";


describe('Hero Component "shallow tests"', () => {
  let fixture: ComponentFixture<HeroComponent> ; // wrapper for component

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(HeroComponent);
  });

  it('Should have correct here', () => {
    fixture.componentInstance.hero = { id: 1, name: 'Spider Dude', strength: 8};
    fixture.detectChanges();
    expect(fixture.componentInstance.hero.name).toEqual('Spider Dude');
  });

  it('Should render hero name in html', () => {
    fixture.componentInstance.hero = { id: 1, name: 'Spider Dude', strength: 8};
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('a').textContent).toContain('Spider Dude');
  });

});
