import Link from 'next/link';

function AboutPage() {
  return (
    <div>
      <Link href='/' className='fixed left-0 top-0 text-xl'>
        <a>{'<'} Back</a>
      </Link>
      <div className='w-screen h-screen relative flex flex-col items-center justify-center'>
        <h1 className='text-2xl mb-2'>Roundest Pokemon</h1>
        <p>I made this to learn about tRPC and Tailwind.</p>
        <p>
          Most of it is stolen from{' '}
          <Link href='https://t3.gg/'>
            <a className='text-gray-400'>Theo</a>
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
