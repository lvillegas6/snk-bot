
import { readdir } from 'fs'

const jobs: SnkJob[] = []
export const getJobs = () => jobs;

export function setupJobs() {
  readdir(__dirname + '/jobs/', (err, files) => {
    if (err) {
      console.error(err);
      return;
    }
    files.forEach(element => {
      const snkJob = require(__dirname + '/jobs/' + element).default;
      let instance = new snkJob();
      instance.start();
      jobs.push(instance)
    });
  })
}

export default abstract class SnkJob {

  private period: number; // Periodo de ejecución en segundos
  private times: 0; // Veces que se ejecutó esta tarea

  private interval: any; // Instancia del job

  constructor(period: number) {
    this.period = period;
  }

  start() {
    this.interval = setInterval(this.run, 1000 * this.period);
  }

  cancel() {
    clearInterval(this.interval);
  }

  getPeriod = () => this.period;

  abstract run(): void;

}