import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { Wave } from "@foobar404/wave";
import { IAnimation } from "@foobar404/wave/dist/src/types";

import { Song } from "./Player";

interface PlayerDetailsProps {
	song: Song;
	isPlaying: boolean;
	onEnded: (event:SyntheticEvent<HTMLAudioElement, Event>) => void;
}

function PlayerDetails({ isPlaying, song, onEnded }: PlayerDetailsProps) {
	const audioElement = useRef<HTMLAudioElement>(null);
	let canvasElm = useRef<HTMLCanvasElement | null>(null);

	let [wave, setWave] = useState<Wave | null>(null);

	useEffect(() => {
		if (!canvasElm.current) return;
		if (!audioElement.current) return;
		if (wave) return;

		setWave(new Wave(audioElement.current, canvasElm.current));
		canvasElm.current.style.width = "100%";
		canvasElm.current.style.height = "100%";
		canvasElm.current.width = canvasElm.current.offsetWidth;
		canvasElm.current.height = canvasElm.current.offsetHeight;
	}, [audioElement]);

	function setPreset(preset: number) {
		wave?.clearAnimations();

		if (preset == 0) {
			wave?.addAnimation(
				new wave.animations.Wave({
					lineColor: "white",
					lineWidth: 10,
					fillColor: { gradient: ["#FF9A8B", "#FF6A88", "#FF99AC"] },
					mirroredX: true,
					count: 5,
					rounded: true,
					frequencyBand: "base",
				})
			);
			wave?.addAnimation(
				new wave.animations.Wave({
					lineColor: "white",
					lineWidth: 10,
					fillColor: { gradient: ["#FA8BFF", "#2BD2FF", "#2BFF88"] },
					mirroredX: true,
					count: 60,
					rounded: true,
				})
			);
			wave?.addAnimation(
				new wave.animations.Wave({
					lineColor: "white",
					lineWidth: 10,
					fillColor: { gradient: ["#FBDA61", "#FF5ACD"] },
					mirroredX: true,
					count: 25,
					rounded: true,
					frequencyBand: "highs",
				})
			);
		}
		if (preset == 1) {
			wave?.addAnimation(
				new wave.animations.Cubes({
					bottom: true,
					count: 60,
					cubeHeight: 5,
					fillColor: { gradient: ["#FAD961", "#F76B1C"] },
					lineColor: "rgba(0,0,0,0)",
					radius: 10,
				})
			);
			wave?.addAnimation(
				new wave.animations.Cubes({
					top: true,
					count: 60,
					cubeHeight: 5,
					fillColor: { gradient: ["#FAD961", "#F76B1C"] },
					lineColor: "rgba(0,0,0,0)",
					radius: 10,
				})
			);
			wave?.addAnimation(
				new wave.animations.Circles({
					lineColor: {
						gradient: ["#FAD961", "#FAD961", "#F76B1C"],
						rotate: 90,
					},
					lineWidth: 4,
					diameter: 20,
					count: 10,
					frequencyBand: "base",
				})
			);
		}
		if (preset == 2) {
			wave?.addAnimation(
				new wave.animations.Glob({
					fillColor: {
						gradient: ["#FAD961", "#FAD961", "#F76B1C"],
						rotate: 45,
					},
					lineColor: "white",
					glow: { strength: 15, color: "#FAD961" },
					lineWidth: 10,
					count: 45,
				})
			);
			wave?.addAnimation(
				new wave.animations.Shine({
					lineColor: "#FAD961",
					glow: { strength: 15, color: "#FAD961" },
					diameter: 300,
					lineWidth: 10,
				})
			);
		}
		if (preset == 3) {
			wave?.addAnimation(
				new wave.animations.Square({
					lineColor: { gradient: ["#21D4FD", "#B721FF"] },
				})
			);
			wave?.addAnimation(
				new wave.animations.Arcs({
					lineWidth: 4,
					lineColor: { gradient: ["#21D4FD", "#B721FF"] },
					diameter: 500,
					fillColor: {
						gradient: ["#21D4FD", "#21D4FD", "#B721FF"],
						rotate: 45,
					},
				})
			);
		}
	}

	useEffect(() => {
		if (!wave) return;
		setPreset(0);
	}, [wave]);

	useEffect(() => {
		if (isPlaying) {
			audioElement?.current?.play();
		} else {
			audioElement?.current?.pause();
		}
	}, [isPlaying]);

	return (
		<div className="relative">
			<audio onEnded={onEnded} crossOrigin="anonymous" src={song.src} ref={audioElement}></audio>
			<div className="relative">
				<figure>
					<img height="384" src={song?.coverSrc} alt={song.title} />
				</figure>
				<div className="absolute bottom-0 h-20 w-full">
					<canvas ref={canvasElm}></canvas>
				</div>
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
