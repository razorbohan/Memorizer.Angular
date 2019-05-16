export class Memo {
	constructor(public id: number,
		public question: string,
		public answer: string,
		public postponeLevel: number,
		public repeatdate: Date,
		public scores: number,
	) { }
}

enum MemoAnswerType {
	Bad = 1,
	Tomorrow,
	Later,
	Cool
}

enum Postpone {
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