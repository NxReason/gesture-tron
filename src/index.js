import MenuPage from './menuPage';
import PracticePage from './practicePage';
import Events, { EventType } from './events';

const appContainer = document.getElementById('app');

const practiceDevData = {
  seconds: 30,
  images: [
    {
      folder: 'D:\\art\\gesture\\flat',
      name: '0e67110030c27f53d7c52400443b3f55.jpg',
      fullPath: 'D:\\art\\gesture\\flat\\0e67110030c27f53d7c52400443b3f55.jpg',
      ext: '.jpg',
      relativeLocalPath: '../src/public/0e67110030c27f53d7c52400443b3f55.jpg',
      localPath:
        'D:\\dev\\repos\\gesture-tron\\src\\public\\0e67110030c27f53d7c52400443b3f55.jpg',
    },
    {
      folder: 'D:\\art\\gesture\\flat',
      name: '13f9bbe46c26d20984d1a7e866b8d307.jpg',
      fullPath: 'D:\\art\\gesture\\flat\\13f9bbe46c26d20984d1a7e866b8d307.jpg',
      ext: '.jpg',
      relativeLocalPath: '../src/public/13f9bbe46c26d20984d1a7e866b8d307.jpg',
      localPath:
        'D:\\dev\\repos\\gesture-tron\\src\\public\\13f9bbe46c26d20984d1a7e866b8d307.jpg',
    },
    {
      folder: 'D:\\art\\gesture\\flat',
      name: '6fd24684c5d55a6447be3de14e3759cc.jpg',
      fullPath: 'D:\\art\\gesture\\flat\\6fd24684c5d55a6447be3de14e3759cc.jpg',
      ext: '.jpg',
      relativeLocalPath: '../src/public/6fd24684c5d55a6447be3de14e3759cc.jpg',
      localPath:
        'D:\\dev\\repos\\gesture-tron\\src\\public\\6fd24684c5d55a6447be3de14e3759cc.jpg',
    },
    {
      folder: 'D:\\art\\gesture\\flat',
      name: '816e9c9ae428505ff504ef266a4482dc.jpg',
      fullPath: 'D:\\art\\gesture\\flat\\816e9c9ae428505ff504ef266a4482dc.jpg',
      ext: '.jpg',
      relativeLocalPath: '../src/public/816e9c9ae428505ff504ef266a4482dc.jpg',
      localPath:
        'D:\\dev\\repos\\gesture-tron\\src\\public\\816e9c9ae428505ff504ef266a4482dc.jpg',
    },
    {
      folder: 'D:\\art\\gesture\\flat',
      name: '8239aa24d0cfe94acdb35d8c894f3076.jpg',
      fullPath: 'D:\\art\\gesture\\flat\\8239aa24d0cfe94acdb35d8c894f3076.jpg',
      ext: '.jpg',
      relativeLocalPath: '../src/public/8239aa24d0cfe94acdb35d8c894f3076.jpg',
      localPath:
        'D:\\dev\\repos\\gesture-tron\\src\\public\\8239aa24d0cfe94acdb35d8c894f3076.jpg',
    },
    {
      folder: 'D:\\art\\gesture\\flat',
      name: '8c73dffcf6fef1d1760e7bbd3e90b86f.jpg',
      fullPath: 'D:\\art\\gesture\\flat\\8c73dffcf6fef1d1760e7bbd3e90b86f.jpg',
      ext: '.jpg',
      relativeLocalPath: '../src/public/8c73dffcf6fef1d1760e7bbd3e90b86f.jpg',
      localPath:
        'D:\\dev\\repos\\gesture-tron\\src\\public\\8c73dffcf6fef1d1760e7bbd3e90b86f.jpg',
    },
  ],
};

const App = {
  init() {
    this.clearContainerClasses();
    // for dev only
    // MenuPage.init(appContainer);
    PracticePage.init(appContainer, practiceDevData);

    Events.listen(EventType.START_SESSION, () => {
      if (MenuPage.canStartSession()) {
        const sessionParams = MenuPage.getPracticeData();
        MenuPage.clear();
        this.clearContainerClasses();
        PracticePage.init(appContainer, sessionParams);
      }
    });
  },

  clearContainerClasses() {
    appContainer.classList.remove('menu-page', 'session-page');
  },
};
App.init();
