import { NextApiRequest, NextApiResponse} from "next";
import fs from 'fs'
import { User } from '../../users/UserList'

const userHandler = ({query: { id }}: { query: {id: string} }, res: NextApiResponse) => {
    const users = JSON.parse(fs.readFileSync('users.json', 'utf8'))
    const filtered = users.filter((p:User ) => p.id === parseInt(id))

    if(filtered.length > 0){
        res.status(200).json(filtered[0])
    } else {
        res.status(404).json({message: `User with id: ${id} not found`})
    }
}

export default userHandler