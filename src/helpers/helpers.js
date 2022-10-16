function randomNumber(min, max, except = null) {
    let rand = Math.floor(Math.random() * (max - min + 1) + min);
    if (except && rand == except) {
        console.log("happen");
        randomNumber(min, max, except)
    }
    return rand;
}

export const getRandomIndex = (arr) => {
    let rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
}

export const getTwoRandomNumber = (min, max) => {

    let rand1;
    let rand2;

    rand1 = randomNumber(min, max)
    rand2 = randomNumber(min, max)

    if (rand2 == rand1) {
        rand2 = randomNumber(min, max, rand2)
    }

    return {
        rand1, rand2
    }
}

export const upAvailableIndexes = (index, rows) => {

    let availableIndexes = [];


    let newIndex = index - rows;
    while (newIndex >= 0) {
        availableIndexes.push(newIndex)
        newIndex -= rows;
    }

    availableIndexes.sort((a, b) => a - b)

    return availableIndexes;
}

export const getNewIndex = (arr) => {
    let rand = randomNumber(0, arr.length -1);
    
    console.log(arr);
    if (arr[rand].number !== null) {
        rand = randomNumber(0, arr.length -1, rand)
    }

    return rand;
}