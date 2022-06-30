import { useMemo } from "react";

function usePlayerDuration(audio?: HTMLAudioElement | null) {
	const duration = useMemo(() => {
		if (!audio) return "0:00";

        console.log("audio", audio.duration, audio)
		const minutes = Math.floor(audio.duration / 60);
		const seconds = Math.floor(audio.duration % 60);
		const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
		return `${minutes}:${returnedSeconds}`;
	}, [audio]);
	return duration;
}

export default usePlayerDuration;
