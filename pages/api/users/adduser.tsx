import { NextApiRequest, NextApiResponse} from "next";
import fs from 'fs'
import { User } from "../../users/UserList"

const addUserHandler = (req:NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        res.status(400).send({ message: 'Only POST requests allowed' })
        return
    }

    const user = req.body
    const { name, company, website, city, email, phone } = user
    const newUser:User = {
        id: Date.now(),
        name,
        email,
        address: {
            city,
        },
        phone,
        website,
        company: {
            name: company,
        }
    }

    fs.readFile('users.json', 'utf8', function readFileCallback(err, users){
        if (err){
            console.log(err)
        } else {
            const userArr = JSON.parse(users)
            userArr.push(newUser)
            const userArrJSON = JSON.stringify(userArr)
            const noop = () => {}
            fs.writeFile('users.json', userArrJSON, 'utf8', noop);
        }});
    res.status(201).send(newUser)
}

export default addUserHandler

