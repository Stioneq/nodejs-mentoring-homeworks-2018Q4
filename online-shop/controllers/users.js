import { User } from "../models";

export function getAll (req, res) {
    User.findAll().then(u => {
        res.json(u);
    });
}