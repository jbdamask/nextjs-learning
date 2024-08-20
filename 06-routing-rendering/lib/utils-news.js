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
  
  const years = data.map(item => {
    // Directly extract the year from the date string
    const year = parseInt(item.date.split('-')[0], 10);

    return year;
  });
  
  const uniqueYears = [...new Set(years)];
  return uniqueYears;
}

export async function getAvailableNewsMonths(year) {
  const startDate = `${year}-01-01`;
  const endDate = `${year}-12-31`;
  
  const { data, error } = await supabase
    .from('news')
    .select('date')
    .gte('date', startDate)
    .lte('date', endDate)
    .order('date', { ascending: false });

  if (error) {
    console.error("Supabase query error:", error);
    throw error;
  }

  // Use the actual month from the date string, not JavaScript's getMonth()
  const months = [...new Set(data.map(item => parseInt(item.date.split('-')[1], 10)))];
  return months.sort((a, b) => a - b);
}

export async function getNewsForYear(year) {
  const startDate = `${year}-01-01`;
  const endDate = `${year}-12-31`;
  
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .gte('date', startDate)
    .lte('date', endDate)
    .order('date', { ascending: false });
  
  if (error) {
    console.error("Supabase query error:", error);
    throw error;
  }
  
  return data;
}

export async function getNewsForYearAndMonth(year, month) {
  // Ensure month is treated as 1-12, not 0-11
  const startDate = `${year}-${month.toString().padStart(2, '0')}-01`;
  const endDate = new Date(year, month, 0).toISOString().split('T')[0]; // Last day of the month
  
  const { data, error } = await supabase
    .from('news')
    .select('*')
    .gte('date', startDate)
    .lte('date', endDate)
    .order('date', { ascending: false });

  if (error) {
    console.error("Supabase query error:", error);
    throw error;
  }

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