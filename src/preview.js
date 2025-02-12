export const Preview = {
  init(images) {
    const section = document.createElement('section');
    section.classList.add('preview');

    this.node = section;
    this.setImages(images);
  },

  setImages(images) {
    this.node.textContent = ``;
    const imgNodes = images.map(img => {
      const imgNode = document.createElement('img');
      imgNode.src = img.sourcePath;
      imgNode.classList.add('preview-image');
      return imgNode;
    });

    this.node.append(...imgNodes);
  },
};
