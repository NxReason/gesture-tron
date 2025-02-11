import Events, { EventType } from './events';

export const FolderPicker = {
  init() {
    const section = document.createElement('section');
    section.classList.add('folder-picker');

    this.icon = this.createIcon();
    this.folderName = this.createFolderName();
    section.append(this.icon, this.folderName);
    this.setHandlers();

    this.node = section;
  },

  createIcon() {
    const icon = document.createElement('span');
    icon.classList.add('icon', 'icon-folder');

    return icon;
  },

  createFolderName() {
    const p = document.createElement('p');
    p.classList.add('folder-name');
    p.textContent = 'Chose a folder with images to practice';

    return p;
  },

  setHandlers() {
    const callDirDialog = async () => {
      try {
        const result = await directory.open();
        Events.notify(EventType.IMAGES_LOADED, result);
      } catch (err) {
        console.error(`error opening dir: ${err}`);
        return { err: `Something went wrong`, folder: null, images: [] };
      }
    };

    this.icon.addEventListener('click', callDirDialog);
    this.folderName.addEventListener('click', callDirDialog);
  },

  displayError(err) {
    this.folderName.textContent = err;
  },

  displayFolderName(folder) {
    this.folderName.textContent = folder;
  },
};
