import { Song } from "./Player";

interface PlayerDetailsProps {
	song: Song;
}

function PlayerDetails({ song }: PlayerDetailsProps) {
	return (
		<div className="relative">
			<div>
				<figure>
					<img src={song?.coverSrc} alt={song.title} />
				</figure>
			</div>
			<div className="range"></div>
			<div className="text-center">
				<h3 className="font-semibold text-xl mb-4">{song.title}</h3>
				<h4 className="font-thin text-xs text-base-300 mb-4">{song.artist}</h4>
				<div className="line"></div>
			</div>
		</div>
	);
}

export default PlayerDetails;
