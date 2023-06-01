import Image from 'next/image';
import PricingAndPot from './PricingAndPot';
import BG from '../../public/bg/bg-single-page.png';

interface QuizHeroProps {
	week: number;
	name: string;
}

function QuizHero(props: QuizHeroProps) {
	return (
		<>
			<div>
				<Image
					alt="hero-image"
					className="-z-10"
					src={BG}
					placeholder="blur"
					fill
				/>
			</div>

			<div className="my-10">
				<p className="text-lg h-fit text-[#C5FB00] font-light border-l-2 border-[#C5FB00] pl-2">
					Trivia Of The Week!
				</p>

				<div className="bg-white my-4 rounded-lg w-14 h-14 md:w-12 md:h-12"></div>

				{/* heading */}
				<h2 className="text-4xl md:text-5xl w-full md:w-[50%] text-[#C5FB00] font-bold">
					{props.name}
				</h2>
				<h2 className="text-4xl md:text-5xl w-full md:w-[50%] text-white font-bold">
					Week {props.week} Newsletter.
				</h2>

				{/* description */}
				{/* Do we add the db description here? */}
				<p className="text-base md:text-lg my-2">
					Take Part in this week’s Trivia and take home all the money in the pot!
				</p>

				{/* Pricings and pot money info */}
				<PricingAndPot />
			</div>
		</>
	);
}

export default QuizHero;
