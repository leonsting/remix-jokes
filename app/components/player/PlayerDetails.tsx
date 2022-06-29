import { useEffect, useRef, useState } from "react";
import { Song } from "./Player";

interface PlayerDetailsProps {
	song: Song;
	isPlaying: boolean;
}

function PlayerDetails({ isPlaying, song }: PlayerDetailsProps) {
	const audioElement = useRef<HTMLAudioElement>(null);

	useEffect(() => {
		if (isPlaying) {
			audioElement?.current?.play();
		} else {
			audioElement?.current?.pause();
		}
	}, [isPlaying]);

	return (
		<div className="relative">
			<audio src={song.src} ref={audioElement}></audio>
			<div>
				<figure>
					<img height="384" src={song?.coverSrc} alt={song.title} />
				</figure>
			</div>
			<div className="range"></div>
			<div className="text-center">
				<h3 className="font-semibold text-xl mb-4">{song.title}</h3>
				<h4 className="font-thin text-xs text-base-300 mb-4">
					{song.artist}
				</h4>
				<div className="line"></div>
			</div>
		</div>
	);
}

export default PlayerDetails;
