var express = require('express');
var router = express.Router();
// ============
// COMING SOON
// ============

router.get('/coming-soon', function(req, res) {
    res.render('coming-soon');
});

module.exports = router;