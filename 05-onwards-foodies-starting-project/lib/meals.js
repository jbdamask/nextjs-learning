import { S3 } from '@aws-sdk/client-s3';
import { createClient } from '@supabase/supabase-js';
import slugify from 'slugify'; // Import slugify
import xss from 'xss';
import { v4 as uuidv4 } from 'uuid';
import fs from 'node:fs';

const params = require('../params.json');

const s3 = new S3({
    region: 'us-east-1'
  });

// Initialize Supabase client
const supabaseUrl = params.supabaseUrl;
const supabaseKey = process.env.SUPABASE_KEY || params.supabaseKey;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function getMeals() {
    // await new Promise(resolve => setTimeout(resolve, 2000));
    const { data, error } = await supabase.from('meals').select('*');
    console.log("Fetched meals:", data.length);
    return data;
}

export async function getMeal(slug) {
    const { data, error } = await supabase.from('meals').select('*').eq('slug', slug);
    return data;
}

export async function saveMeal(meal) {
    meal.slug = slugify(meal.title, { lower: true });
    meal.instructions = xss(meal.instructions);
    meal.summary = xss(meal.summary);
    meal.title = xss(meal.title);
    meal.creator_email = xss(meal.creator_email);
    meal.creator = xss(meal.creator);

    const extension = meal.image.name.split('.').pop();
    const filename = `${uuidv4()}.${extension}`;
    console.log('filename', filename);
    const bufferedImage = await meal.image.arrayBuffer();

    try {
        await s3.putObject({
            Bucket: 'nextjs-course-images', // Ensure this is just the bucket name
            Key: filename,
            Body: Buffer.from(bufferedImage),
            ContentType: meal.image.type,
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

    meal.image = filename;

    const { data, error } = await supabase.from('meals').insert([meal]);

    if (error) {
        console.error('Error inserting meal into database', error);
        throw new Error('Error inserting meal into database');
    }

    return await getMeals(); //reload the meals
        
}