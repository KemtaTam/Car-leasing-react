import axios from "axios";

export async function sendLeasingData(data: string) {
	const res = await axios.post("https://eoj3r7f3r4ef6v4.m.pipedream.net", data, {
		headers: { "Content-Type": "application/json" },
	});
	return res.data;
}
