import { IAdapter, IResult, Ok } from 'types-ddd';
import { Nation } from '../value-objects';

export interface NationModel {
  code: string;
  flag: string;
  name: string;
}

export class NationToInfraAdapter implements IAdapter<Nation, NationModel> {
  build(input: Nation): IResult<NationModel, string> {
    return Ok({
      code: input.get('code'),
      flag: input.emoji,
      name: input.name,
    });
  }
}
