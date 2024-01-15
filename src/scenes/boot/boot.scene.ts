import { Scene } from 'phaser';
import { config } from './config';

export class BootScene extends Scene {
  constructor() {
    super('boot-scene');
  }

  public preload(): void {
    this.loadImages();
  }

  public create(): void {
    this.scene.start('game-scene');
    this.scene.pause('game-scene');

    this.scene.start('menu-scene');
    this.scene.start('ui-scene');
  }

  private loadImages(): void {
    config.images.forEach((image: { key: string; url: string }) => {
      this.load.image(image.key, image.url);
    });
  }
}
