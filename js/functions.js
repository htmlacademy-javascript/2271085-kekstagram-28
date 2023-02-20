function checkStringLength (line, checkedLength) {

  if (line.length === checkedLength){
    return true;
  }
  return false;
}

checkStringLength('проверяемая строка', 18);

function findPalidrom (str) {
  const readyString = str.toLowerCase().replaceAll(' ','');
  const reverseString = readyString.split('').reverse().join('');
  if (reverseString === readyString){
    return true;
  }

  return false;
}
findPalidrom('А луна канула');

function getInteger (str) {
  const updateStr = String(str);
  const letters = updateStr.split('');
  const numbers = ['0','1','2','3','4','5','6','7','8','9'];
  let integner = '';

  for (let i = 0; i < letters.length; i++){
    for(let j = 0; j < numbers.length; j++){
      if(letters[i] === numbers[j]){
        integner += numbers[j];
      }
    }
  }
  return Number(integner);
}

getInteger (2344);

function getAddress (str, minLength, addCharacters) {
  const addLength = minLength - str.length;
  let addString = addCharacters.slice(0,addLength);

  if (addString.length === addLength) {
    return addString + str;
  } else if (addLength % addString.length === 0) {
    while(addLength > addString.length){
      addString += addCharacters;
    }
    return addString + str;
  } else {
    const multiplication = Math.floor(addLength / addString.length);
    for (let i = 1; i < multiplication; i++){
      addString += addCharacters;
    }
    const numberOfLetters = addLength - addString.length;
    addString = addCharacters.slice(0,numberOfLetters) + addString;
    return addString + str;
  }
}

getAddress ('qwerty', 4, '0');
