import { watch } from 'fs'
import { resolve } from 'path';
import { execSync } from 'child_process';
const watcherFront = watch(resolve(__dirname, './front/src'), { recursive: true });
const watcherBack = watch(resolve(__dirname, './src'), { recursive: true })

let timerId: NodeJS.Timeout = -1 as any;

watcherFront.addListener('change', (eventType, filename) => {
  clearTimeout(timerId);
  timerId = setTimeout(() => {
    console.log('RESTART_FRONT!');
    execSync('docker compose restart');
  }, 2000)
});

watcherBack.addListener('change', (eventType, filename) => {
  clearTimeout(timerId);
  timerId = setTimeout(() => {
    console.log('RESTART_BACK!')
    execSync('docker compose restart');
  }, 2000)
})