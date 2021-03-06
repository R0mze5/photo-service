import path from 'path';

// eslint-disable-next-line import/no-extraneous-dependencies
import { makeExecutableSchema } from '@graphql-tools/schema';

// eslint-disable-next-line import/no-extraneous-dependencies
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';

const allTypes = loadFilesSync(path.join(__dirname, './api/**/*.graphql'));
const allResolvers = loadFilesSync(path.join(__dirname, './api/**/*.ts'));

const schema: any = makeExecutableSchema({
  typeDefs: mergeTypeDefs(allTypes),
  resolvers: mergeResolvers(allResolvers),
});

export default schema;
