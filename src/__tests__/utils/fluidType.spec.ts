import { fluidType } from 'src/utils/fluidType';

describe('fluidType', () => {
  it('returns css calc string', () => {
    const minWidth = 300;
    const maxWidth = 1920;
    const minFontSize = 16;
    const maxFontSize = 72;
    const result = `calc(${minFontSize}px + (${maxFontSize} - ${minFontSize}) * ((100vw - ${minWidth}px) / (${maxWidth} - ${minWidth})))`;
    expect(fluidType(minWidth, maxWidth, minFontSize, maxFontSize)).toBe(result);
  });
});
