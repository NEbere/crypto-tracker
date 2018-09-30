// Third party imports
const router = require('express').Router()
const lodash = require('lodash')

// Local imports
const config = require('../utils/config.json')
const {
  getHttpRequestPromise
} = require('../utils/services')

/**
 * Health check endpoint: Used to run a health check on ther server endpoints
 */
router.get('/_health', (req, res) => {
  res.status(200).send({ message: 'ok' })
})

/**
 * GET all product shared between the provided exchanges,['BNB', 'BTX', 'BFX']
 */
router.get('/products', (req, res) => {
  const promises = config.EXCHANGES.map((exchange) => {
    const options = {
      host: config.BASE_URL,
      method: 'GET',
      path: `/api/exchanges/${exchange}/products`,
      headers: {
        'Authorization': `Bearer ${config.MONEEDA_TOKEN}`
      }
    }

    return getHttpRequestPromise(options)
  })

  // Resolve all promises
  Promise.all(promises)
    .then(result => {
      const productsIntersection = lodash.intersectionBy(...result, 'id')
      res.send({ products: productsIntersection })
    }).catch(error => {
      res.send({ error: error })
    })
})

/**
 * GET the prices for a product on all provided exchanges, ['BNB', 'BTX', 'BFX']
 */
router.get('/products/:PRODUCT/prices', (req, res) => {
  const product = req.params.PRODUCT
  const promises = config.EXCHANGES.map((exchange) => {
    const options = {
      host: config.BASE_URL,
      method: 'GET',
      path: `/api/exchanges/${exchange}/ticker?product=${product}`,
      headers: {
        'Authorization': `Bearer ${config.MONEEDA_TOKEN}`
      }
    }

    return getHttpRequestPromise(options)
  })

  Promise.all(promises)
    .then(result => {
      const response = []
      config.EXCHANGES.forEach((exchange, i) => {
        let product = { exchange: exchange, price: result[i] }
        response.push(product)
      })
      res.send({ response: response })
    }).catch(error => {
      res.send({ error: error })
    })
})

module.exports = router
