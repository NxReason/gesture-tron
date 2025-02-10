export const FolderPicker = {
  init() {
    const section = document.createElement('section');

    section.append(this.createIcon(), this.createFolderName());
  },

  createIcon() {
    const span = document.createElement('span');
    span.classList.add('icon', 'icon-folder');

    return span;
  },

  createFolderName() {
    const p = document.createElement('p');
    p.classList.add('folder-name');

    return p;
  },
};
