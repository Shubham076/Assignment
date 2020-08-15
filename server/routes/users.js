const express  = require('express'),
        router = express.Router(),
        {getAllUsers , getPermissions , updatePermissions} = require("../controllers/user"),
        isAuth  = require("../middleware/isAuth")


router.get("/users" , getAllUsers);
router.post("/permission" , isAuth , getPermissions)
router.put("/permission/:id" , updatePermissions)

module.exports = router;