import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA, Input, Component } from "@angular/core";
import { of } from "rxjs";

import { HeroService } from "../hero.service";
import { HeroesComponent } from "./heroes.component";
import { Hero } from "../hero";
import { By } from "@angular/platform-browser";



describe('Heroes Componnet "Shallow tests"', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let component: HeroesComponent;
  let mockHeroServ;
  let HEROES;

  @Component({
    selector: 'app-hero',
    template: `<div></div>`
  })

  class FakeHeroComponnet {
    @Input() hero: Hero
  }

  beforeEach(async() => {
    mockHeroServ = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
    HEROES = [
      { id: 1, name: 'Spider Dude', strength: 8},
      { id: 2, name: 'Wonderful Woman', strength: 13},
      { id: 3, name: 'Super Dude', strength: 32}
    ];

    TestBed.configureTestingModule({
      declarations: [HeroesComponent, FakeHeroComponnet],
      providers: [
        { provide: HeroService, useValue: mockHeroServ }
      ],
      // schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    // mockHeroServ = TestBed.get('HeroService');

  });

  it('Should set heros correctly', () => {
    mockHeroServ.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    expect(component.heroes.length).toBe(3);
  });

  it('Should create one "li" for each hero', () => {
    mockHeroServ.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('li')).length).toBe(3);
  });
});
