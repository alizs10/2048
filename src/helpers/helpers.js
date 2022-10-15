function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export const getTwoRandomNumber = (min, max) => {

    let rand1;
    let rand2;

    rand1 = randomNumber(min, max)
    rand2 = randomNumber(min, max)

    if (rand2 == rand1) {
        getTwoRandomNumber(min, max)
    }

    return {
        rand1, rand2
    }
}