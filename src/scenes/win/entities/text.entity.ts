import { GameObjects, Scale, Scene } from 'phaser';

export class TextEntity extends GameObjects.Text {
  constructor(scene: Scene) {
    super(scene, 0, 0, ['Can you solve', 'nevery mystery?'], {
      fontSize: 53,
      fontFamily: 'Arial, sans-serif',
      align: 'center',
      fontStyle: 'bold',
      maxLines: 2,
      color: '#ffffff',
    });

    this.setOrigin(0.5, 0.5);

    if (this.scene.scale.orientation === Scale.Orientation.LANDSCAPE) {
      this.setToLandspaceOrientation();
    } else {
      this.setToLandspaceOrientation();
    }

    this.scene.add.existing(this);
    this.alpha = 0;
  }

  public setToPortialOrientation(): void {
    this.setPosition(this.scene.scale.width / 2, this.scene.scale.height / 2 + 150);
  }

  public setToLandspaceOrientation(): void {
    this.setPosition(this.scene.scale.width / 2, this.scene.scale.height / 2 + 100);
  }
}
