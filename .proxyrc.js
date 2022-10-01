const express = require('express')
const path = require('path')

module.exports = function (app) {
  app.use('/images', express.static(path.join(__dirname, '/images')))
}
