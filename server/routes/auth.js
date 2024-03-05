// server quality of life
const express = require('express')
const router = express.Router()
const queryString = require('querystring')
const request = require('request')

// import file for credentials and token storage
const credentials = require('../credentials')
const token = require('../token')


