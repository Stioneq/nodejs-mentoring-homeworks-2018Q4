import * as _ from 'lodash';
import { products } from '../models';
import debug from 'debug';

const log = debug('server:controllers:api:products');

export function getAll (req, res) {
    log('request products');
    res.json(products);
}

export function getOne (req, res) {
    log('request product with id=%d', req.params.id);
    const product = _.find(products, {id: +req.params.id});
    if(product){
        res.json(product);
    }else{
        res.status(404).send('Cannot find requested resource');
    }
}

export function getOneReviews (req, res) {
    log('request product\'s review with id=%d', req.params.id);
    const product = _.find(products, {id: +req.params.id});
    if(product){
        res.json(product.reviews);
    }else{
        res.status(404).send('Cannot find requested resource');
    }
}

export function addOne (req, res) {
    log('add product %j', req.body);
    products.push(req.body);
    res.status(201).end();
}