import { GameObjects, Scene } from 'phaser';

export class ButtonEntity extends GameObjects.Container {
  private readonly background: GameObjects.Image;
  private readonly text: GameObjects.Text;

  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y);

    this.background = scene.add.image(0, 0, 'button').setOrigin(0.5);
    this.text = this.createText();
    this.scale = 1.1;

    this.add([this.background, this.text]);

    this.setInteractive({
      hitArea: new Phaser.Geom.Rectangle(
        -this.background.width / 2,
        -this.background.height / 2,
        this.background.width,
        this.background.height,
      ),
      hitAreaCallback: Phaser.Geom.Rectangle.Contains,
      cursor: 'pointer',
    });

    this.on('pointerdown', () => {
      window.open('https://www.g5.com', '_self');
    });

    scene.add.existing(this);
  }

  public startAnimation = () => {
    this.scene.tweens.add({
      targets: this,
      scale: { value: 1.2, duration: 1500, ease: 'linear', yoyo: true, repeat: -1 },
    });
  };

  private createText(): GameObjects.Text {
    const label = this.scene.add.text(0, 0, 'Play Now', {
      fontSize: '42px',
      fontStyle: 'bold',
      color: '#ffffff',
      fontFamily: 'Arial, sans-serif',
    });

    label.setOrigin(0.5);

    return label;
  }
}
