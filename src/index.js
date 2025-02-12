import MenuPage from './menuPage';
import PracticePage from './practicePage';
import Events, { EventType } from './events';

const appContainer = document.getElementById('app');

const App = {
  init() {
    this.clearContainerClasses();
    MenuPage.init(appContainer);

    Events.listen(EventType.START_SESSION, () => {
      if (MenuPage.canStartSession()) {
        const sessionParams = MenuPage.getPracticeData();
        MenuPage.clear();
        this.clearContainerClasses();
        PracticePage.init(appContainer, sessionParams);
      }
    });

    Events.listen(EventType.END_SESSION, () => {
      PracticePage.clear();
      this.clearContainerClasses();
      MenuPage.init(appContainer);
    });
  },

  clearContainerClasses() {
    appContainer.classList.remove('menu-page', 'practice-page');
  },
};
App.init();
