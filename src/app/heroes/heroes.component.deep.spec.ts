import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA, Input, Component } from "@angular/core";
import { of } from "rxjs";

import { HeroService } from "../hero.service";
import { By } from "@angular/platform-browser";

import { HeroesComponent } from "./heroes.component";
import { HeroComponent } from "../hero/hero.component";



describe('Heroes Componnet "Deep tests"', () => {
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
      declarations: [HeroesComponent, HeroComponent],
      providers: [
        { provide: HeroService, useValue: mockHeroServ }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;

  });

  it('Should set heros correctly', () => {
    mockHeroServ.getHeroes.and.returnValue(of(HEROES));
    fixture.detectChanges();
    const heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));
    expect(heroComponentDEs.length).toEqual(3);
    expect(heroComponentDEs[0].componentInstance.hero.name).toEqual('Spider Dude');

    for(let i = 0; i < heroComponentDEs.length; i++) {
      expect(heroComponentDEs[i].componentInstance.hero).toEqual(HEROES[i]);
    }
  });

  it(`Should call heroService.deleteHero when Hero
  componnet's 'delete button is clicked'`, () => {
    spyOn(component, 'delete');
    mockHeroServ.getHeroes.and.returnValue(of(HEROES));

    fixture.detectChanges();

    const heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));

    heroComponentDEs[0].query(By.css('button'))
      .triggerEventHandler('click', { stopPropagation: () => {} });
    expect(component.delete).toHaveBeenCalledWith(HEROES[0]);
  });

  it(`Should call heroService.deleteHero when Hero
  componnet's 'delete button is clicked' - detailed`, () => {
    spyOn(component, 'delete');
    mockHeroServ.getHeroes.and.returnValue(of(HEROES));

    fixture.detectChanges();

    const heroComponentDEs = fixture.debugElement.queryAll(By.directive(HeroComponent));

    (<HeroComponent> heroComponentDEs[1].componentInstance).delete.emit(undefined);

    expect(component.delete).toHaveBeenCalledWith(HEROES[1]);
  });

});
