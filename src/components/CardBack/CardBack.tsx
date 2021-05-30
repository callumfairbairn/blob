import React, { useContext, useEffect, useRef } from 'react'
import './CardBack.scss'
import { AppContext } from '../../AppContext/AppContext'

export const CardBack = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { cardBackDiamondNumber, cardBackColoursIndex, colourSets } = useContext(AppContext)
  const [ backgroundColour, diamondColour1, diamondColour2 ] = colourSets[cardBackColoursIndex]

  const fillBackground = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    ctx.fillStyle = backgroundColour;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(canvas.width, 0);
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.fill();
  }

  const fillDiamond = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, x: number, y: number) => {
    const diamondWidth = canvas.width / cardBackDiamondNumber
    const diamondHeight = canvas.height / cardBackDiamondNumber
    const xOffset = x * diamondWidth
    const yOffset = y * diamondHeight

    ctx.fillStyle = (x + y) % 2 === 0 ? diamondColour1 : diamondColour2 ;
    ctx.beginPath();
    ctx.moveTo(xOffset, yOffset + diamondHeight / 2);
    ctx.lineTo(xOffset + diamondWidth / 2, yOffset);
    ctx.lineTo(xOffset + diamondWidth, yOffset + diamondHeight / 2);
    ctx.lineTo(xOffset + diamondWidth / 2, yOffset + diamondHeight);
    ctx.fill();
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d');
    if (ctx && canvas) {
      fillBackground(ctx, canvas)
      for (let x = 0; x < cardBackDiamondNumber; x++) {
        for (let y = 0; y < cardBackDiamondNumber; y++) {
          fillDiamond(ctx, canvas, x, y);
        }
      }
    }
  })

  return (
    <div className="cardBack">
      <canvas className="cardBackCanvas" id="canvas" ref={canvasRef}/>
    </div>
  )
}