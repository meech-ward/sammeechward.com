import { makeTable } from './dynamo'

const tableName = process.env.MY_AWS_DYNAMO_TABLE_NAME
const region = process.env.MY_AWS_DYNAMO_REGION
const accessKeyId = process.env.MY_AWS_ACCESS_KEY
const secretAccessKey = process.env.MY_AWS_SECRET_ACCESS_KEY

const table = makeTable(tableName, region, accessKeyId, secretAccessKey)

export default {...table, tableName}