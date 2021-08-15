import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { of } from "rxjs";

import { HeroService } from "../hero.service";
import { HeroesComponent } from "./heroes.component";



describe('Heroes Componnet "Shallow tests"', () => {
  let fixture: ComponentFixture<HeroesComponent>;
  let component: HeroesComponent;
  let mockHeroServ;
  let HEROES;

  beforeEach(async() => {
    mockHeroServ = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);
    HEROES = [
      { id: 1, name: 'Spider Dude', strength: 8},
      { id: 2, name: 'Wonderful Woman', strength: 13},
      { id: 3, name: 'Super Dude', strength: 32}
    ];

    TestBed.configureTestingModule({
      declarations: [HeroesComponent],
      providers: [
        { provide: HeroService, useValue: mockHeroServ }
      ],
      schemas: [NO_ERRORS_SCHEMA]
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

});
