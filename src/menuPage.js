import './css/menuPage.css';
import Events, { EventT } from './events';
import { createTimerButtons } from './timerButton';
import { Sidebar } from './sidebar';
import { FolderPicker } from './folderPicker';
import { Preview } from './preview';

const MenuPage = {
  init(container) {
    this.container = container;

    const timerButtons = createTimerButtons();
    Sidebar.init(timerButtons);

    FolderPicker.init();

    Preview.init();
    Events.listen(EventT.IMAGES_LOADED, response => {
      if (response.err != null) {
        FolderPicker.displayError(response.err);
        return;
      }
      FolderPicker.displayFolderName(response.folder);
      Preview.setImages(response.images);
    });

    this.container.append(Sidebar.node, FolderPicker.node, Preview.node);
  },
};

export default MenuPage;
