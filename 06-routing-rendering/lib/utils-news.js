import { S3 } from '@aws-sdk/client-s3';
import { createClient } from '@supabase/supabase-js';
import slugify from 'slugify'; // Import slugify
import xss from 'xss';
import { v4 as uuidv4 } from 'uuid';

const supabase = createClient(process.env.SUPABASE_NEWS_URL, process.env.SUPABASE_NEWS_KEY);

const s3 = new S3({
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export async function getAllNews() {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .order('date', { ascending: false });
  if (error) throw error;
  return data;
}

export async function getLatestNews() {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .order('date', { ascending: false })
    .limit(2);
  if (error) throw error;
  return data;
}

export async function getAvailableNewsYears() {
  const { data, error } = await supabase
    .from('news')
    .select('date')
    .order('date', { ascending: false });
  if (error) throw error;
  return [...new Set(data.map(news => new Date(news.date).getFullYear()))];
}

export async function getAvailableNewsMonths(year) {
  const { data, error } = await supabase
    .from('news')
    .select('date')
    .eq('date.year', year)
    .order('date', { ascending: false });
  if (error) throw error;
  return [...new Set(data.map(news => new Date(news.date).getMonth() + 1))];
}

export async function getNewsForYear(year) {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('date.year', year)
    .order('date', { ascending: false });
  if (error) throw error;
  return data;
}

export async function getNewsForYearAndMonth(year, month) {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('date.year', year)
    .eq('date.month', month)
    .order('date', { ascending: false });
  if (error) throw error;
  return data;
}

export async function getNews(slug) {
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error) {
    console.error('Error fetching news:', error);
    return null;
  }

  if (!data) {
    console.log('News not found for slug:', slug);
    return null;
  }

  return data;
}


export async function saveNews(news) {
  news.slug = `${slugify(news.slug, { lower: true })}-${uuidv4()}`,
  news.title = xss(news.title);
  news.date = new Date(news.date);
  news.content = xss(news.content);

  const extension = news.image.name.split('.').pop();
  const filename = `${uuidv4()}.${extension}`;
  // console.log('filename', filename);
  const bufferedImage = await news.image.arrayBuffer();

  try {
      await s3.putObject({
          Bucket: 'nextjs-course-images', // Ensure this is just the bucket name
          Key: filename,
          Body: Buffer.from(bufferedImage),
          ContentType: news.image.type,
      });
      console.log('Image uploaded successfully to S3. Filename: ', filename);

      // Verify the object URL
      const imageUrl = `https://nextjs-course-images.s3.amazonaws.com/${filename}`;
      console.log('Image URL:', imageUrl);
  } catch (error) {
      console.log('Error uploading image to S3. Filename: ', filename);
      console.error('S3 upload error:', error);
      throw new Error('Error uploading image to S3');
  }

  news.image = filename;

  const { data, error } = await supabase.from('news').insert([news]);

  if (error) {
      console.error('Error inserting news into database', error);
      throw new Error('Error inserting news into database');
  }

  return await getLatestNews(); // reload the news
}

// import { DUMMY_NEWS } from '@/dummy-news';

// export function getAllNews() {
//   return DUMMY_NEWS;
// }

// export function getLatestNews() {
//   return DUMMY_NEWS
//     .slice()
//     .sort((a, b) => new Date(b.date) - new Date(a.date))
//     .slice(0, 2);
// }

// export function getAvailableNewsYears() {
//   return DUMMY_NEWS.reduce((years, news) => {
//     const year = new Date(news.date).getFullYear();
//     if (!years.includes(year)) {
//       years.push(year);
//     }
//     return years;
//   }, []).sort((a, b) => b - a);
// }

// export function getAvailableNewsMonths(year) {
//   return DUMMY_NEWS.reduce((months, news) => {
//     const newsYear = new Date(news.date).getFullYear();
//     if (newsYear === +year) {
//       const month = new Date(news.date).getMonth();
//       if (!months.includes(month)) {
//         months.push(month + 1);
//       }
//     }
//     return months;
//   }, []).sort((a, b) => b - a);
// }

// export function getNewsForYear(year) {
//   return DUMMY_NEWS.filter((news) => {
//     const newsDate = new Date(news.date);
//     const newsYear = newsDate.getFullYear();
//     return newsYear === Number(year);
//   });
// }

// export function getNewsForYearAndMonth(year, month) {
//   return DUMMY_NEWS.filter((news) => {
//     const newsYear = new Date(news.date).getFullYear();
//     const newsMonth = new Date(news.date).getMonth() + 1;
//     return newsYear === +year && newsMonth === +month;
//   });
// }