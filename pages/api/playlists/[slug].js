import { getPlaylist } from "../../../server/dynamo/queries"

import _ from "lodash"

async function get(req, res) {
  const slug = req.query.slug

  const result = await getPlaylist({ slug })

  res.status(200).json({ playlist: result })
}

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await get(req, res)
  } 

  res.status(404).end()
}
