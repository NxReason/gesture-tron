import MenuPage from './menuPage';
import Events, { EventT } from './events';

const appContainer = document.getElementById('app');

const App = {
  init() {
    this.clearContainerClasses();
    MenuPage.init(appContainer);

    Events.listen(EventT.START_SESSION, () => {
      if (MenuPage.canStartSession()) {
        const sessionParams = MenuPage.getPracticeData();
        console.log(sessionParams);
      }
    });
  },

  clearContainerClasses() {
    appContainer.classList.remove('menu-page', 'session-page');
  },
};
App.init();

// Pages
const PracticePage = {};
