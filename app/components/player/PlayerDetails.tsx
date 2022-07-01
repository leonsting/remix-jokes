import {
	SyntheticEvent,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import type { Song } from "@prisma/client";

import { useAudioWave, useAudio } from "./hooks";
import { calculateDurationDisplay, presetWave } from "./utils";

interface PlayerDetailsProps {
	song: Song;
	isPlaying: boolean;
	onEnded: (event: SyntheticEvent<HTMLAudioElement, Event>) => void;
}

function PlayerDetails({ isPlaying, song, onEnded }: PlayerDetailsProps) {
	const audioElement = useRef<HTMLAudioElement>(null);
	const canvasElement = useRef<HTMLCanvasElement | null>(null);
	const [wave] = useAudioWave(audioElement, canvasElement);

	const [time, play, pause, goto] = useAudio(audioElement);

	const currentDurationDisplay = calculateDurationDisplay(time);
	const durationDisplay = calculateDurationDisplay(
		audioElement?.current?.duration
	);

	const seekerValue = useMemo(() => {
		if (!audioElement?.current?.duration) return 0;
		return time / (audioElement?.current?.duration / 100);
	}, [time, audioElement]);

	useEffect(() => {
		if (!wave) return;
		presetWave(wave, 0);
	}, [wave]);

	useEffect(() => {
		if (isPlaying) {
			play();
		} else {
			pause();
		}
	}, [isPlaying]);

	return (
		<div className="relative">
			<audio
				key={song.src}
				onEnded={onEnded}
				crossOrigin="anonymous"
				src={song.src}
				ref={audioElement}
			></audio>
			<div className="relative">
				<figure>
					<img height="384" src={song?.coverSrc} alt={song.title} />
				</figure>
				<div className="absolute bottom-0 h-20 w-full">
					<canvas ref={canvasElement}></canvas>
				</div>
			</div>
			<div className="flex flex-row items-center justify-center gap-2 px-2 mt-2">
				<span id="current-time" className="time">
					{currentDurationDisplay}
				</span>
				<input
					type="range"
					className="range range-primary range-xs bg-secondary grow"
					max="100"
					value={seekerValue}
					onChange={(event) => {
						if (event.target.value) {
							goto(+event.target.value);
						}
					}}
				/>
				<span id="duration" className="time">
					{durationDisplay}
				</span>
			</div>
			<div className="text-center">
				<h3 className="font-semibold text-xl my-4" data-text-highlight>{song.title}</h3>
				<h4 className="font-thin text-xs text-base-300 mb-4">
					{song.artist}
				</h4>
				<div className="line"></div>
			</div>
		</div>
	);
}

export default PlayerDetails;
