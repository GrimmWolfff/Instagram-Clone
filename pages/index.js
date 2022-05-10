import Head from 'next/head';

import Header from '../components/Header';
import Feed from '../components/Feed';
import Modal from '../components/Modal';

export default function Home() {

  return (
    <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
      <Header />
      <div className="flex flex-col items-center min-h-screen py-2">
        <Head>
          <title>Instagram Clone</title>
        </Head>
        <Feed />
        <Modal />
      </div>
    </div>
  )
}
