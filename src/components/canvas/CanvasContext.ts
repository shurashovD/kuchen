import { createContext } from "react";

type CanvasContextType = {
    canvas: fabric.Canvas | null
}

export const CanvasContext = createContext<CanvasContextType>({ canvas: null })