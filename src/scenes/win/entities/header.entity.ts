import { GameObjects, Scale, Scene } from 'phaser';

export class HeaderEntity extends GameObjects.Text {
  constructor(scene: Scene) {
    super(scene, 0, 0, 'Great Job', {
      fontSize: 92,
      fontFamily: 'Arial, sans-serif',
      align: 'center',
      fontStyle: 'bold',
      maxLines: 2,
    });
    this.setOrigin(0.5, 0.5);
    
    const gradient = this.context.createLinearGradient(0, 0, 0, this.height);
    gradient.addColorStop(0, '#efde9b');
    gradient.addColorStop(0.4, '#f2d279');
    gradient.addColorStop(0.6, '#f2c459');
    gradient.addColorStop(1, '#eab13d');

    this.setFill(gradient);

    if (this.scene.scale.orientation === Scale.Orientation.LANDSCAPE) {
      this.setToLandspaceOrientation();
    } else {
      this.setToLandspaceOrientation();
    }

    this.scene.add.existing(this);
    this.alpha = 0;
  }

  public setToPortialOrientation(): void {
    this.setPosition(this.scene.scale.width / 2, this.scene.scale.height / 2 + 50);
  }

  public setToLandspaceOrientation(): void {
    this.setPosition(this.scene.scale.width / 2, this.scene.scale.height / 2 - 30);
  }
}
