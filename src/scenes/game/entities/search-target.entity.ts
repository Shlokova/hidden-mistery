import { GAME_WIDTH, GAME_HEIGHT } from '../../../index';
import { GameObjects, Scene } from 'phaser';

type Params = {
  x: number;
  y: number;
  width: number;
  height: number;
  flipX: boolean;
};

export class SearchTargetEntity extends GameObjects.Container {
  public isFound = false;
  public globalX: number;
  public globalY: number;
  private sprite: GameObjects.Sprite;
  private mark: GameObjects.Sprite | null = null;

  constructor(scene: Scene, params: Params) {
    super(
      scene,
      params.x + params.width / 2 - GAME_WIDTH / 2,
      params.y + params.height / 2 - GAME_HEIGHT / 2,
    );

    this.globalX = params.x + params.width / 2;
    this.globalY = params.y + params.height / 2;

    this.sprite = this.scene.add.sprite(0, 0, 'target');
    this.scale = params.width / this.sprite.width;
    this.sprite.setFlipX(params.flipX);

    this.add(this.sprite);

    this.sprite.setInteractive();

    this.sprite.once('pointerdown', () => {
      this.markAsFound();
    });
  }

  public markAsFound() {
    this.mark = this.scene.add.sprite(0, 0, 'circle');
    this.mark.anims.play('animateFrames');
    this.add(this.mark);

    this.isFound = true;

    this.scene.game.events.emit('searchTargetFound');
  }

  public setParameters(params: {
    x: number;
    y: number;
    width: number;
    height: number;
    flipX: boolean;
  }): void {
    this.globalX = params.x + params.width / 2;
    this.globalY = params.y + params.height / 2;

    this.scale = params.width / this.sprite.width;

    this.setPosition(this.globalX - GAME_WIDTH / 2, this.globalY - GAME_HEIGHT / 2);
    this.sprite.setFlipX(params.flipX);
  }
}
