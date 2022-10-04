import { makeTable } from './dynamo'

export const tableName = process.env.AWS_DYNAMO_TABLE_NAME
const region = process.env.AWS_DYNAMO_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const table = makeTable(tableName, region, accessKeyId, secretAccessKey)

export default table 