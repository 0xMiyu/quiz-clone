import { useState } from 'react';
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from '@material-tailwind/react';

function AccordianFAQ() {
  const [open, setOpen] = useState(1);

  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };

  const heading = {
    color: '#C5FB00',
    textAlign: 'left',
  };

  const para = {
    color: 'white',
  };

  function Icon({ id, open }: { id: number; open: number }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`${
          id === open ? 'rotate-180' : ''
        } h-5 w-5 transition-transform`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    );
  }

  return (
    <div className="">
      <Accordion icon={<Icon id={1} open={open} />} open={open === 1}>
        <AccordionHeader
          style={{
            color: '#C5FB00',
            textAlign: 'left',
            fontSize: '1rem',
          }}
          onClick={() => handleOpen(1)}
        >
          Do I need to pay to enter the quiz?
        </AccordionHeader>
        <AccordionBody style={{ ...para }}>
          Yes, you need to pay to enter the quiz. The price is 0.1 BNB per
          question. You can pay using BNB or BUSD. You can also pay using MATIC.
          You can pay using MATIC by connecting your wallet to the website.
        </AccordionBody>
      </Accordion>
      <Accordion icon={<Icon id={2} open={open} />} open={open === 2}>
        <AccordionHeader
          style={{ color: '#C5FB00', textAlign: 'left', fontSize: '1rem' }}
          onClick={() => handleOpen(2)}
        >
          Do I need an discord account?
        </AccordionHeader>
        <AccordionBody style={{ ...para }}>
          Yes, you need to join our discord server to play the quiz. You can
          join the server by clicking on the discord icon on the top right
          corner of the website.
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
        <AccordionHeader
          style={{ color: '#C5FB00', textAlign: 'left', fontSize: '1rem' }}
          onClick={() => handleOpen(3)}
        >
          What is Trivia Terror?{' '}
        </AccordionHeader>
        <AccordionBody style={{ ...para }}>
          Trivia Terror is a weekly quiz where you can win prizes by answering
          questions correctly. The quiz is hosted on discord. You can join the
          quiz by clicking on the discord icon on the top right corner of the
          website.
        </AccordionBody>
      </Accordion>
    </div>
  );
}

export default AccordianFAQ;
