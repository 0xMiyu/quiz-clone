import { Role, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const testPlayers = [
	{
		publicKey: '0x1234567890',
		userName: 'Joe Mama',
		profilePicture: 'https://i.imgur.com/1ZQZ1Yx.png',
	},
	{
		publicKey: '0x456790456',
		userName: 'Zhong Xina',
		profilePicture: 'https://i.imgur.com/keklmaog.png',
		totalWins: 0,
		totalPoints: 0,
		overallRanking: 4,
	},
	{
		publicKey: '7BLd7DP4gXRcfutQCCGEdgmkcsynCZWmp3QNud5pEJsA',
		userName: 'Alice',
		profilePicture: 'https://nftevening.com/wp-content/uploads/2022/09/degods-nft-sell.jpg',
	},
	{
		publicKey: 'pubkey1',
		userName: 'Bob',
		profilePicture: 'https://blog.mexc.com/wp-content/uploads/2022/09/DeGods.png',
	},
	{
		publicKey: 'pubkey2',
		userName: 'Charles',
		profilePicture: 'https://static.okx.com/cdn/nft/e719ece5-be9c-4a08-b604-f3af1e97e4e3.png',
		totalWins: 0,
		totalPoints: 0,
		overallRanking: 3,
	},
	{
		publicKey: 'pubkey3',
		userName: 'Dave',
		profilePicture: 'https://metadata.degods.com/g/9999-dead.png',
		totalWins: 2,
		totalPoints: 470,
		overallRanking: 1,
	},
	{
		publicKey: 'Fpt6wkFGE7j2rr4V1LiQsEEJFjdui8hePRQAnxCDJgVJ',
		userName: 'tigercxx',
		profilePicture:
			'https://powered.by.dustlabs.com/cdn-cgi/image/width=384/https://metadata.degods.com/g/3475-dead.png',
		totalWins: 2,
		totalPoints: 380,
		overallRanking: 2,
		role: Role.ADMIN,
	},
	{
		publicKey: 'ErDNSU1SdDajaT7oHM4FeATJXcJtfwnbhwoABZTWZ2mw',
		userName: 'angry',
		profilePicture:
			'https://powered.by.dustlabs.com/cdn-cgi/image/width=384/https://metadata.degods.com/g/3475-dead.png',
		totalWins: 2,
		totalPoints: 380,
		overallRanking: 2,
		role: Role.ADMIN,
	},
];

const testQuizzes = [
	{
		name: 'Solana Architecture',
		week: 1,
		description: '',
		startDateTime: new Date('2022-03-23 12:00:00'),
		ended: true,
		question: {
			create: [
				{
                    questionId: 1,
					timeLimit: 30,
					text: 'What is an orca lmao?',
					option: {
						create: [
							{ optionId: 1, correct: true, text: 'An orca' },
							{ optionId: 2, correct: false, text: 'A dolphin' },
							{ optionId: 3, correct: false, text: 'A fish' },
							{ optionId: 4, correct: false, text: 'A bird' },
						],
					},
				},
				{
                    questionId: 2,
					timeLimit: 60,
					text: 'Are orcas amazing??',
					option: {
						create: [
							{ optionId: 1, correct: true, text: 'Yes' },
							{ optionId: 2, correct: false, text: 'No' },
							{ optionId: 3, correct: false, text: 'Maybe' },
							{ optionId: 4, correct: false, text: 'Kms' },
						],
					},
				},
			],
		},
		quizEntry: {
			create: [
				{
					publicKey: 'pubkey3',
					points: 190,
					numOfCorrect: 2,
				},
			],
		},
	},
	{
		name: 'Orca Whirlpools',
		week: 2,
		description: "Quiz about orcas or smth idk i don't defi",
		startDateTime: new Date('2023-05-14 12:00:00'),
		ended: false,
		question: {
			create: [
				{
                    questionId: 1,
					timeLimit: 30,
					text: 'What is an orca lmao?',
					option: {
						create: [
							{ optionId: 1, correct: true, text: 'An orca' },
							{ optionId: 2, correct: false, text: 'A dolphin' },
							{ optionId: 3, correct: false, text: 'A fish' },
							{ optionId: 4, correct: false, text: 'A bird' },
						],
					},
				},
				{
                    questionId: 2,
					timeLimit: 30,
					text: 'Are orcas amazing??',
					option: {
						create: [
							{ optionId: 1, correct: true, text: 'Yes' },
							{ optionId: 2, correct: false, text: 'No' },
							{ optionId: 3, correct: false, text: 'Maybe' },
							{ optionId: 4, correct: false, text: 'Kms' },
						],
					},
				},
			],
		},
		quizEntry: {
			create: [
				{
					publicKey: 'Fpt6wkFGE7j2rr4V1LiQsEEJFjdui8hePRQAnxCDJgVJ',
					points: 190,
					numOfCorrect: 2,
				},
				{
					publicKey: 'pubkey3',
					points: 190,
					numOfCorrect: 1,
				},
				{
					publicKey: 'ErDNSU1SdDajaT7oHM4FeATJXcJtfwnbhwoABZTWZ2mw',
					points: 190,
					numOfCorrect: 2,
				},
			],
		},
	},
	{
		name: 'Solana Architecture',
		week: 3,
		description: '',
		startDateTime: new Date('2023-05-27 12:00:00'),
		ended: false,
		question: {},
		quizEntry: {
			create: [
				{
					publicKey: 'Fpt6wkFGE7j2rr4V1LiQsEEJFjdui8hePRQAnxCDJgVJ',
					points: 190,
					numOfCorrect: 2,
				},
				{
					publicKey: 'pubkey3',
					points: 90,
					numOfCorrect: 1,
				},
				{
					publicKey: 'ErDNSU1SdDajaT7oHM4FeATJXcJtfwnbhwoABZTWZ2mw',
					points: 190,
					numOfCorrect: 2,
				},
				{
					publicKey: 'pubkey2',
				},
			],
		},
	},
	{
		name: 'Test quiz to live',
		week: 4,
		description: '',
		startDateTime: new Date('2023-06-01 12:00:00'),
		ended: false,
		question: {
			create: [
				{
                    questionId: 1,
					timeLimit: 30,
					text: 'What is an orca lmao?',
					option: {
						create: [
							{ optionId: 1, correct: true, text: 'An orca' },
							{ optionId: 2, correct: false, text: 'A dolphin' },
							{ optionId: 3, correct: false, text: 'A fish' },
							{ optionId: 4, correct: false, text: 'A bird' },
						],
					},
				},
				{
                    questionId: 2,
					timeLimit: 60,
					text: 'What makes orcas amazing??',
					option: {
						create: [
							{ optionId: 1, correct: false, text: 'Orcccaa' },
							{ optionId: 2, correct: true, text: 'CCCAA' },
							{ optionId: 3, correct: false, text: 'CAAA' },
							{ optionId: 4, correct: false, text: 'AAA' },
						],
					},
				},
			],
		},
		quizEntry: {
			create: [
				{
					publicKey: '0x456790456',
				},
				{
					publicKey: 'pubkey2',
				},
			],
		},
	},
];

async function seed() {
	// for testing purpose
	// do a clean record each time we seed
	if (process.env.NODE_ENV === 'development') {
		console.log('reset');
		const tableNames = ['Option', 'Question', 'QuizEntry', 'Quiz', 'User'];
		for (const tableName of tableNames)
			await prisma.$queryRawUnsafe(`Truncate "${tableName}" restart identity cascade;`);
	}

	for (const player of testPlayers) {
		await prisma.user.create({
			data: player,
		});
	}

	for (const quiz of testQuizzes) {
		await prisma.quiz.create({
			data: quiz,
		});
	}
}

seed()
	.catch((error) => console.error(error))
	.finally(() => prisma.$disconnect());
