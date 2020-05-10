
import { Random } from 'random-js'
import names from '../../data/names.json'

const fakerator = require('fakerator')('de-DE');

const random = new Random();

export class SnkNames {

    genericCharacter() {

        if (random.integer(1, 2) === 2) {
            return {
                genre: 'female',
                name: fakerator.names.nameF()
            }
        }

        return {
            genre: 'male',
            name: fakerator.names.nameM()
        }
    }

    shingekiCharacter = () => names[random.integer(0, names.length)]

    randomCharacter(memories: number, plus: number) {
        if (memories >= 200 && random.integer(1, 100) >= (90 - plus)) {
            return this.shingekiCharacter()
        }
        return this.shingekiCharacter()
    }
}
