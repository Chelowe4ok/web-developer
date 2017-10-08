const express = require('express');

const router = express.Router();


//                          Admin Panel
/*_______________________________________________________________________*/


// Get settings data/
router.get('/settings', (req, res) => {
    res.json({ email: 'wolod@gmail.com', phone: '0979449612', resume: 'resume' });
});

// Update settings data
router.post('/settings', (req, res) => {
    console.log(req.body);
    res.json({ email: 'wolod@gmail.com', phone: '0979449612', resume: 'resume' });
});


//                          Public rotes
/*_______________________________________________________________________*/

// Root router
router.get('/', (req, res) => {
    res.send('api works');
});

router.get('/not-found', (req, res) => {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end();
});

module.exports = router;