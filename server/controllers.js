const {Workout, FinishedWorkout} = require('./models');

exports.getAllWorkouts = async (ctx) => {
  try {
    const workouts = await Workout.find();
    ctx.body = workouts;
  }
  catch (error) {
    ctx.body = { error: 'Failed getting all workouts' };
  }
}

exports.getWorkoutById = async (ctx) => {
  try {
    const workout = await Workout.findById(ctx.params.id);
    if (!workout) {
      ctx.throw(404, 'Workout not found');
    }
    ctx.body = workout;
  } catch (error) {
    console.log(error);
    ctx.throw(500, 'Server error');
  }
};

exports.createWorkout = async (ctx) => {
  try {
    const { name, exercises } = ctx.request.body;

    const workout = new Workout({
      name, 
      exercises
    })
  
    await workout.save();

    ctx.status = 201;
    ctx.body = { message: 'Workout created' };
  }
  catch (error) {
    ctx.body = { error: 'Error while creating the workout' };
  }
}
exports.updateWorkout = async (ctx) => {
  try {
    const id = ctx.params.id;
    const { name, exercises } = ctx.request.body;

    if (!name ) {
      ctx.status = 400;
      ctx.body = { error: 'Name is required' };
      return;
    }

    const workout = await Workout.findById(id);

    if (!workout) {
      ctx.status = 404;
      ctx.body = { error: 'Workout not found' };
      return;
    }

    workout.name = name;
    workout.exercises = exercises;

    const updatedWorkout = await workout.save();

    ctx.status = 200;
    ctx.body = updatedWorkout;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Internal server error' };
  }
};


exports.deleteWorkout = async (ctx) => {
  try {
    const id = ctx.params.id;

    const workout = await Workout.findByIdAndRemove(id); 

    if (!workout) {
      ctx.status = 404;
      ctx.body = { error: 'Workout not found' };
      return;
    }

    ctx.status = 200;
    ctx.body = { message: 'Workout deleted' };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Internal server error' };
  }
};

exports.createFinishedWorkout = async (ctx) => {
  const finishedWorkoutData = ctx.request.body;

  try {
    const finishedWorkout = await FinishedWorkout.create(finishedWorkoutData);
    console.log('finished workout saved')
    console.log(finishedWorkout);
    ctx.status = 201;
    ctx.body = finishedWorkout;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Error creating finished workout.' };
  }
};

exports.getAllFinishedWorkouts = async (ctx) => {
  try {
    const finishedWorkouts = await FinishedWorkout.find();
    ctx.body = finishedWorkouts;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'An error occurred while fetching finished workouts' };
  }
};

exports.getFinishedWorkoutDetails = async (ctx) => {
  try {
    const id = ctx.params.id;
    const finishedWorkout = await FinishedWorkout.findById(id);

    if (!finishedWorkout) {
      ctx.status = 404;
      ctx.body = { error: 'Finished workout not found' };
      return;
    }
    ctx.body = finishedWorkout;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'An error occurred while fetching finished workout details' };
  }
};

exports.deleteFinishedWorkout = async (ctx) => {
  try {
    const id = ctx.params.id;

    const finishedWorkout = await FinishedWorkout.findByIdAndRemove(id);

    if (!finishedWorkout) {
      ctx.status = 404;
      ctx.body = { error: 'Workout not found' };
      return;
    }

    ctx.status = 200;
    ctx.body = { message: 'Workout deleted' };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Internal server error' };
  }
};
