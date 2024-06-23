import { env } from "$env/dynamic/private"
import { logger } from "./logger";

const STEAM_API_KEY = env.STEAM_API_KEY;

export const STEAM_API_URL = "http://api.steampowered.com";
export const STEAM_PLAYER_ACHIEVEMENTS_PATH = "ISteamUserStats/GetPlayerAchievements/v0001";
export const STEAM_GET_SCHEMA_FOR_GAME = "ISteamUserStats/GetSchemaForGame/v2";

interface SteamVanityUrlApiResponse {
    response?: {
        steamid: string,
        success: boolean,
    }
}

interface getUserFromNameResult extends SteamVanityUrlApiResponse {
    error?: string,
}

interface SteamApiPlayerAchievementsResponse {
    playerstats?: {
        steamID: string,
        gameName: string,
        achievements: SteamApiPlayerAchievement[],
        success: boolean,
    },
}

interface getPlayerAchievementsResult extends SteamApiPlayerAchievementsResponse {
    error?: string
}

interface SteamApiPlayerAchievement {
    apiname: string,
    achieved: boolean,
    unlocktime: number,
}

interface SteamApiGetSchemaForGameResponse {
    game?: {
        gameName: string,
        gameVersion: string,
        availableGameStats: {
            achievements: SteamApiGetSchemaAchievement[],
            stats: SteamApiGetSchemaStats[],
        },
    },
}

interface getActualGameAchievementsResult extends SteamApiGetSchemaForGameResponse {
    error?: string
}

interface SteamApiGetSchemaAchievement {
    name: string,
    displayName: string,
    description: string,
    icon: string,
    icongray: string,
}

interface SteamApiGetSchemaStats {
    name: string,
    defaultvalue: number,
    displayName: string,
}

export async function getUserFromName(user: string): Promise<getUserFromNameResult> {
    logger.info(`getUserFromName: fetching steamid for steam user ${user}.`);
    let resp: getUserFromNameResult = {
        response: undefined,
        error: undefined,
    };

    await fetch(`${STEAM_API_URL}/ISteamUser/ResolvevanityURL/v0001/?vanityurl=${user}&key=${STEAM_API_KEY}`)
        .then((res) => res.json())
        .then((res: SteamVanityUrlApiResponse) => {
            if (!res.response?.success) {
                resp.error = "Unable to fetch your profile. Is it public? If it is... uh, bother me about it."
            }
            resp.response = res.response;

        })
        .catch((e) => {
            logger.error(`getUserFromName: fetch has thrown: ${e}`);
            resp.error = "Something went wrong. Try again in a bit and if the issue persists let Aravix know.";

        });
    return resp;
}

export async function getPlayerAchievements(appId: string, userId: string): Promise<getPlayerAchievementsResult> {
    logger.info(`getPlayerAchievements: fetching player achievements for game ${appId} with user ${userId}.`);
    let response: getPlayerAchievementsResult = {
        playerstats: undefined,
        error: undefined,
    }

    await fetch(`${STEAM_API_URL}/${STEAM_PLAYER_ACHIEVEMENTS_PATH}/?appid=${appId}&key=${STEAM_API_KEY}&steamid=${userId}`)
        .then(res => res.json())
        .then((res: SteamApiPlayerAchievementsResponse) => {
            response.playerstats = res.playerstats;
        })
        .catch((e) => {
            logger.error(`getPlayerAchievements: fetch has thrown: ${e}`);
            response.error = "Something went wrong. Try again in a bit and if the issue persists let Aravix know.";

        });

    return response;
}

export async function getActualGameAchievements(appId: string): Promise<getActualGameAchievementsResult> {
    logger.info(`getActualGameAchievements: fetching game achievements for game ${appId}.`);
    let response: getActualGameAchievementsResult = {
        game: undefined,
        error: undefined,
    }

    await fetch(`${STEAM_API_URL}/${STEAM_GET_SCHEMA_FOR_GAME}/?appid=${appId}&key=${STEAM_API_KEY}`)
        .then(res => res.json())
        .then((res: SteamApiGetSchemaForGameResponse) => {
            if (res.game) {
                response.game = res.game;
            } else {
                response.error = "Was unable to fetch game data."
            }
        })
        .catch((e) => {
            logger.error(`getPlayerAchievements: fetch has thrown: ${e}`);
            response.error = "Something went wrong. Try again in a bit and if the issue persists let Aravix know.";

        });

    return response;
}