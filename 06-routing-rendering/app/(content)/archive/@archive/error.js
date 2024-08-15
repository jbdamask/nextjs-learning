'use client'

export default function Error({error}) {
    return <p>An error occurred: {error.message}</p>;
}