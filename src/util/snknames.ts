const { Random } = require("random-js");

const names = require('../../data/names.json');

const random = new Random();
const fakerator = require("fakerator")("de-DE");

class SnkNames {

  constructor() {}

  genericCharacter() {
    if(random.integer(1, 2) == 2) {
      return {genre: 'female', name: fakerator.names.nameF()};
    }
    return {genre: 'male', name: fakerator.names.nameM()};
  }

  shingekiCharacter() {
    return names[random.integer(0, names.length)];
  }

  randomCharacter(memories: number, plus: number) {
    if(memories >= 200 && random.integer(1, 100) >= (90 - plus)) {
      return this.shingekiCharacter();
    }
    return this.shingekiCharacter();
  }

}

let greeter = new SnkNames();
console.log(greeter.randomCharacter(200, 5));