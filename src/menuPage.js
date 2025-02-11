import './css/menuPage.css';
import Events, { EventType } from './events';
import { Sidebar } from './sidebar';
import { FolderPicker } from './folderPicker';
import { Preview } from './preview';

const MenuPage = {
  init(container) {
    this.container = container;
    this.container.classList.add('menu-page');
    this.practice = {
      seconds: this.prevPractice?.seconds,
      images: this.prevPractice?.images ?? [],
    };

    // Events
    Events.listen(EventType.IMAGES_LOADED, response => {
      if (response.err != null) {
        FolderPicker.displayError(response.err);
        return;
      }
      this.practice.images = response.images;
      FolderPicker.displayFolderName(response.folder);
      Preview.setImages(response.images);
    });

    Events.listen(EventType.TIMER_SET, seconds => {
      console.log('seconds set');
      this.practice.seconds = seconds;
    });

    // Components
    Sidebar.init();

    FolderPicker.init();

    Preview.init();

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

  clear() {
    this.prevPractice = this.getPracticeData();
    this.container.textContent = '';
  },
};

export default MenuPage;
