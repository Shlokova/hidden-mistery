import { Scene } from 'phaser';
import { SearchTargetEntity } from '../entities/search-target.entity';
import { getShuffledArray } from '../utils/getShuffledArray';

export class SearchTargetGenerationService {
  public currentSearchTargetArray: SearchTargetEntity[] = [];

  constructor(
    private readonly scene: Scene,
    private readonly searchTargetConfig: {
      x: number;
      y: number;
      width: number;
      height: number;
      flipX: boolean;
    }[],
  ) {}

  public generateTargetsArray(
    count: number,
    bounds: { width: number; height: number },
    center: { x: number; y: number },
  ): SearchTargetEntity[] {
    let i = 0;
    const config = getShuffledArray(this.searchTargetConfig);

    for (let j = 0; i < count && j < config.length; j++) {
      const target = config[j];

      if (this.checkSearchTargetWithinBoundary(target, bounds, center)) {
        this.currentSearchTargetArray.push(new SearchTargetEntity(this.scene, target));
        i++;
      }
    }

    return this.currentSearchTargetArray;
  }

  public checkSearchTargetWithinBoundary(
    searchTarget: { x: number; y: number; width: number; height: number },
    bounds: { width: number; height: number },
    center: { x: number; y: number },
  ): boolean {
    if (
      searchTarget.x - searchTarget.width / 2 > center.x - bounds.width / 2 &&
      searchTarget.x + searchTarget.width / 2 < center.x + bounds.width / 2 &&
      searchTarget.y - searchTarget.height / 2 < center.y + bounds.height / 2 &&
      searchTarget.y + searchTarget.height / 2 > center.y - bounds.height / 2
    ) {
      return true;
    }
    return false;
  }

  public updateCurrentSearchTargetArray(
    count: number,
    bounds: { width: number; height: number },
    center: { x: number; y: number },
  ): void {
    const config = getShuffledArray(this.searchTargetConfig);
    let i = 0;
    let k = 0;

    for (let j = 0; i < count && j < config.length; j++) {
      const searchTarget = config[j];

      if (this.checkSearchTargetWithinBoundary(searchTarget, bounds, center)) {
        if (k >= this.currentSearchTargetArray.length) {
          this.currentSearchTargetArray.push(new SearchTargetEntity(this.scene, searchTarget));
        } else {
          this.currentSearchTargetArray[k].setParameters(searchTarget);
          k++;
        }
        i++;
      }
    }
  }
}
