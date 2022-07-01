import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
	await Promise.all(
		getJokes().map((joke) => {
			return db.joke.create({ data: joke });
		})
	);

	await Promise.all(
		getSongs().map((songs) => {
			return db.song.create({ data: songs });
		})
	);
}

seed();

function getJokes() {
	// shout-out to https://icanhazdadjoke.com/

	return [
		{
			name: "Road worker",
			content: `I never wanted to believe that my Dad was stealing from his job as a road worker. But when I got home, all the signs were there.`,
		},
		{
			name: "Frisbee",
			content: `I was wondering why the frisbee was getting bigger, then it hit me.`,
		},
		{
			name: "Trees",
			content: `Why do trees seem suspicious on sunny days? Dunno, they're just a bit shady.`,
		},
		{
			name: "Skeletons",
			content: `Why don't skeletons ride roller coasters? They don't have the stomach for it.`,
		},
		{
			name: "Hippos",
			content: `Why don't you find hippopotamuses hiding in trees? They're really good at it.`,
		},
		{
			name: "Dinner",
			content: `What did one plate say to the other plate? Dinner is on me!`,
		},
		{
			name: "Elevator",
			content: `My first time using an elevator was an uplifting experience. The second time let me down.`,
		},
	];
}

export function getSongs() {
	return [
		{
			title: "Vì mẹ anh bắt chia tay",
			artist: "Miu Lê x Karik",
			album: "Vì mẹ anh bắt chia tay(Single)",
			track: "Nhạc Điên Khùng",
			year: 2022,
			coverSrc:
				"https://res.cloudinary.com/leonsting/image/upload/v1656430616/taverse/audio_cover/vmabct_huwbfp.jpg",
			src: "https://res.cloudinary.com/leonsting/video/upload/v1656430319/taverse/audio/vmabct_j6658m.mp3",
		},
		{
			title: "Thiêu Thân",
			artist: "B Ray x Sofia",
			album: "Thiêu Thân(Single)",
			track: "Nhạc Điên Khùng",
			year: 2022,
			coverSrc:
				"https://res.cloudinary.com/leonsting/image/upload/v1656430616/taverse/audio_cover/tt_kylfbs.jpg",
			src: "https://res.cloudinary.com/leonsting/video/upload/v1656430321/taverse/audio/tt_c2231a.mp3",
		},
		{
			title: "Shay Nắnggg",
			artist: "AMee x Obito",
			album: "Shay Nắnggg (Single)",
			track: "Nhạc Điên Khùng",
			year: 2022,
			coverSrc:
				"https://res.cloudinary.com/leonsting/image/upload/v1656480659/taverse/audio_cover/Shay_Nanggg_ue7uco.jpg",
			src: "https://res.cloudinary.com/leonsting/video/upload/v1656480723/taverse/audio/Shay_Nanggg_uu4z76.mp3",
		},
		{
			title: "Anh Vẫn Thấy",
			artist: "Trọng Hiếu",
			album: "Anh Vẫn Thấy (Single)",
			track: "Nhạc Điên Khùng",
			year: 2022,
			coverSrc:
				"https://res.cloudinary.com/leonsting/image/upload/v1656657426/taverse/audio_cover/anh_van_thay_ltfwe5.jpg",
			src: "https://res.cloudinary.com/leonsting/video/upload/v1656657531/taverse/audio/anh_van_thay_iknvp0.mp3",
		},
		{
			title: "Một Ngàn Nỗi Đau",
			artist: "Văn Mai Hương; Hứa Kim Tuyền",
			album: "Một Ngàn Nỗi Đau (Single)",
			track: "Nhạc Điên Khùng",
			year: 2022,
			coverSrc:
				"https://res.cloudinary.com/leonsting/image/upload/v1656663478/taverse/audio_cover/mot_ngan_noi_dau_v0jysu.jpg",
			src: "https://res.cloudinary.com/leonsting/video/upload/v1656663491/taverse/audio/mot_ngan_noi_dau_j1cr6h.mp3",
		},
		{
			title: "Chưa Quên Người Yêu Cũ (Lofi)",
			artist: "Hà Nhi; Hứa Kim Tuyền",
			album: "Chưa Quên Người Yêu Cũ (Lofi) (Single)",
			track: "Nhạc Điên Khùng",
			year: 2022,
			coverSrc:
				"https://res.cloudinary.com/leonsting/image/upload/v1656663753/taverse/audio_cover/chua_quen_nguoi_yeu_cu_d7ucaq.jpg",
			src: "https://res.cloudinary.com/leonsting/video/upload/v1656664079/taverse/audio/chua_quen_nguoi_yeu_cu_ibhrrt.mp3",
		},
	];
}
