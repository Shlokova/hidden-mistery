import { GameObjects, Scale, Scene } from 'phaser';
import { GAME_HEIGHT, GAME_WIDTH } from '../../index';
import { HeaderEntity } from './entities/header.entity';
import { ImageEntity } from './entities/image.entity';
import { LogoEntity } from './entities/logo.entity';
import { TextEntity } from './entities/text.entity';

export class WinScene extends Scene {
  private background!: GameObjects.Rectangle;
  private text!: TextEntity;
  private header!: HeaderEntity;
  private image!: ImageEntity;
  private logo!: LogoEntity;

  constructor() {
    super('win-scene');
  }

  public create(): void {
    this.background = this.add.rectangle(0, 0, GAME_WIDTH, GAME_HEIGHT, 0x000000);
    this.background.alpha = 0;
    this.background.setOrigin(0);

    this.image = new ImageEntity(this);
    this.logo = new LogoEntity(this);
    this.text = new TextEntity(this);
    this.header = new HeaderEntity(this);

    this.onResize();
    this.show();

    this.bindResize();
    this.game.events.emit('startWinScene');
  }

  private show(): void {
    this.tweens.add({
      targets: [this.image, this.text, this.header, this.logo],
      alpha: 1,
      duration: 1000,
      ease: 'Linear',
    });

    this.tweens.add({
      targets: this.background,
      alpha: 0.92,
      duration: 1000,
      ease: 'Linear',
    });
  }

  private onResize = (): void => {
    if (this.scale.orientation === Scale.Orientation.LANDSCAPE) {
      this.logo.setToLandspaceOrientation();
      this.image.setToLandspaceOrientation();
      this.header.setToLandspaceOrientation();
      this.text.setToLandspaceOrientation();
    } else {
      this.logo.setToPortialOrientation();
      this.image.setToPortialOrientation();
      this.header.setToPortialOrientation();
      this.text.setToPortialOrientation();
    }
  };

  private bindResize(): void {
    this.scale.on('resize', this.onResize)
    this.scale.on('orientationchange', this.onResize)
    this.scale.on('deviceorientation', this.onResize)
  }
}
