'use server';

import { redirect } from 'next/navigation';
import { saveNewsItem } from './utils-news';
import { revalidatePath } from 'next/cache';

function isInvalidText(value){
  return !value || value.trim() === '';
}

export async function saveNews(prevState, formData) {
    const news = {
      slug: formData.get('slug'),
      title: formData.get('title'),
      image: formData.get('image'),
      date: formData.get('date'),
      content: formData.get('content')
    };

    if(
      isInvalidText(news.slug) 
      || isInvalidText(news.title) 
      || isInvalidText(news.content) 
      || isInvalidText(news.date)
      || !news.image || news.image.size === 0
    ){
      return {
        message: 'Invalid input'
      }
    }

    await saveNewsItem(news);
    revalidatePath('/news');
    redirect('/news');
  }