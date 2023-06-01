import QuizHero from './QuizHero';
import Image from 'next/image';
import podium from '../../public/podium.png';
import Link from 'next/link';

interface QuizResultProps {
	startDateTime: Date;
	week: number;
	name: string;
}

function QuizResult(props: QuizResultProps) {
	return (
		<div className="w-full md:w-[70%] mx-auto px-6 md:px-10">
			{/* Topic */}
			<QuizHero
				week={props.week}
				name={props.name}
			/>
			{/* Results */}
			<p className="grid place-items-center text-[#C5FB00] text-xl">
				{props.startDateTime.getDate() +
					'/' +
					props.startDateTime.getMonth() +
					'/' +
					props.startDateTime.getFullYear()}
			</p>
			<p></p>
			{/* TODO */}
			{/* {props.result && (
				<div className="grid place-items-center">
					<h2 className="text-3xl font-extrabold h-fit text-[#C5FB00]">The Winners</h2>
					<div className="grid grid-cols-3">
						<div className="grid place-items-center">
							<Link href={`/dashboard/${props.result[1]?.publicKey}`}>
								<div className=" grid place-items-center md:relative inset-y-10 ">
									<p className="text-xl text-[#C5FB00]">2nd</p>
									<p className="text-xl">{props.result[1]?.name}</p>
									<img
										className="rounded"
										alt="profile picture"
										src={props.result[1]?.profilePic}
										width={200}
										height={200}
									></img>
								</div>
							</Link>

							<Image
								alt="podium"
								src={podium}
								width={500}
								height={500}
							></Image>
						</div>
						<div className="grid place-items-center relative inset-y-20">
							<Link href={`/dashboard/${props.result[0]?.publicKey}`}>
								<div className=" grid place-items-center md:relative inset-y-10 ">
									<p className="text-xl text-[#C5FB00]">1st</p>
									<p className="text-xl">{props.result[0]?.name}</p>
									<img
										className="rounded"
										alt="profile picture"
										src={props.result[0]?.profilePic}
										width={200}
										height={200}
									></img>
								</div>
							</Link>
							<Image
								className="min-h-200 min-w-200"
								alt="podium"
								src={podium}
								width={700}
								height={475}
								sizes="100vw"
								style={{
									width: '100%',
									height: 'auto',
								}}
							></Image>
						</div>
						<div className="grid place-items-center ">
							<Link href={`/dashboard/${props.result[2]?.publicKey}`}>
								<div className=" grid place-items-center md:relative inset-y-10 ">
									<p className="text-xl text-[#C5FB00]">3rd</p>
									<p className="text-xl">{props.result[2]?.name}</p>
									<img
										className="rounded"
										alt="profile picture"
										src={props.result[2]?.profilePic}
										width={200}
										height={200}
									></img>
								</div>
							</Link>

							<Image
								alt="podium"
								src={podium}
								width={500}
								height={500}
							></Image>
						</div>
					</div>
				</div>
			)} */}
		</div>
	);
}

export default QuizResult;
