var express = require('express');
var router = express.Router();

// ==================
// CANNING ROUTES
// ==================

router.get('/canning', function(req, res){
    res.render('canning');
});

module.exports = router;