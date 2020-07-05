import { default as FileAsync } from 'lowdb/adapters/FileAsync';
import { Client, Guild } from 'discord.js';

import lowdb from 'lowdb';

const playerOptions = Object({
  memories: 0,
  titanmemories: -1,
  memorials: {},
  respects: 0,
  body: false,
  character: {},
  inventory: {},
  king: false,
  place: 'none', // shiganshina, stohess, trost
  money: 0,
  adult: false,
  age: 1,
  borndate: 0,
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
  version: 'v1.0',
  channel: 'none',
  prefix: '!',
  admins: {},
  players: {},
  missions: {},
  titans: {}
});

export class SnkDatabase {

  private db: lowdb.LowdbAsync<any>;
  private client: Client;

  constructor(callback: any, client: Client) {
    this.initDatabase(callback);
    this.client = client;
  }

  private async initDatabase(callback: any) { // Define la base de datos para poder leerla y escribirla.
    const adapter = new FileAsync('./data/data.json');
    this.db = await lowdb(adapter);
    await callback();
  }

  private async mapAndSet(key: string, obj: Object): Promise<any> { // Guarda los jugadores en la db
    for (const objkey in obj) { await this.db.set(key + '.' + objkey, Object(obj)[objkey]).write(); }
  }

  public async registerGuild(guildid: string): Promise<any> {
    if (!this.db.has('guilds.' + guildid).value()) { this.mapAndSet('guilds.' + guildid, guildOptions); }
  }

  public async registerPlayer(userid: string, guildid: string) { // Si el usuario no esta en la bd, lo guarda
    if (!this.db.has('guilds.' + guildid + '.players.' + userid).value()) { this.mapAndSet('guilds.' + guildid + '.players.' + userid, playerOptions); }
  }

  public getSoftGuild(guildid: string): SnkGuild {

    this.registerGuild(guildid);

    const path = 'guilds.' + guildid;

    const prefix = this.db.get(path + '.prefix').value();
    const channel = this.db.get(path + '.channel').value();

    return new SnkGuild(guildid, prefix, channel, this);

  }

  public getPlayer(msg: any) : SnkPlayer { // Registra al usuario si aun no juega, y retorna un objeto
    return this.getSoftPlayer(msg.author.id, msg.guild.id);
  }

  public getMention(msg: any) : SnkPlayer | undefined { // Registra al usuario si aun no juega, y retorna un objeto
    const mention = msg.mentions.users.first();
    if (!mention) return undefined
    return this.getSoftPlayer(mention.id, msg.guild.id);
  }

  public getSoftPlayer(userid: string, guildid: string) { // Registra al usuario si aun no juega, y retorna un objeto
    this.registerPlayer(userid, guildid);
    return this.getPlayerManager(guildid).getPlayer(userid);
  }

  public getPlayerManagers(): SnkPlayerManager[] {
    const array: SnkPlayerManager[] = [];
    const guilds = this.getLowdb().get('guilds').value();
    for (const key in guilds) { array.push(this.getPlayerManager(key)); }
    return array;
  }

  public getPlayerManager(guildid: string): SnkPlayerManager {
    return new SnkPlayerManager(guildid, this);
  }

  public getLowdb(): lowdb.LowdbAsync<any> {//retorna la bd
    return this.db;
  }

  public getClient(): Client {
    return this.client;
  }

}

export class SnkGuild {

  private prefix: string;
  private channel: string;

  private guildid: string;
  private database: SnkDatabase;

  constructor(guildid: string, prefix: string, channel: string, database: SnkDatabase) {
    this.prefix = prefix;
    this.channel = channel;
    this.guildid = guildid;
    this.database = database;
  }

  public getGuild(): any {
    return this.database.getClient().guilds.cache.get(this.guildid);
  }

  public getUser(userid: string): any {
    return this.database.getClient().users.cache.get(userid);
  }

  public getCommandChannel(callback: any) {
    callback(this.getGuild().channels.cache.get(this.channel));
  }

  public getPlayer(userid: string): SnkPlayer {
    return this.database.getPlayerManager(this.guildid).getPlayer(userid);
  }

  public getPrefix(): string {
    return this.prefix;
  }

  public setGuildPrefix(prefix: string): void {
    this.setAttribute('prefix', prefix);
  }

  public getChannelid(): string {
    return this.channel;
  }

  public setChannelId(channelId: string): void {
    this.setAttribute('channel', channelId);
  }

  public getGuildid(): string {
    return this.guildid;
  }

  public async setAttribute(attribute: string, value: any) {
    await this.getLowdb().set(this.getGuildKey() + '.' + attribute, value).write();
  }

  public getAttribute(attribute: string): any {
    return this.getLowdb().get(this.getGuildKey() + '.' + attribute).value();
  }

  public getGuildKey(): string {
    return 'guilds.' + this.guildid;
  }

  public get(): SnkDatabase {
    return this.database;
  }

  public getLowdb(): lowdb.LowdbAsync<any> {
    return this.get().getLowdb();
  }

}

export class SnkPlayerManager {

  private database: SnkDatabase;
  private guildid: string;

  constructor(guildid: string, database: SnkDatabase) {
    this.database = database;
    this.guildid = guildid;
  }

  public getPlayers(): SnkPlayer[] { // Devuelve todos los jugadores de esta guild
    const array: SnkPlayer[] = [];
    const players = this.get().getLowdb().get('guilds.' + this.guildid + '.players').value();
    for (const key in players) { array.push(this.getPlayer(key)); }
    return array;
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

  public kill() {
    this.setEnergy(0);
    this.setHealth(0);
    this.setAttribute('character', null);
    this.setAttribute('adult', false);
    this.setAttribute('age', 1);
    this.setAttribute('body', false);
    this.setAttribute('deathdate', new Date().getTime() + 1000 * 1000);
  }

  public grow() {
    this.setEnergy(12);
    this.setHealth(6);
    this.setAdult(true);
    this.setAge(12);
  }

  public getDiscordUser(guild: SnkGuild) {
    return guild.getUser(this.userid);
  }

  public getUserid() {
    return this.userid;
  }

  public isAdult() {
    return this.getAttribute('adult');
  }

  public setAdult(value: boolean) {
    this.setAttribute('adult', value);
  }

  public hasBody() {
    return this.getAttribute('body');
  }

  public getCharacter(): any {
    return this.getAttribute('character');
  }

  public getMemories(): number {
    return this.getAttribute('memories');
  }

  public addMemories(memories: number) {
    this.setMemories(this.getMemories() + memories);
  }

  public removeMemories(memories: number) {
    this.setMemories(this.getMemories() - memories);
  }

  public setMemories(memories: number) {
    this.setAttribute('memories', memories);
  }

  public getEnergy(): number {
    return this.getAttribute('energy');
  }

  public addEnergy(energy: number) {
    this.setEnergy(this.getEnergy() + energy);
  }

  public removeEnergy(energy: number) {
    this.setEnergy(this.getEnergy() - energy);
  }

  public setEnergy(energy: number) {
    this.setAttribute('energy', energy);
  }

  public getHealth(): number {
    return this.getAttribute('health');
  }

  public addHealth(health: number) {
    this.setHealth(this.getHealth() + health);
  }

  public removeHealth(health: number) {
    this.setHealth(this.getHealth() - health);
  }

  public setHealth(health: number) {
    this.setAttribute('health', health);
  }

  public getAge(): number {
    return this.getAttribute('age');
  }

  public addAge(age: number) {
    this.setAge(this.getAge() + age);
  }

  public removeAge(age: number) {
    this.setAge(this.getAge() - age);
  }

  public setAge(age: number) {
    this.setAttribute('age', age);
  }

  public async setAttribute(attribute: string, value: any) {
    await this.getLowdb().set(this.getPlayerKey() + '.' + attribute, value).write();
  }

  public getAttribute(attribute: string): any {
    return this.getLowdb().get(this.getPlayerKey() + '.' + attribute).value();
  }

  public getAttributes(attributes: Array<string>): any {
    return attributes.map((attribute: string) => this.getLowdb().get(this.getPlayerKey() + '.' + attribute).value())
  }

  public getPlayerKey(): string {
    return 'guilds.' + this.playerManager.getGuild() + '.players.' + this.userid;
  }

  public get(): SnkDatabase {
    return this.playerManager.get();
  }

  public getLowdb(): lowdb.LowdbAsync<any> {
    return this.get().getLowdb();
  }

}
