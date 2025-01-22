import { type SchemaTypeDefinition } from 'sanity'

import {categoryType} from './categoryType'
import { product } from './products'
import { order } from './order'
import { blockContentType } from './blockContentType'
import { sales } from './sales'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, categoryType ,order,blockContentType, sales],
}
