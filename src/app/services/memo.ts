export class Memo {
	public id: number;
	public postponeLevel: number;
	public repeatDate: Date;
	public scores: number;

	constructor(
		public question: string,
		public answer: string
	) { }
}

export enum Postpone {
	Zero = 0,
	One = 1,
	Two = 2,
	Three = 6,
	Four = 15,
	Five = 40,
	Six = 100,
	Seven = 250,
	Eight = 625
}

export const PostponeLevels: Array<number> = [0, 1, 2, 6, 15, 40, 100, 250, 625];