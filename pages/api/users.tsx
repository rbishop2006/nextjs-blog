import { NextApiRequest, NextApiResponse} from "next";
import fs from 'fs'

const usersHandler = (_:NextApiRequest, res: NextApiResponse) => {
    res.send(JSON.parse(fs.readFileSync('users.json', 'utf8')))
}

export default usersHandler