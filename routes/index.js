const router = require('express').Router();
const { getUserMe, updateUser } = require('../controllers/users');
const { addUserMovie, deleteUserMovie, getUserMovies } = require('../controllers/movies');
const {
  validateGetUser,
  validateUpdateUser,
  validateAddUserMovies,
  validateDeleteUserMovies,
} = require('../middleware/validations');

router.get('/users/me', validateGetUser, getUserMe);
router.patch('/users/me', validateUpdateUser, updateUser);
router.get('/movies', getUserMovies);
router.post('/movies', validateAddUserMovies, addUserMovie);
router.delete('/movies/:movieId', validateDeleteUserMovies, deleteUserMovie);

module.exports = router;
