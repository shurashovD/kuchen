import { IOriginConfig, OrthoCoord, PolarCoord } from 'src/types'

export function pointOrthoToPolar({ x, y }: OrthoCoord): PolarCoord {
  const r = Math.hypot(x, y)
  const alpha = r === 0 ? 0 : Math.atan2(y, x)

  return { alpha, r }
}

export function pointPolarToOrtho({ alpha, r }: PolarCoord): OrthoCoord {
  const x = r * Math.cos(alpha)
  const y = r * Math.sin(alpha)

  return { x, y }
}

function pointPolarScale(polarCoord: PolarCoord, scale: number): PolarCoord {
  const r = polarCoord.r * scale

  return { ...polarCoord, r }
}

export function pointPolarRotateRad(polarCoord: PolarCoord, rotateRad: number): PolarCoord {
  const alpha = polarCoord.alpha + rotateRad

  return { ...polarCoord, alpha }
}

export function pointOrthoTranslate(
  ortoCoord: OrthoCoord,
  translateX: number,
  translateY: number,
): OrthoCoord {
  const x = ortoCoord.x + translateX
  const y = ortoCoord.y + translateY

  return { x, y }
}

function changePointOrigin(
  polarCoord: PolarCoord,
  rotateRad: number,
  scale: number,
  translateX: number,
  translateY: number,
): OrthoCoord {
  const rotated = pointPolarRotateRad(polarCoord, rotateRad)
  const scaled = pointPolarScale(rotated, scale)
  const ortho = pointPolarToOrtho(scaled)
  return pointOrthoTranslate(ortho, translateX, translateY)
}

function changeSystemOrigin(
  polarCoords: PolarCoord[],
  rotateRad: number,
  scale: number,
  translateX: number,
  translateY: number,
): OrthoCoord[] {
  return polarCoords.map(item => {
    const { alpha, r, ...result } = item
    return { ...result, ...changePointOrigin(item, rotateRad, scale, translateX, translateY) }
  })
}

export function changeOriginPolarPoints(origin: IOriginConfig, points: PolarCoord[]) {
  const { coordsOriginTranslateX, coordsOriginTranslateY, scale, rotateRad } = origin

  return changeSystemOrigin(
    points,
    rotateRad,
    scale,
    coordsOriginTranslateX,
    coordsOriginTranslateY,
  )
}

export function scaleOrthoPoints(points: OrthoCoord[], scale: number) {
  return points.map<OrthoCoord>(item => {
    const polarPoint = pointOrthoToPolar(item)
    const scaledPolarPoint = pointPolarScale(polarPoint, scale)

    return pointPolarToOrtho(scaledPolarPoint)
  })
}

export function fromGlobalToLocalOrigin(
  orthoCoords: OrthoCoord[],
  origin: IOriginConfig,
): OrthoCoord[] {
  const translateX = -origin.coordsOriginTranslateX
  const translateY = -origin.coordsOriginTranslateY
  const rotateRad = -origin.rotateRad
  const scale = 1 / origin.scale

  return orthoCoords
    .map(item => pointOrthoTranslate(item, translateX, translateY)) // сместить начало координат из ГК в ЛК;
    .map(pointOrthoToPolar) // перейти в полярную СК;
    .map(item => pointPolarRotateRad(item, rotateRad)) // повернуть на -угол поворота ЛК относительно ГК;
    .map(item => pointPolarScale(item, scale)) // применить масштабирование;
    .map(pointPolarToOrtho) // перейти в декартову СК;
}
