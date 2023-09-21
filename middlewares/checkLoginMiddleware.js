const checkLoginMiddleware = (req, res, next) => {
  const { username } = req.session
  if (!username) {
    return res.redirect('/login')
  }

  next()
}

module.exports = checkLoginMiddleware