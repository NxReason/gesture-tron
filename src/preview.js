export const Preview = {
  init() {
    const section = document.createElement('section');
    section.classList.add('preview');

    this.node = section;
  },

  setImages(images) {
    this.node.textContent = ``;
    const imgNodes = images.map(img => {
      const imgNode = document.createElement('img');
      imgNode.src = img.relativeLocalPath;
      imgNode.classList.add('preview-image');
      return imgNode;
    });

    this.node.append(...imgNodes);
  },
};
