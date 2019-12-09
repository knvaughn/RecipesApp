var express = require('express');
var router = express.Router();

// ==================
// GARDENING ROUTES
// ==================

router.get('/gardening', function(req, res){
    res.render('gardening');
});

module.exports = router;