import { Parser as ParserFunction, PARSER_METADATA_KEY } from '@app/shared/interceptors/tranformResponse.interceptor';
import { SetMetadata } from '@nestjs/common';

export const Parser = <T = any>(parser: ParserFunction<T>) => SetMetadata(PARSER_METADATA_KEY, parser);
