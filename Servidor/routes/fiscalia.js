const express = require("express"); 
var router = express.Router();
const controller = require('../controllers/fiscaliaController')
 
router.route('/')
   .get(controller.GetFiscalias)

   .post(controller.SetFiscalia)

   .put(controller.UpdateFiscalia)

   .delete(controller.DeleteFiscalia)
;
module.exports = router;
