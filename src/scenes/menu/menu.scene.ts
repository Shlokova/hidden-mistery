import { GAME_WIDTH, GAME_HEIGHT } from '../../index';
import { GameObjects, Scene } from 'phaser';

export class MenuScene extends Scene {
  private START_CONTAINER_SCALE = 0.9;
  private container!: GameObjects.Container;
  private background!: GameObjects.Rectangle;
  private header!: GameObjects.Container;
  private text!: GameObjects.Text;

  constructor() {
    super('menu-scene');
  }

  public create(): void {
    this.container = this.add.container(this.scale.width / 2, this.scale.height / 2);

    this.background = this.createBackground();
    this.header = this.createHeader();

    this.container.add([this.background, this.header]);

    this.container.alpha = 0;
    this.container.scale *= this.START_CONTAINER_SCALE;

    this.show();

    setTimeout(() => {
      this.hide();
    }, 4000);

    this.bindResize()
  }

  private onResize = (): void => {
    this.container.setPosition(this.scale.width / 2, this.scale.height / 2);
    this.header.scale = (0.8 * this.scale.width) / this.text.width;
  };

  private bindResize(): void {
    this.scale.on('resize', this.onResize)
    this.scale.on('orientationchange', this.onResize)
    this.scale.on('deviceorientation', this.onResize)
  }

  private show(): void {
    this.tweens.add({
      targets: this.container,
      alpha: 0.93,
      duration: 1000,
      ease: 'Linear',
    });

    this.tweens.add({
      targets: this.text,
      alpha: 1,
      duration: 1000,
      ease: 'Linear',
    });

    this.tweens.add({
      targets: this.container,
      scale: 1,
      duration: 4000,
      ease: 'Quad',
    });
  }

  private hide(): void {
    this.tweens.add({
      targets: [this.background, this.container],
      alpha: 0,
      duration: 1000,
      ease: 'Linear',
      onComplete: () => {
        this.scene.remove('menu-scene');
        this.scene.resume('game-scene');
      },
      onCompleteScope: this,
    });
  }

  private createText(): GameObjects.Text {
    const text = this.add.text(0, 0, ['\t5 Hidden Dogs','Can you spot them?'], {
      fontSize: '42px',
      fontFamily: 'Arial, sans-serif',
      color: '#ffffff',
      align: 'left',
      fontStyle: 'bold',
      maxLines: 2,
    });
    text.setOrigin(0.5, 0.5);
    text.setLineSpacing(text.height / 2);

    return text;
  }

  private createImage(): GameObjects.Image {
    const image = this.add.image(this.text.width / 2 - 10, 10, 'target');
    image.setFlipX(true);
    image.setOrigin(1, 1);
    image.scale = 0.75;

    return image;
  }

  private createHeader(): GameObjects.Container {
    const header = this.add.container(0, 0);

    this.text = this.createText();
    const image = this.createImage();

    header.add([this.text, image]);
    header.scale = (0.8 * this.scale.width) / this.text.width;

    return header;
  }

  private createBackground(): GameObjects.Rectangle {
    const background = this.add.rectangle(
      0,
      0,
      GAME_WIDTH / this.START_CONTAINER_SCALE,
      GAME_HEIGHT / this.START_CONTAINER_SCALE,
      0x000000,
    );

    background.setOrigin(0.5);

    return background;
  }
}
