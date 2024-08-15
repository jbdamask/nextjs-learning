import Image from 'next/image';

export default function S3MealImage({ src, alt, ...props }) {
  const s3Url = `https://nextjs-course-images.s3.amazonaws.com/${src}`;
  return <Image src={s3Url} alt={alt} {...props} />;
}