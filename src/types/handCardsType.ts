import { handTypes } from '../enums/handTypes'
import { CardType } from './cardType'

export type HandCardsType = {
  [handTypes.Front]: CardType[],
  [handTypes.Back]: CardType[],
  [handTypes.Left]: CardType[],
  [handTypes.Right]: CardType[],
}