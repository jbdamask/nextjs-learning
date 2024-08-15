import React from 'react';
import Image from 'next/image';
import {DUMMY_NEWS} from '@/dummy-news';

export default function InterceptorLink({ params }) {
  const { slug } = params;

  const news = DUMMY_NEWS.find(news => news.slug === slug);

  // console.log(news);
  // if (!news) {
  //   router.push('/404');
  //   return null;
  // }

  return (
    <>
    <h2>Intercepted</h2>
    <div>
      <Image src={`/images/news/${news.image}`} alt={news.title} fill />
    </div>
    </>
  );
}
