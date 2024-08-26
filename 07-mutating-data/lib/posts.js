import { createClient } from '@supabase/supabase-js';
// import dotenv from 'dotenv';
// dotenv.config({ path: '.env.local' });

const db_key = process.env.SUPABASE_POSTS_KEY;
const db_url = process.env.SUPABASE_POSTS_URL;

// console.log("keys", db_key, db_url);


const supabase = createClient(
  db_url,
  db_key
);


async function seedDb() {
  // Supabase automatically handles table creation via SQL migrations or the Supabase dashboard.
  // No need to create tables programmatically.
  
  // Creating two dummy users if they don't exist already
  const { count } = await supabase
    .from('users')
    .select('*', { count: 'exact' });

  if (count === 0) {
    await supabase.from('users').insert([
      { first_name: 'John', last_name: 'Doe', email: 'john@example.com' },
      { first_name: 'Max', last_name: 'Schwarz', email: 'max@example.com' }
    ]);
  }
}

export async function getPosts(maxNumber) {
  let query = supabase
    .from('posts')
    .select(`
      id, 
      image_url, 
      title, 
      content, 
      created_at, 
      users!posts_user_id_fkey (first_name, last_name), 
      likes (count)
    `)
    .order('created_at', { ascending: false });

  if (maxNumber) {
    query = query.limit(maxNumber);
  }

  const { data, error } = await query;
  if (error) throw error;

  // Transform the data to match the expected format
  const transformedData = data.map(post => ({
    id: post.id,
    image: post.image_url,
    title: post.title,
    content: post.content,
    createdAt: post.created_at,
    userFirstName: post.users.first_name,
    userLastName: post.users.last_name,
    likes: post.likes[0]?.count || 0,
    isLiked: false // You'll need to implement this logic separately
  }));

  // Simulate delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return transformedData;
}

export async function storePost(post) {
  const { data, error } = await supabase
    .from('posts')
    .insert([
      {
        image_url: post.imageUrl,
        title: post.title,
        content: post.content,
        user_id: post.userId
      }
    ]);

  if (error) throw error;

  // Simulate delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return data;
}

export async function updatePostLikeStatus(postId, userId) {
  const { count } = await supabase
    .from('likes')
    .select('*', { count: 'exact' })
    .eq('user_id', userId)
    .eq('post_id', postId);

  if (count === 0) {
    const { data, error } = await supabase
      .from('likes')
      .insert([{ user_id: userId, post_id: postId }]);

    if (error) throw error;

    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return data;
  } else {
    const { data, error } = await supabase
      .from('likes')
      .delete()
      .eq('user_id', userId)
      .eq('post_id', postId);

    if (error) throw error;

    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return data;
  }
}

// seedDb();