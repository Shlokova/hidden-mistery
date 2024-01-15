import { GameObjects, Scale, Scene } from 'phaser';

export class LogoEntity extends GameObjects.Sprite {
  constructor(scene: Scene) {
    super(scene, 0, 0, 'logo');

    this.setOrigin(0.5, 0);

    if (this.scene.scale.orientation === Scale.Orientation.LANDSCAPE) {
      this.setToLandspaceOrientation();
    } else {
      this.setToLandspaceOrientation();
    }

    this.scene.add.existing(this);

    this.alpha = 0;
  }

  public setToPortialOrientation(): void {
    this.setPosition(this.scene.scale.width / 2, 0);
    this.scale = 0.8;
  }

  public setToLandspaceOrientation(): void {
    this.setPosition(this.scene.scale.width / 2, 0);
    this.scale = 0.92;
  }
}
