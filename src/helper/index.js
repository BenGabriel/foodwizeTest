/* 
configure response for all breed
the response will be in the form of
[
  {
    name: "breed name",
    sub_breed: ["sub breed"]
  }
]

*/

export const configureResponse = response => {
  const names = Object.keys(response);
  const vaue = Object.values(response);
  let animals = [];
  for (let index = 0; index < names.length; index++) {
    const breed = vaue.valueOf(index);

    animals.push({
      name: names[index],
      sub_breed: breed[index],
    });
  }

  return animals;
};

//check if breed is in favourite array
export const checkIfFavourite = (favourite, array) => {
  return array.find(t => t === favourite);
};

export const Colors = {
  primary: '#004aad',
  white: '#fff',
  black: '#333',
  grey: '#A0A7BA',
};

/*
configure data for subbreed
the response will be in the form of
[
  {
    name: "breedname",
    image: "image related to breed"
  }
]
*/
export const getSubImage = (subArr, imagesArr) => {
  const finalArray = [];
  for (let i = 0; i < subArr.length; i++) {
    const element = subArr[i];
    const newarr = imagesArr.filter(item => item.includes(element));
    finalArray.push({
      name: element,
      image: newarr[1],
    });
  }

  return finalArray;
};
