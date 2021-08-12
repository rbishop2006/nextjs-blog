import { NextApiRequest, NextApiResponse} from "next";
import fs from 'fs'
import { User } from "../../users/UserList"

const deleteUserHandler = (req:NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'DELETE') {
        res.status(400).send({ message: 'Only DELETE requests allowed' })
        return
    }
    const { userId } = req.body
    let userArr = []
    fs.readFile('users.json', 'utf8', function readFileCallback(err, users){
        if (err){
            console.log(err)
        } else {
            userArr = JSON.parse(users)
            userArr = userArr.filter((u: User) => u.id !== parseInt(userId))
            const userArrJSON = JSON.stringify(userArr)
            const noop = () => {}
            fs.writeFile('users.json', userArrJSON, 'utf8', noop);

        }});
        res.status(201).send(`The user with id:${userId} has been removed from the user list`)
}

export default deleteUserHandler