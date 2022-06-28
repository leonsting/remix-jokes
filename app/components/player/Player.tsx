import React, { useState, useRef, useEffect } from "react";
import {
	HeartIcon,
	RefreshIcon,
	SwitchVerticalIcon,
	DotsHorizontalIcon,
} from "@heroicons/react/solid";
import cls from "classnames";
import styles from "./styles.css";

import PlayerDetails from "./PlayerDetails";
import PlayerControls from "./PlayerControls";

export const links = () => [{ rel: "stylesheet", href: styles }];

export interface Song {
	title: string;
	artist: string;
	album: string;
	track: string;
	year: number;
	coverSrc: string;
	src: string;
}

interface PlayerProps {
	className?: string;
	songs: Song[];
	setCurrentSongIndex: React.Dispatch<React.SetStateAction<number>>;
	currentSongIndex: number;
	nextSongIndex: number;
}

export function Player({
	className,
	songs,
	setCurrentSongIndex,
	currentSongIndex,
	nextSongIndex,
}: PlayerProps) {
	const audioElement = useRef<HTMLAudioElement>(null);
	const [isPlaying, setIsPlaying] = useState(false);

	const currentSong = songs[currentSongIndex];
	const nextSong = songs[nextSongIndex];

	useEffect(() => {
		if (isPlaying) {
			audioElement?.current?.play();
		} else {
			audioElement?.current?.pause();
		}
	});

	const SkipSong = (forwards = true) => {
		if (forwards) {
			setCurrentSongIndex(() => {
				let temp = currentSongIndex;
				temp++;

				if (temp > songs.length - 1) {
					temp = 0;
				}

				return temp;
			});
		} else {
			setCurrentSongIndex(() => {
				let temp = currentSongIndex;
				temp--;

				if (temp < 0) {
					temp = songs.length - 1;
				}
				return temp;
			});
		}
	};

	return (
		<div
			className={cls(
				className,
				"card w-96 bg-neutral-content text-black"
			)}
		>
			<div className="p-4">
				<div className="text-2xl font-semibold text-center">
					<strong>Upcoming Song:</strong>
				</div>
				<div className="mt-4 flex flex-row p-1 h-16 items-center">
					<div className="avatar">
						<div className="w-20 mask mask-hexagon">
							<img
								src={nextSong?.coverSrc}
								alt={nextSong?.title}
							/>
						</div>
					</div>
					<p>
						<span className="font-bold mx-2" data-text-highlight>
							{nextSong?.title}
						</span>
						by
						<span className="font-bold mx-2" data-text-highlight>
							{nextSong?.artist}
						</span>
					</p>
				</div>
			</div>
			<div className="mt-4 mx-auto max-w-md">
				<audio src={currentSong.src} ref={audioElement}></audio>
				<PlayerDetails song={currentSong} />
				<PlayerControls
					isPlaying={isPlaying}
					setIsPlaying={setIsPlaying}
					skipSong={SkipSong}
				/>
				<div className="flex justify-between pt-2 px-4 pb-4 text-primary">
					<a href="#" className="btn glass text-primary btn-xs">
						<HeartIcon className="w-5 h-5" />
					</a>
					<a href="#" className="btn glass text-primary btn-xs">
						<SwitchVerticalIcon className="w-5 h-5" />
					</a>
					<a href="#" className="btn glass text-primary btn-xs">
						<RefreshIcon className="w-5 h-5" />
					</a>
					<a href="#" className="btn glass text-primary btn-xs">
						<DotsHorizontalIcon className="w-5 h-5" />
					</a>
				</div>
			</div>
		</div>
	);
}
