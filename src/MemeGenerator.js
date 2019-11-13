import React, { useState, useEffect } from 'react';

export default function MemeGenerator() {
	const [ fields, setFields ] = useState('');
	const [ randomImg, setRandomImg ] = useState('http://i.imgflip.com/1bij.jpg');
	const [ allMemeImgs, setAllMemeImgs ] = useState([]);

	useEffect(() => {
		fetch('https://api.imgflip.com/get_memes')
			.then((res) => res.json())
			.then((results) => setAllMemeImgs(results.data.memes));
	}, []);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFields({ ...fields, [name]: value });
		console.log(fields);
	};

	const generateImg = (e) => {
		e.preventDefault();
		const randomNum = Math.floor(Math.random() * 100);
		setRandomImg(allMemeImgs[randomNum].url);
	};

	return (
		<div>
			<form className="meme-form">
				<input
					type="text"
					name="topText"
					value={fields.name}
					onChange={handleChange}
					placeholder="Top Meme Text"
				/>
				<input
					type="text"
					name="bottomText"
					value={fields.name}
					onChange={handleChange}
					placeholder="Bottom Meme Text"
				/>
				<button onClick={generateImg}>Generate</button>
			</form>

			<div className="meme">
				<img src={randomImg} alt="Random Meme" />
				<h2 className="top">{fields.topText}</h2>
				<h2 className="bottom">{fields.bottomText}</h2>
			</div>
		</div>
	);
}
