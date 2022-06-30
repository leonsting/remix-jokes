import { useEffect, useRef, useState } from "react";
import { Wave } from "@foobar404/wave";

export function useAudioWave(
	audioElement: React.MutableRefObject<HTMLAudioElement | null>,
	canvasElement: React.MutableRefObject<HTMLCanvasElement | null>
): [Wave | null, React.Dispatch<React.SetStateAction<Wave | null>>] {
	const [wave, setWave] = useState<Wave | null>(null);

	useEffect(() => {
		if (!canvasElement?.current) return;
		if (!audioElement?.current) return;
		if (wave) return;
		setWave(new Wave(audioElement.current, canvasElement.current));
		canvasElement.current.style.width = "100%";
		canvasElement.current.style.height = "100%";
		canvasElement.current.width = canvasElement.current.offsetWidth;
		canvasElement.current.height = canvasElement.current.offsetHeight;
	}, [audioElement]);

	return [wave, setWave];
}

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
