import React from 'react';
import Image from 'next/image';
import { getNews } from '@/lib/utils-news';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function NewsArticlePage({ params }) {
  const { slug } = params;

  const news = await getNews(slug);

  if (!news) {
    notFound();
  }

  console.log(`/news/${news.slug}/image`);

  return (
    <article className='news-article'>
      <Link 
        href={{
          pathname: `/news/${news.slug}/image`,
          query: { title: news.title, image: news.image }
        }}
        aria-label={`View full-size image of ${news.title}`}
        className='news-article__image'
      >
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