import readFile from 'node:fs/promises';
import { execa } from 'execa';

const normalize = async file => {
  try {
    const { stdout } = await execa('ffmpeg-normalize', [
      file,
      '-o',
      `${file.split('.')[0]}-normalized.m4a`,
      '-c:a',
      'aac',
      '-b:a',
      '192k',
      '--dual-mono'
    ]);
    console.log(stdout);
  } catch (error) {
    console.error(error);
  }
};

const ls = await execa('ls', [process.cwd()]);
const files = ls.stdout
  .split('\n')
  .filter(file => file.endsWith('.m4a') || file.endsWith('.mp3') || file.endsWith('.wav'));

for (let file of files) {
  await normalize(file);
}
