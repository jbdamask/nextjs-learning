import React from 'react';
import { getAllNews } from '@/lib/utils-news';
import NewsList from '@/components/news-list';

export default async function NewsPage() {
  const news = await getAllNews();

  return (
    <>
      <h1>News Page</h1>
      <NewsList news={news} />
    </>
  );
}


// import React from 'react';
// import { DUMMY_NEWS } from '@/dummy-news';
// import NewsList from '@/components/news-list';

// export default function NewsPage() {
//   return (
//     <>
//       <h1>News Page</h1>
//       <NewsList news={DUMMY_NEWS} />
//     </>
//   );
// }