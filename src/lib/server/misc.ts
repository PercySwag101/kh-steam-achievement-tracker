import { logger } from "./logger";
import { getActualGameAchievements, getPlayerAchievements, getUserFromName } from "./steamApi";

export const KINGDOM_HEARTS_REMIX_APPID = "2552430";
export const KINGDOM_HEARTS_FINAL_CHAPTER_APPID = "2552440";
export const KINGDOM_HEARTS_3_APPID = "2552450";

export interface AssembledAchievement {
    key: string,
    unlocked: boolean,
    name: string,
    icon: string,
    lockedIcon: string,
    description: string,
}

interface GameResult {
    achievements?: AssembledAchievement[],
    success: boolean,
    error: string,
}

interface FinalResult {
    user: string,
    success: boolean,
    error: string,
    achievements: GameAchievements,
}

interface GameAchievements {
    kh1?: AssembledAchievement[],
    reCoM?: AssembledAchievement[],
    kh2?: AssembledAchievement[],
    bbs?: AssembledAchievement[],
    fragment?: AssembledAchievement[],
    ddd?: AssembledAchievement[],
    kh3?: AssembledAchievement[],
    remind?: AssembledAchievement[]
}

export async function steamAchievementNonsense(user: string) {
    let userId = await getUserFromName(user);

    let result: FinalResult = {
        user,
        success: true,
        error: "",
        achievements: {} as GameAchievements
    };

    if (!userId.error) {
        const khRemixResult = await doAchievementNonsenseForGame(KINGDOM_HEARTS_REMIX_APPID, userId.response?.steamid!);

        if (khRemixResult.success) {
            const finalChapterResult = await doAchievementNonsenseForGame(KINGDOM_HEARTS_FINAL_CHAPTER_APPID, userId.response?.steamid!);
            const kh3Result = await doAchievementNonsenseForGame(KINGDOM_HEARTS_3_APPID, userId.response?.steamid!);

            result.achievements.kh1 = getAchievementsForGame(khRemixResult, 55);
            result.achievements.reCoM = getAchievementsForGame(khRemixResult, 102, 56);
            result.achievements.kh2 = getAchievementsForGame(khRemixResult, 152, 103);
            result.achievements.bbs = getAchievementsForGame(khRemixResult, 197, 153);

            result.achievements.fragment = getAchievementsForGame(finalChapterResult, 15);
            result.achievements.ddd = getAchievementsForGame(finalChapterResult, 69, 16);

            result.achievements.kh3 = getAchievementsForGame(kh3Result, 45);
            result.achievements.remind = getAchievementsForGame(kh3Result, 51, 46);
        } else {
            result.success = false;
            result.error = khRemixResult.error;
        }

    } else {
        result.success = false;
        result.error = userId.error;
    }

    return result;
}

async function doAchievementNonsenseForGame(appId: string, userId: string) {
    const playerAchievements = await getPlayerAchievements(appId, userId);
    const gameAchievements = await getActualGameAchievements(appId);

    let result: GameResult = {
        success: true,
        error: "",
    }

    // TODO: Proper error handling at some point maybe perhaps
    if (playerAchievements.error) {
        result.success = false;
        result.error = playerAchievements.error;
    }

    if (gameAchievements.error) {
        result.success = false;
        result.error = gameAchievements.error;
    }

    let assembled: AssembledAchievement[] = [];
    if (result.success) {
        playerAchievements.playerstats?.achievements?.forEach((achievement) => {
            let gameAchievement = gameAchievements.game?.availableGameStats?.achievements?.find(x => x.name == achievement.apiname);

            if (gameAchievement) {
                assembled.push({
                    key: achievement.apiname,
                    unlocked: achievement.unlocktime === 0 ? false : true,
                    name: gameAchievement.displayName,
                    icon: gameAchievement.icon,
                    lockedIcon: gameAchievement.icongray,
                    description: gameAchievement.description,
                });
            }
        });
    }
    result.achievements = assembled;

    return result;
}

// All of the KH achievements are labelled as "ACH_###". 
// So we can get the achievements for, i.e, KH1FM, by specifying minId = 0, and maxid = 55.
function getAchievementsForGame(gameRes: GameResult, maxId: number, minId = 0) {
    let filtered: AssembledAchievement[] = [];
    gameRes.achievements?.forEach((achievement) => {
        const id = parseInt(achievement.key.split("_")[1]);

        if (id >= minId && id <= maxId) {
            filtered.push(achievement);
        }
    });

    return filtered;
}