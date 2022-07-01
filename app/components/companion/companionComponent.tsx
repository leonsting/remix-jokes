import {
	ChevronLeftIcon,
	ChevronRightIcon,
	RewindIcon,
	PauseIcon,
	PlayIcon,
	FastForwardIcon,
	DotsHorizontalIcon,
} from "@heroicons/react/solid";
import { useState } from "react";
import cls from "classnames";

export function CompanionComponent({
	defaultShow,
	children,
}: {
	defaultShow?: boolean;
	children?: React.ReactNode;
}) {
	const [show, setShow] = useState(defaultShow);
	return (
		<div
			data-testid="companion"
			className={cls(
				"flex fixed flex-row top-[7.5rem] items-stretch left-0 z-10 ease-in-out duration-500",
				show ? "translate-x-0" : "translate-x-[-24rem]"
			)}
		>
			<div className="max-w-md">{children}</div>
			<div className="group flex items-center relative flex-col gap-2 self-center p-2 my-6 w-14 rounded-r-md border border-primary-focus bg-primary">
				<button
					aria-label="Close summary"
					className="btn btn-square btn-outline btn-xs"
					onClick={() => {
						setShow && setShow(!show);
					}}
				>
					{show ? <ChevronLeftIcon /> : <ChevronRightIcon />}
				</button>
				<button
					aria-label="Upvote"
					className="btn btn-square glass btn-xs"
				>
					<RewindIcon />
				</button>
				<button
					aria-label="Add comment"
					className="btn btn-square glass btn-xs"
				>
					<PlayIcon />
				</button>
				<button
					aria-label="Bookmark"
					aria-pressed="false"
					className="btn btn-square glass btn-xs"
				>
					<FastForwardIcon />
				</button>
				<button
					aria-label="More options"
					className="btn btn-square glass btn-xs"
				>
					<DotsHorizontalIcon />
				</button>
			</div>
		</div>
	);
}
