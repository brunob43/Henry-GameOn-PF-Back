const { profileHandler } = require ("../handlers/profileHandler");

const { Router } = express();

const profileRouter = Router();


profileRouter.post('/', profileHandler);


module.exports = profileRouter;

