export function fluidType(minWidth: number, maxWidth: number, minFontSize: number, maxFontSize: number): string {
  return `calc(${minFontSize}px + (${maxFontSize} - ${minFontSize}) * ((100vw - ${minWidth}px) / (${maxWidth} - ${minWidth})))`;
}
