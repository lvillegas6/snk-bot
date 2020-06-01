import lowdb from "lowdb";
import { default as FileAsync } from "lowdb/adapters/FileAsync";

const playerOptions = Object({
  memories: 0,
  titanmemories: -1,
  memorials: {},
  respects: 0,
  body: false,
  character: {},
  inventory: {},
  king: false,
  money: 0,
  age: 0,
  deathdate: 0,
  health: 0,
  energy: 0,
  respawnhealth: 0,
  respawnenergy: 0,
  training: 0,
  missions: 0,
  study: 0,
  investigation: 0,
  cures: 0,
  mission: 'none',
  election: 'none', // military/normal
  racemilitary: 'none', // troops, police, exploration
  racenormal: 'none', // doctor, biologist, merchant
});

const guildOptions = Object({
  version: "v1.0",
  admins: {},
  players: {},
  missions: {},
  titans: {}
});

export class SnkDatabase {

  private db: lowdb.LowdbAsync<any>;

  constructor(callback: any) {
    this.initDatabase(callback);
  }

  private async initDatabase(callback: any) {
    const adapter = new FileAsync("./data/data.json");
    this.db = await lowdb(adapter);
    await callback();
  }

  private async mapAndSet(key: string, obj: Object): Promise<any> {
    for (let objkey in obj)
      await this.db.set(key + "." + objkey, Object(obj)[objkey]).write();
  }

  public async registerGuild(guildid: string): Promise<any> {
    if (!this.db.has('guilds.' + guildid).value())
      this.mapAndSet("guilds." + guildid, guildOptions);
  }

  public async registerPlayer(userid: string, guildid: string) {
    if (!this.db.has('guilds.' + guildid + '.players.' + userid).value())
      this.mapAndSet('guilds.' + guildid + '.players.' + userid, playerOptions);
  }

  public getSoftPlayer(userid: string, guildid: string) {
    this.registerPlayer(userid, guildid);
    return this.getPlayerManager(guildid).getPlayer(userid);
  }

  public getPlayerManager(guildid: string): SnkPlayerManager {
    return new SnkPlayerManager(guildid, this);
  }

  public getLowdb(): lowdb.LowdbAsync<any> {
    return this.db;
  }

}

export class SnkPlayerManager {

  private database: SnkDatabase;
  private guildid: string;

  constructor(guildid: string, database: SnkDatabase) {
    this.database = database;
    this.guildid = guildid;
  }

  public getPlayer(userid: string): SnkPlayer {
    return new SnkPlayer(userid, this);
  }

  public getGuild(): string {
    return this.guildid;
  }

  public get(): SnkDatabase {
    return this.database;
  }

}

export class SnkPlayer {

  private userid: string;
  private playerManager: SnkPlayerManager;

  constructor(userid: string, playerManager: SnkPlayerManager) {
    this.userid = userid;
    this.playerManager = playerManager;
  }

  public hasBody() {
    return this.getAttribute('body');
  }

  public getCharacter(): any {
    return this.getAttribute("character");
  }

  public getMemories(): number {
    return this.getAttribute("memories");
  }

  public addMemories(memories: number) {
    this.setMemories(this.getMemories() + memories);
  }

  public removeMemories(memories: number) {
    this.setMemories(this.getMemories() - memories);
  }

  public setMemories(memories: number) {
    this.setAttribute("memories", memories);
  }

  public async setAttribute(attribute: string, value: any) {
    await this.getLowdb().set(this.getPlayerKey() + '.' + attribute, value).write();
  }

  public getAttribute(attribute: string): any {
    return this.getLowdb().get(this.getPlayerKey() + "." + attribute).value();
  }

  public getPlayerKey(): string {
    return 'guilds.' + this.playerManager.getGuild() + ".players." + this.userid;
  }

  public get(): SnkDatabase {
    return this.playerManager.get();
  }

  public getLowdb(): lowdb.LowdbAsync<any> {
    return this.get().getLowdb();
  }

}