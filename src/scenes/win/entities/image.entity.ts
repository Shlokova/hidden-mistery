import { GameObjects, Scale, Scene } from 'phaser';

export class ImageEntity extends GameObjects.Sprite {
  private readonly effect: Phaser.FX.Vignette | null;
  
  constructor(scene: Scene) {
    super(scene, 0, 0, 'char');

    this.setOrigin(0.5, 0);
    this.scale = this.scene.scale.height / this.height;
    this.effect = this.preFX?.addVignette(0.5, 0, 1, 0.45) || null;

    if (this.scene.scale.orientation === Scale.Orientation.LANDSCAPE) {
      this.setToLandspaceOrientation();
    } else {
      this.setToLandspaceOrientation();
    }

    this.scene.add.existing(this);
    this.alpha = 0;
  }

  public setToPortialOrientation(): void {
    this.setFlipX(true);
    this.setScale(0.53);
    this.setPosition(
      this.scene.scale.width / 2,
      this.scene.scale.height / 2 - this.displayHeight / 2 + 50,
    );

    this.effect?.setActive(true);
  }

  public setToLandspaceOrientation(): void {
    this.setFlipX(false);
    this.scale = this.scene.scale.height / this.height;
    this.setPosition(this.scene.scale.width / 2 - 320, 0);

    this.effect?.setActive(false);
  }
}
