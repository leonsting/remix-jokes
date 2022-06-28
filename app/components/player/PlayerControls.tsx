import {
	RewindIcon,
	PauseIcon,
	PlayIcon,
	FastForwardIcon,
} from "@heroicons/react/solid";

export interface PlayerControlsProps {
	isPlaying?: Boolean;
	skipSong: (skipSong?: boolean) => void;
	setIsPlaying: (isPlaying: boolean) => void;
}

function PlayerControls(props: PlayerControlsProps) {
	return (
		<div className="flex justify-center items-center mb-4 gap-2">
			<button
				className="btn btn-circle btn-outline btn-info btn-xs"
				onClick={() => props.skipSong(false)}
			>
				<RewindIcon className="h-5 w-5" />
			</button>
			<button
				className="btn btn-circle btn-outline btn-info"
				onClick={() => props.setIsPlaying(!props.isPlaying)}
			>
				{props.isPlaying ? (
					<PauseIcon className="h-5 w-5" />
				) : (
					<PlayIcon className="h-5 w-5" />
				)}
			</button>
			<button
				className="btn btn-circle btn-outline btn-info btn-xs"
				onClick={() => props.skipSong()}
			>
				<FastForwardIcon className="h-5 w-5" />
			</button>
		</div>
	);
}

export default PlayerControls;
