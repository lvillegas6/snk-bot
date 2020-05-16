
import { Random } from 'random-js'
import names from '../../data/names.json'

const fakerator = require('fakerator')('de-DE');

const random = new Random();

export class SnkNames {

    genericCharacter() {

        if (random.integer(1, 2) === 2) {
            return {
                genre: 'female',
                name: fakerator.names.nameF(),
                age: random.integer(16, 32),
                image: 'https://i.imgur.com/ePkQqCb.png'
            }
        }

        return {
            genre: 'male',
            name: fakerator.names.nameM(),
            age: random.integer(16, 32),
            image: 'https://i.imgur.com/ePkQqCb.png'
        }
    }

    shingekiCharacter = () => names[random.integer(0, names.length)]

    randomCharacter(memories: number, plus: number) {
        if (memories >= 200 && random.integer(1, 100) >= (90 - plus)) {
            return this.shingekiCharacter()
        }
        return this.genericCharacter()
    }
}
