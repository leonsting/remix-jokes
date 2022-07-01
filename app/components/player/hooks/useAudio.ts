import { useEffect, useRef, useState } from "react";

export function useAudio(
	audioElement: React.MutableRefObject<HTMLAudioElement | null>,
	onListen?: Function
): [number, Function, Function, (time: number) => void] {
	const [timePlaying, setTimePlaying] = useState(0);
	let listenTracker = useRef<NodeJS.Timer>();

	const play = () => {
		if (audioElement.current) {
			audioElement.current.play();
			startListenTrack();
		}
	};

	const pause = () => {
		if (audioElement.current) {
			audioElement.current.pause();
			clearListenTrack();
		}
	};

	const goto = (time: number) => {
		if (audioElement.current && time) {
			const duration = audioElement.current.duration;
			audioElement.current.currentTime = time / (100 / duration);
			setTimePlaying(audioElement.current.currentTime);
		}
	};

	const startListenTrack = () => {
		if (!listenTracker.current) {
			listenTracker.current = setInterval(() => {
				if (audioElement.current) {
					setTimePlaying(audioElement.current.currentTime);
					onListen?.(audioElement.current.currentTime);
				}
			}, 1000);
		}
	};

	const clearListenTrack = () => {
		if (listenTracker?.current) {
			clearInterval(listenTracker.current);
		}
	};

	useEffect(() => {
		return () => {
			clearListenTrack();
		};
	}, []);

	return [timePlaying, play, pause, goto];
}
