import './css/menuPage.css';
import Events, { EventT } from './events';
import { createTimerButtons } from './timerButton';
import { Sidebar } from './sidebar';
import { FolderPicker } from './folderPicker';
import { Preview } from './preview';

const MenuPage = {
  init(container) {
    this.container = container;
    this.container.classList.add('menu-page');
    this.practice = {
      seconds: null,
      images: [],
    };

    // Components
    const timerButtons = createTimerButtons();
    Sidebar.init(timerButtons);

    FolderPicker.init();

    Preview.init();

    // Events
    Events.listen(EventT.IMAGES_LOADED, response => {
      if (response.err != null) {
        FolderPicker.displayError(response.err);
        return;
      }
      this.practice.images = response.images;
      FolderPicker.displayFolderName(response.folder);
      Preview.setImages(response.images);
    });

    Events.listen(EventT.TIMER_SET, seconds => {
      this.practice.seconds = seconds;
    });

    Events.listen(EventT.START_SESSION, () => {});

    // DOM
    this.container.append(Sidebar.node, FolderPicker.node, Preview.node);
  },

  canStartSession() {
    if (!this.practice.seconds || this.practice.seconds <= 0) return false;
    if (!this.practice.images || this.practice.images.length == 0) return false;
    return true;
  },

  getPracticeData() {
    return this.practice;
  },
};

export default MenuPage;
