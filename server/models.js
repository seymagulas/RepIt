const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/RepIt', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });

const setSchema = new mongoose.Schema({
  weight: {
    type: Number,
  },
  reps: {
    type: Number,
  },
});

const ExerciseSchema = new mongoose.Schema({
  exercise: {
    type: String,
    required: true,
  },
  sets: {
    type: Number,
    default: 0,
  },
  setDetails: [setSchema]
});

const WorkoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  exercises: [ExerciseSchema],
});

const Workout = mongoose.model('Workout', WorkoutSchema);

const finishedWorkoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  exercises: [ExerciseSchema],
  date: {
    type: Date,
    default: Date.now,
  },
});

const FinishedWorkout = mongoose.model('FinishedWorkout', finishedWorkoutSchema);

module.exports = {
  Workout,
  FinishedWorkout,
}


