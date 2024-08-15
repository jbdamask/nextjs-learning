'use client';

import { useEffect, useState } from 'react';
import S3MealImage from '@/components/images/s3-meal-image';
import classes from './images-slideshow.module.css';

export default function ImageSlideshow() {
  const [meals, setMeals] = useState([]);
  const [currentMeal, setCurrentMeal] = useState(null);

  useEffect(() => {
    async function fetchMeals() {
      try {
        const response = await fetch('/api/meals');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const mealsData = await response.json();
        console.log('Fetched meals:', mealsData);
        setMeals(mealsData);
        setCurrentMeal(mealsData[Math.floor(Math.random() * mealsData.length)]);
      } catch (error) {
        console.error('Failed to fetch meals:', error);
      }
    }

    fetchMeals();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (meals.length > 0) {
        setCurrentMeal(meals[Math.floor(Math.random() * meals.length)]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [meals]);

  if (!currentMeal) {
    return <p>Loading...</p>;
  }

  return (
    <div className={classes.slideshow}>
      <S3MealImage
        src={currentMeal.image}
        alt={currentMeal.title}
        className={classes.active}
        fill
      />
    </div>
  );
}