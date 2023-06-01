import Image from 'next/image';
import CashBag from '../../public/bg/cash-bag.png';

function AboutSection() {
  return (
    <div className="flex justify-between my-10">
      <div className="w-full md:w-[50%] my-auto">
        <h2 className="text-4xl md:text-5xl text-white font-bold">
          Trivia with a twist!
        </h2>

        <p className="text-lg my-4 span-yellow">
          Trivia Terroir connects you to your <span>Discord</span> account to
          provide you with a unique and <span>exciting</span> trivia experience.
          Our Discord bot allows you to <span>join live quizzes</span> and{' '}
          <span>compete</span> with other players and the winner, takes{' '}
          <span>all the money in the pot!</span> With the pot tracker,
          you&apos;ll always know how much is up for grabs. So what are you
          waiting for? Don&apos;t miss out on the trivia revolution!
        </p>
      </div>

      <div className="w-[40%] hidden md:inline-flex justify-center">
        <Image
          placeholder="blur"
          src={CashBag}
          alt="cash-bag"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
}

export default AboutSection;
