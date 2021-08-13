import {NextApiRequest, NextApiResponse} from "next";
import fs from 'fs'
import {User} from "../../users/UserList"

const deleteUserHandler = (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'DELETE') {
        res.status(400).send({message: 'Only DELETE requests allowed'})
        return
    }
    const {userId} = req.body

    fs.readFile('users.json', 'utf8', function readFileCallback(err, users) {
        if (err) {
            console.log(err)
        } else {
            const userArr = JSON.parse(users)
            const filteredUserArr = userArr.filter((u: User) => u.id !== parseInt(userId))
            const filteredUserArrJSON = JSON.stringify(filteredUserArr)
            const noop = () => {
            }
            fs.writeFile('users.json', filteredUserArrJSON, 'utf8', noop);

        }
    });
    res.status(201).end()
}

export default deleteUserHandler