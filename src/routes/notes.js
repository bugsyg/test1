const express = require('express');
const router = express.Router();

router.get('/notes', (req,res)=>{
    res.send(<div><p>Hola</p></div>);
})


module.exports = router;