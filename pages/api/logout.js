

import handler from '../../src/handler';

const User = require('../../src/models/user')
const { initset } = require('../../src/flash');




let user = new User()


export default handler.post(async (req, res) => {
  try {
   
    await user.logout(req, res)



  } catch (e) {

    await initset(0, e.message, '/')(req, res)
  }

})
