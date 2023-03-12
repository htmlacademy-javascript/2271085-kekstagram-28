import {getRandomInteger,createRandomNumber} from './util.js';


const PICTURE_COUNT = 25;
const AVATAR_COUNT = 6;
const LIKE_MIN_COUNT = 15;
const LIKE_MAX_COUNT = 200;
const COMMENT_COUNT = 30;
const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const COMMENT_NAMES = ['Птолемей','Аристарх','Евстафий','Прохор','Василина','Лорана','Дженерика','Серафим','Прокл'];

const createComment = (index) => {

  const generateAvatarIndex = createRandomNumber(0,AVATAR_COUNT);
  const randomComment = {
    id: index,
    avatar: `img/avatar-${generateAvatarIndex()}.svg`,
    message: MESSAGE[getRandomInteger(0,4)],
    name: COMMENT_NAMES[getRandomInteger(0,8)],
  };
  return randomComment;
};

const getComments = () => Array.from({length:getRandomInteger(0,COMMENT_COUNT)},(_, index) =>
  createComment(index + 1)
);

const createPicture = (index) => {

  const randomPicture = {
    id: index,
    url: `photos/${index}.jpg`,
    description: 'Любимая фотография',
    likes: getRandomInteger(LIKE_MIN_COUNT,LIKE_MAX_COUNT),
    comments: getComments(),
  };
  return randomPicture;
};

const getPictures = () =>
  Array.from({length: PICTURE_COUNT}, (_,pictureIndex) =>
    createPicture(pictureIndex + 1)
  );

getPictures();

export {getPictures};
