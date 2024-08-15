'use client'
import { Button } from '@mui/material';
import { useFormStatus } from 'react-dom';

export default function MealsFormSubmit() {
    const {pending} = useFormStatus();
    return <Button disabled={pending} type="submit">
        {pending ? 'Submitting...' : 'Share Meal'}
    </Button>;
} 