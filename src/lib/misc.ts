// Copied from server/misc, we want access to these in the client as well for typing reasons.

export interface FinalResult {
    user: string,
    success: boolean,
    error: string,
    achievements: GameAchievements,
}

interface GameAchievements {
    kh1: AssembledAchievement[],
    reCoM: AssembledAchievement[],
    kh2: AssembledAchievement[],
    bbs: AssembledAchievement[],
    fragment: AssembledAchievement[],
    ddd: AssembledAchievement[],
    kh3: AssembledAchievement[],
    remind: AssembledAchievement[]
}

interface AssembledAchievement {
    key: string,
    unlocked: boolean,
    name: string,
    icon: string,
    lockedIcon: string,
    description: string,
}