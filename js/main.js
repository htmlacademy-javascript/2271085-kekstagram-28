const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createRandomNumber = (min,max) => {
  const previousValues = [];
  return function (){
    let randomNumber = getRandomInteger(min,max);
    if (previousValues.length >= (max - min + 1)){
      console.error('Перебраны все числа из диапазона от' + min + ' до' + max );
      return null;
    }
    while (previousValues.includes(randomNumber)){
      randomNumber = getRandomInteger(min,max);
    }
    previousValues.push(randomNumber);
    return randomNumber;
  };
};


const message = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const commentNames = ['Птолемей','Аристарх','Евстафий','Прохор','Василина','Лорана','Дженерика','Серафим','Прокл'];
const generateCommentId = createRandomNumber(1,25);

const comment = () => {

  const generateAvatarUrl = getRandomInteger(1,6);
  const generateMessageIndex = getRandomInteger(0,4);
  const generateNameIndex = getRandomInteger(0,8);

  const randomComment = {
    id: generateCommentId(),
    avatar: 'img/avatar-' + generateAvatarUrl + '.svg',
    message: message[generateMessageIndex],
    name: commentNames[generateNameIndex],
  };
  return randomComment;
};

const commentsArray = [];
for (let i = 0; i < 5; i++){
  commentsArray.push(comment());
}

const generatePhotoId = createRandomNumber(1,25);
const generatePictureUrl = createRandomNumber(1,25);

const picture = () => {

  const numberOfLikes = getRandomInteger(15,200);

  const randomPicture = {
    id: generatePhotoId(),
    url: 'photos/' + generatePictureUrl() + '.jpg',
    description: 'Любимая фотография',
    likes: numberOfLikes,
    comments: commentsArray,
  };
  return randomPicture;
};

const pictures = [];
for (let i = 0; i < 25; i++){
  pictures.push(picture());
}


