import { handTypes } from '../enums/handTypes'
import { CardType } from './cardType'

export type PileCardsType = {
  [handTypes.Front]?: CardType,
  [handTypes.Back]?: CardType,
  [handTypes.Left]?: CardType,
  [handTypes.Right]?: CardType,
}
