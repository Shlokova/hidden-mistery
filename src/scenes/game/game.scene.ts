import { GAME_WIDTH, GAME_HEIGHT } from './../../index';
import { Scene } from 'phaser';
import { SearchTargetGenerationService } from './services/generate-target.service';
import { SEARCH_TARGETS_CONFIG } from './config';
import { SearchTargetEntity } from './entities/search-target.entity';
import { Background } from './entities/background.entity';

export class GameScene extends Scene {
  private TARGET_COUNT = 5;
  private currentCountFoundTargets = 0;
  private container!: Phaser.GameObjects.Container;
  private searchTargetGenerationService!: SearchTargetGenerationService;

  constructor() {
    super('game-scene');
  }

  public create(): void {
    new Background(this);
    this.createAnimations();

    this.container = this.add.container(this.scale.width / 2, this.scale.height / 2);

    this.searchTargetGenerationService = new SearchTargetGenerationService(this, SEARCH_TARGETS_CONFIG);
    const targetElements = this.generateTargetElements();

    this.container.add(targetElements);

    this.game.events.on('searchTargetFound', this.onSearchTargetFound);
    this.bindResize();
  }

  private createAnimations(): void {
    this.anims.create({
      key: 'animateFrames',
      frames: [
        { key: 'circle_1' },
        { key: 'circle_2' },
        { key: 'circle_3' },
        { key: 'circle_4' },
        { key: 'circle_5' },
        { key: 'circle_6' },
        { key: 'circle_7' },
        { key: 'circle_8' },
      ],
      frameRate: 16,
    });
  }

  private onSearchTargetFound = (): void =>{
    this.currentCountFoundTargets++;

    if (this.currentCountFoundTargets === this.TARGET_COUNT) {
      this.scene.start('win-scene');
    }
  }

  private generateTargetElements(): SearchTargetEntity[] {
    return this.searchTargetGenerationService.generateTargetsArray(
      this.TARGET_COUNT,
      {
        width: this.scale.width,
        height: this.scale.height,
      },
      { x: GAME_WIDTH / 2, y: GAME_HEIGHT / 2 },
    );
  }

  private onResize = (): void => {
    this.container.setPosition(this.scale.width / 2, this.scale.height / 2);

    this.searchTargetGenerationService.updateCurrentSearchTargetArray(
      this.TARGET_COUNT,
      {
        width: this.scale.width,
        height: this.scale.height,
      },
      { x: GAME_WIDTH / 2, y: GAME_HEIGHT / 2 },
    );
  };

  private bindResize(): void {
    this.scale.on('resize', this.onResize)
    this.scale.on('orientationchange', this.onResize)
    this.scale.on('deviceorientation', this.onResize)
  }
}
