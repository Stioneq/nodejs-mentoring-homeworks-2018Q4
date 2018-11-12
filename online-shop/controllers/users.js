import { users } from "../models";

export function getAll (req, res) {
    res.json(users);
}