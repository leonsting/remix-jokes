import { useEffect, useState } from "react";
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
