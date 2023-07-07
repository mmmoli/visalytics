import { IResult, Ok, Fail, ValueObject } from 'types-ddd';

export interface NationProps {
  label: string;
  code: string;
}

export class Nation extends ValueObject<NationProps> {
  private constructor(props: NationProps) {
    super(props);
  }

  public static createFromCode(code: NationProps['code']): IResult<Nation> {
    if (code === 'GBR') {
      return Ok(
        new Nation({
          label: 'United Kingdom',
          code: 'GBR',
        })
      );
    }
    if (code === 'ITA') {
      return Ok(
        new Nation({
          label: 'Italy',
          code: 'ITA',
        })
      );
    }
    return Fail(`Nation with code '${code}' not recognised`);
  }
}

export default Nation;
