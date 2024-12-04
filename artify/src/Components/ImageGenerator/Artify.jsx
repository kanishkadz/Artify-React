import React, { useRef, useState } from 'react';
import './Artify.css';
import default_image from '../Assets/default_image.svg';

function Artify() {
    const [image_url, setImage_url] = useState("/");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    let inputRef = useRef(null);

    const imageGenerator = async () => {
        const prompt = inputRef.current.value.trim();
        if (!prompt) {
            setError("Prompt cannot be empty.");
            return;
        }
        setError(null); // Clear previous errors
        setLoading(true);
    
        try {
            const response = await fetch(
                "https://api.openai.com/v1/images/generations",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer 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",
                        "User-Agent": "Chrome",
                    },
                    body: JSON.stringify({
                        prompt,
                        n: 1,
                        size: "512x512",
                    }),
                }
            );
    
            if (!response.ok) {
                const errorText = await response.text(); // Fetch error details
                throw new Error(`API error: ${response.status} ${response.statusText}. Details: ${errorText}`);
            }
    
            const data = await response.json();
            if (!data || !data.data || !data.data[0] || !data.data[0].url) {
                throw new Error("Unexpected API response format.");
            }
    
            setImage_url(data.data[0].url);
        } catch (err) {
            console.error("Error generating image:", err); // Log full error details
            setError(err.message || "An error occurred while generating the image.");
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="artify">
            <div className="header">
                <span>Artify</span>, AI image generator
            </div>
            <div className="img-loading">
                <div className="image">
                    <img
                        src={image_url === "/" ? default_image : image_url}
                        alt="Generated"
                    />
                </div>
                <div className="loading">
                    <div className={loading ? "loading-bar-full" : "loading-bar"}></div>
                    <div className={loading ? "loading" : "display-none"}>Loading...</div>
                </div>
                {error && <div className="error">{error}</div>}
            </div>
            <div className="search-box">
                <input
                    type="text"
                    ref={inputRef}
                    className="search-input"
                    placeholder="What do you want to see?"
                />
                <div className="generate-btn" onClick={imageGenerator}>
                    Generate
                </div>
            </div>
        </div>
    );
}

export default Artify;
