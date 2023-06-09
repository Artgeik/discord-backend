const express = require("express");
const router = express();
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
const auth = require("../middleware/auth");
const friendInvitationControllers = require("./../controllers/friendInvitation/friendInvitationControllers");

const postInvitationSchema = Joi.object({
  targetMailAddress: Joi.string().email(),
});

const inviteDecisionSchema = Joi.object({
  id: Joi.string().required(),
});

router.post(
  "/invite",
  auth,
  validator.body(postInvitationSchema),
  friendInvitationControllers.controllers.postInvite
);

router.post(
  "/accept",
  auth,
  validator.body(inviteDecisionSchema),
  friendInvitationControllers.controllers.postAccept
);

router.post(
  "/reject",
  auth,
  validator.body(inviteDecisionSchema),
  friendInvitationControllers.controllers.postReject
);


module.exports = router;
