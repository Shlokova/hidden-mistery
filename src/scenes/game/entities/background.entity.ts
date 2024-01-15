import { Scene } from 'phaser';

export class Background {
  private background!: Phaser.GameObjects.Image;

  constructor(private readonly scene: Scene) {
    this.create();
    this.bindResize()
  }

  public create(): void {
    this.background = this.scene.add.image(
      this.scene.scale.width / 2,
      this.scene.scale.height / 2,
      'background',
    );
    this.background.setOrigin(0.5, 0.5);
  }

  private onResize = (): void => {
    this.background.setPosition(this.scene.scale.width / 2, this.scene.scale.height / 2);
  };

  private bindResize(): void {
    this.scene.scale.on('resize', this.onResize)
    this.scene.scale.on('orientationchange', this.onResize)
    this.scene.scale.on('deviceorientation', this.onResize)
  }
}
