const picturesListElement = document.querySelector('.pictures');

const pictureItemTemplateElement = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const thumbnailRender = (images) => {
  picturesListElement.querySelectorAll('.picture').forEach((element) => element.remove());
  const newPicturesFragment = document.createDocumentFragment();

  images.forEach(({url, likes, comments,description, id}) => {
    const newPicture = pictureItemTemplateElement.cloneNode(true);
    newPicture.querySelector('.picture__img').src = url;
    newPicture.querySelector('.picture__likes').textContent = likes;
    newPicture.querySelector('.picture__comments').textContent = comments.length;
    newPicture.dataset.id = id;
    newPicture.querySelector('.picture__img').alt = description;
    newPicturesFragment.appendChild(newPicture);

  });
  picturesListElement.appendChild(newPicturesFragment);
  return images;
};

export {thumbnailRender};
