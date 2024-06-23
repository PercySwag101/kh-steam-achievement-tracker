import { steamAchievementNonsense } from "$lib/server/misc";
import type { Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = ({ cookies }) => {
    const steamName = cookies.get("steamname");

    return {
        steamName: steamName ? steamName.toString() : ""
    }
}

export const actions: Actions = {
    default: async ({ request, cookies }) => {
        const formData = await request.formData();
        const steamName = formData.get("steamname");

        if (steamName) {
            cookies.set("steamname", steamName.toString(), { path: "/" });
        }
        const result = await steamAchievementNonsense(steamName ? steamName.toString() : "");

        return result;
    },
};