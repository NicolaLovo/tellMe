export interface Prize {
  _id: string;
  title: string;
  creationDate: Date;
  /**
   * Number of points required to redeem this prize.
   */
  points: number;
}
