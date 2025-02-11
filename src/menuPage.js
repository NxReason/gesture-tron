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
      folder: this.prevPractice?.folder,
      images: this.prevPractice?.images ?? [],
    };

    // Events
    Events.listen(EventType.IMAGES_LOADED, response => {
      if (response.err != null) {
        FolderPicker.displayError(response.err);
        return;
      }
      this.practice.images = response.images;
      this.practice.folder = response.folder;
      FolderPicker.displayFolderName(response.folder);
      Preview.setImages(response.images);
    });

    Events.listen(EventType.TIMER_SET, seconds => {
      this.practice.seconds = seconds;
    });

    // Components
    Sidebar.init(this.practice.seconds);

    FolderPicker.init(this.practice.folder);

    Preview.init(this.practice.images);

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
