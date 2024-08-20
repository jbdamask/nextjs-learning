import React from 'react';
import Image from 'next/image';

export default function InterceptorLink({ params, searchParams }) {
  const { slug } = params;
  const { title, image } = searchParams;


  if (!image || !title) {
    return <div>Image information not provided</div>;
  }

  return (
    <>
      <h2>Intercepted</h2>
      <div>
        <Image src={`/images/news/${image}`} alt={title} width={800} height={600} />
      </div>
    </>
  );
}