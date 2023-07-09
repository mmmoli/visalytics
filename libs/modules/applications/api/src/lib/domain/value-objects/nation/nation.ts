import { IResult, Ok, Fail, ValueObject } from 'types-ddd';
import { countries, Country } from 'countries-list';
import { z } from 'zod';

function zodEnumFromObjKeys<K extends string>(
  obj: Record<K, unknown>
): z.ZodEnum<[K, ...K[]]> {
  const [firstKey, ...otherKeys] = Object.keys(obj) as K[];
  return z.enum([firstKey as K, ...otherKeys], {
    required_error: `Must be one of ${Object.keys(obj).join(', ')}`,
  });
}

export const CountryCodeSchema = zodEnumFromObjKeys(countries);
export type CountryCode = z.infer<typeof CountryCodeSchema>;

export const NationSchema = z.object({
  code: CountryCodeSchema,
});

export type NationProps = z.infer<typeof NationSchema>;

export class Nation extends ValueObject<NationProps> {
  private readonly country: Country;

  private constructor(props: NationProps) {
    super(props);
    this.country = countries[props.code];
  }

  public static override create(props: NationProps): IResult<Nation> {
    const result = NationSchema.safeParse(props);
    if (!result.success) {
      return Fail(result.error.issues[0]?.message ?? 'Could not create Nation');
    }
    return Ok(new Nation(result.data));
  }

  public get name(): string {
    return this.country.name;
  }

  public get emoji(): string {
    return this.country.emoji;
  }
}

export default Nation;
