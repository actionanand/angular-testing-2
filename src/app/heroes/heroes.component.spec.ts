import { HeroesComponent } from "./heroes.component";
import { of } from "rxjs";


describe('Hero Component', () => {
  let component: HeroesComponent;
  let HEROES;
  let mockHeroServ;

  beforeEach(() => {
    HEROES = [
      { id: 1, name: 'Spider Dude', strength: 8},
      { id: 2, name: 'Wonderful Woman', strength: 13},
      { id: 3, name: 'Super Dude', strength: 32}
    ];

    mockHeroServ = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

    component = new HeroesComponent(mockHeroServ);
  });

  describe('delete', () => {
    it('Should remove the indicated hero from the list', () => {
      mockHeroServ.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;

      component.delete(HEROES[1]);

      expect(component.heroes.length).toBe(2, 'Heroes are not deleted, more found!');
    });

    it('Should call deleteHero', () => {
      mockHeroServ.deleteHero.and.returnValue(of(true));
      component.heroes = HEROES;
      // component.ngOnInit();

      component.delete(HEROES[1]);
      expect(mockHeroServ.deleteHero).toHaveBeenCalled(); // to check whether deleteHero was called
      expect(mockHeroServ.deleteHero).toHaveBeenCalledWith(HEROES[1]);
    });

  });
});
