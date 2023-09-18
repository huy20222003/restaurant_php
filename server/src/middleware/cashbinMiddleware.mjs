import casbin from 'casbin';
import Roles from '../app/models/Roles.mjs';
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
import path from 'path';

const enforcer = casbin.newEnforcer(
  path.join(__dirname, '../config/cashbinConfig/cashbinConfig.conf'),
  path.join(__dirname, '../config/cashbinConfig/cashbinConfig.csv')
);

const cashbinMiddleware = async (req, res, next) => {
  const userRole = await Roles.findById(req.user.roles);
  const resource = req.path;

  const allowed = (await enforcer).enforce(userRole.name, resource, req.method);

  if (allowed) {
    next();
  } else {
    return res
      .status(403)
      .json({ message: 'Bạn không có quyền truy cập tài nguyên này.' });
  }
};

export default cashbinMiddleware;
