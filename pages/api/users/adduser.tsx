import { NextApiRequest, NextApiResponse} from "next";
import fs from 'fs'
import { User } from "../../users/UserList";

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
        username: 'test username',
        email,
        address: {
            street: "test street",
            suite: "test suite",
            city,
            zipcode: "92998-3874",
            geo: {
                lat: "-37.3159",
                lng: "81.1496"
                }
            },
        phone,
        website,
        company: {
        name: company,
         catchPhrase: "Multi-layered client-server neural-net",
         bs: "harness real-time e-markets"
        }
    }

    const userArr = JSON.parse(fs.readFileSync('users.json', 'utf8'))
    userArr.push(newUser)
    res.status(201).json(newUser)
}

export default addUserHandler
