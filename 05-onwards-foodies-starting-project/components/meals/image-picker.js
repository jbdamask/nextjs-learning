// remember this
'use client';

import { Button } from '@mui/material';
import { useRef, useState } from 'react';
import Image from 'next/image';

import classes from './image-picker.module.css';

export default function ImagePicker({label, name}) {
    const [image, setImage] = useState(null);
    const imageInput = useRef();

    function handleImageChange(event) {
        const file = event.target.files[0];
        if(!file) {
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        }
        reader.readAsDataURL(file);

    }

    function handleUploadPicture() {
        imageInput.current.click();
    }
    return (
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={classes.controls}>  
                <div className={classes.preview}>
                    {!image && <p>upload baby</p>}
                    {image && 
                    <Image 
                        src={image} 
                        alt="Your image" 
                        fill 
                    />}
                </div>
                <input 
                    className={classes.input}
                    type="file" 
                    id={name}
                    name={name} 
                    accept="image/png, image/jpeg" 
                    ref={imageInput}
                    onChange={handleImageChange}
                    required
                />
                <Button variant="contained" component="span" onClick={handleUploadPicture}>
                    Pick an image
                </Button>
            </div>

        </div>
    );
}