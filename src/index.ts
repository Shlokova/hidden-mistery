// import { UIScene } from './scenes/ui/index';
import { BootScene, MenuScene, GameScene, WinScene, UiScene } from './scenes';
import { Game } from 'phaser';

export const GAME_SAFE_AREA_WIDTH = 460;
export const GAME_SAFE_AREA_HEIGHT = 767;
export const GAME_WIDTH = 1075;
export const GAME_HEIGHT = 767;

export const gameConfig = {
  title: 'hidden-mistery',
  type: Phaser.WEBGL,
  parent: 'game',
  width: 1075,
  height: 767,
  backgroundColor: '#000000',
  scale: {
    mode: Phaser.Scale.NONE,
    autoRound: true,
  },
  audio: {
    disableWebAudio: true,
  },
  roundPixels: true,
  autoRound: true,
  canvasStyle: `display: block; position: absolute;`,
  autoFocus: true,
  scene: [BootScene, GameScene, MenuScene, WinScene, UiScene],
};

const game = new Game(gameConfig);

function handleResize() {
  const { innerWidth, innerHeight } = window;

  let width = GAME_SAFE_AREA_WIDTH;
  let height = GAME_SAFE_AREA_HEIGHT;
  let maxWidth = GAME_WIDTH;
  let maxHeight = GAME_HEIGHT;

  let scale = Math.min(innerWidth / width, innerHeight / height);
  let newWidth = Math.min(innerWidth / scale, maxWidth);
  let newHeight = Math.min(innerHeight / scale, maxHeight);

  game.scale.resize(newWidth, newHeight);

  game.canvas.style.width = newWidth * scale + 'px';
  game.canvas.style.height = newHeight * scale + 'px';

  game.canvas.style.top = `${(innerHeight - newHeight * scale) / 2}px`;
  game.canvas.style.left = `${(innerWidth - newWidth * scale) / 2}px`;
}

window.addEventListener('resize', () => handleResize());
handleResize();
