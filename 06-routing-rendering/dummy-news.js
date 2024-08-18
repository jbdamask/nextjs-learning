const { v4: uuidv4 } = require('uuid');
const slugify = require('slugify'); // Import slugify
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

let supabase;
  
try {
  // Initialize Supabase client
  supabase = createClient(
    process.env.SUPABASE_NEWS_URL,
    process.env.SUPABASE_NEWS_KEY
  );
} catch (error) {
  console.error('Failed to initialize Supabase client:', error.message);
  process.exit(1);
}

const DUMMY_NEWS = [
    {
      // id: 'n1',
      slug: 'will-ai-replace-humans',
      title: 'Will AI Replace Humans?',
      image: 'ai-robot.jpg',
      date: '2021-07-01',
      content:
        'Since late 2022 AI is on the rise and therefore many people worry whether AI will replace humans. The answer is not that simple. AI is a tool that can be used to automate tasks, but it can also be used to augment human capabilities. The future is not set in stone, but it is clear that AI will play a big role in the future. The question is how we will use it.',
    },
    {
      // id: 'n2',
      slug: 'beaver-plague',
      title: 'A Plague of Beavers',
      image: 'beaver.jpg',
      date: '2022-05-01',
      content: 'Beavers are taking over the world. They are building dams everywhere and flooding entire cities. What can we do to stop them?',
    },
    {
      // id: 'n3',
      slug: 'couple-cooking',
      title: 'Spend more time together!',
      image: 'couple-cooking.jpg',
      date: '2024-03-01',
      content: 'Cooking together is a great way to spend more time with your partner. It is fun and you get to eat something delicious afterwards. What are you waiting for? Get cooking!',
    },
    {
      // id: 'n4',
      slug: 'hiking',
      title: 'Hiking is the best!',
      image: 'hiking.jpg',
      date: '2024-01-01',
      content: 'Hiking is a great way to get some exercise and enjoy the great outdoors. It is also a great way to clear your mind and reduce stress. So what are you waiting for? Get out there and start hiking!',
    },
    {
      // id: 'n5',
      slug: 'landscape',
      title: 'The beauty of landscape',
      image: 'landscape.jpg',
      date: '2022-07-01',
      content: 'Landscape photography is a great way to capture the beauty of nature. It is also a great way to get outside and enjoy the great outdoors. So what are you waiting for? Get out there and start taking some pictures!',
    },
  ];

async function loadDummyNewsIntoSupabase() {

  for (const news of DUMMY_NEWS) {
    const { data, error } = await supabase
      .from('news')
      .insert([
        {
          // slug: news.slug,
          slug: `${slugify(news.slug, { lower: true })}-${uuidv4()}`,
          title: news.title,
          image: news.image,
          date: news.date,
          content: news.content
        }
      ]);

    if (error) {
      console.error('Error inserting news:', error);
    } else {
      console.log('Inserted news:', news.title);
    }
  }
}

// Uncomment this function to load the data into Supabase on app initiation
// Note that if you leave it uncommented, NextJS may do some weird shit that causes
// this script to re-execute and create duplicate data.
// loadDummyNewsIntoSupabase();