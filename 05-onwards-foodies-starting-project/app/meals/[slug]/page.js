import classes from './page.module.css';
import S3MealImage from '@/components/images/s3-meal-image';
import { getMeal } from '@/lib/meals';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';

async function MealDetailsLoader({slug}) {
  const meal = (await getMeal(slug))[0];
  if(!meal) {
    notFound();
  }
  const { title, image, creator, summary, instructions } = meal;
  const formattedInstructions = instructions.replace(/\n/g, "<br />");
  console.log("Meal image url:", image);
  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <S3MealImage
            src={image.replace(/^\/images\//, '')}
            alt={title}
            fill
          />
        </div>
        <div className={classes.headerText}>
          <h1>{title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${'EMAIL'}`}>{creator}</a>
          </p>
          <p className={classes.summary}>{summary}</p>
        </div>
      </header>
      <main>
        <p 
          className={classes.instructions} 
          dangerouslySetInnerHTML={{
            __html: formattedInstructions,
          }}>          
        </p>
      </main>
    </>
  );
}


export default function MealDetailsPage({params}) {
  return(
    <>
      <Suspense fallback={<p className={classes.loading}>Loading...</p>}>
        <MealDetailsLoader slug={params.slug} />
      </Suspense>

    </>
  );
}