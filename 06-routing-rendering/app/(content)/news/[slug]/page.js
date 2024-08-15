import React from 'react';
import Image from 'next/image';
import { DUMMY_NEWS } from '../../../../dummy-news';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default function NewsArticlePage({ params }) {
  const { slug } = params;

  const news = DUMMY_NEWS.find(news => news.slug === slug);

  if (!news) {
    notFound();
  }
console.log(news.slug);
  return (
    <article className='news-article'>
      <Link href={`/news/${news.slug}/image`}>
        <Image 
          src={`/images/news/${news.image}`} 
          alt={news.title} 
          width={200} 
          height={150}
        />
      </Link>
      <h1>{news.title}</h1>
      <time dateTime={news.date}>{news.date}</time>
      <p>{news.content}</p>
    </article>
  );
}