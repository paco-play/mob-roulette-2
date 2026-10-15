export interface Member {
  id: string
  name: string
  avatarId: string
  colorId: string
  /** In the game (true) or parked on the bench, kept for later (false). */
  active: boolean
}

export interface SavedTeam {
  id: string
  name: string
  memberIds: string[]
}

export interface WheelSegment {
  id: string
  name: string
  avatarId: string
  color: string
  /** 0..1 chance to land in the post-lunch slump; null when not applicable. */
  digestion: number | null
}
