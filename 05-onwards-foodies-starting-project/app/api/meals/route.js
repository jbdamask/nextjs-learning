import { getMeals } from '@/lib/meals';
import { NextResponse } from 'next/server';

export async function GET() {
  const meals = await getMeals();
  return NextResponse.json(meals);
}