import { Scene } from 'phaser';
import { ButtonEntity } from './entities/button.entity';

export class UiScene extends Scene {
  private button!: ButtonEntity;

  constructor() {
    super('ui-scene');
  }

  public create(): void {
    this.bindResize();
    this.button = new ButtonEntity(this, this.scale.width / 2, this.scale.height - 80);
    this.game.events.on('startWinScene', this.button.startAnimation);
  }

  private onResize = (): void => {
    this.button.setPosition(this.scale.width / 2, this.scale.height - 80);
  };

  private bindResize(): void {
    this.scale.on('resize', this.onResize)
    this.scale.on('orientationchange', this.onResize)
    this.scale.on('deviceorientation', this.onResize)
  }
}
