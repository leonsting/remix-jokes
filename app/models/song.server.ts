import { db } from "~/utils/db.server";

export type { Song } from "@prisma/client";

export async function getSongs() {
	return db.song.findMany();
}
