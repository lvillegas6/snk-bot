import { database } from '../main';

import SnkJob from '../jobs';

export default class KillerJob extends SnkJob {

  constructor() {
    super(10);
  }

  run() {
    /*for (var manager of database.getPlayerManagers())
      for (var player of manager.getPlayers())
        console.log(player.getCharacter())*/
  }

}