import {
	RewindIcon,
	PauseIcon,
	PlayIcon,
	FastForwardIcon,
} from "@heroicons/react/solid";
import { ShuffleIcon, RepeatIcon } from "~/components/icons";

export interface PlayerControlsProps {
	isPlaying?: Boolean;
	setIsPlaying: (isPlaying: boolean) => void;
	next: () => void;
	back: () => void;
}

function PlayerControls({
	isPlaying,
	setIsPlaying,
	next,
	back,
}: PlayerControlsProps) {
	return (
		<div className="flex justify-center items-center mb-4 gap-2">
			<button
				className="btn btn-circle btn-outline btn-info btn-xs"
				onClick={() => {
					console.log("shuffle");
				}}
			>
				<ShuffleIcon className="h-4 w-4" />
			</button>
			<button
				className="btn btn-circle btn-outline btn-info btn-xs"
				onClick={() => next()}
			>
				<RewindIcon className="h-5 w-5" />
			</button>
			<button
				className="btn btn-circle btn-outline btn-info"
				onClick={() => setIsPlaying(!isPlaying)}
			>
				{isPlaying ? (
					<PauseIcon className="h-5 w-5" />
				) : (
					<PlayIcon className="h-5 w-5" />
				)}
			</button>
			<button
				className="btn btn-circle btn-outline btn-info btn-xs"
				onClick={() => back()}
			>
				<FastForwardIcon className="h-5 w-5" />
			</button>
			<button
				className="btn btn-circle btn-outline btn-info btn-xs"
				onClick={() => {
					console.log("repeat");
				}}
			>
				<RepeatIcon className="h-4 w-4" />
			</button>
		</div>
	);
}

export default PlayerControls;
