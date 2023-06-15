const Router = require('koa-router');
const controllers = require('./controllers');

const router = new Router();

router.get('/workouts', controllers.getAllWorkouts);

router.get('/workouts/:id', controllers.getWorkoutById);

router.post('/workout', controllers.createWorkout);

router.post('/finishedWorkout', controllers.createFinishedWorkout);

router.put('/workouts/:id', controllers.updateWorkout);

router.delete('/workouts/:id', controllers.deleteWorkout);

router.get('/finishedWorkouts', controllers.getAllFinishedWorkouts); 

router.get('/finishedWorkouts/:id', controllers.getFinishedWorkoutDetails);

router.delete('/finishedWorkouts/:id', controllers.deleteFinishedWorkout);


module.exports = router;
