const asyncHandler = require("express-async-handler");
const Trainee = require("../models/traineeModel");


const getTrainee = asyncHandler(async (req, res, next) => {
  const Trainees = await Trainee.find({admin: req.admin.id});
  res.status(200).json(Trainees );
});

const getIndividualTrainee = asyncHandler(async (req, res, next) => {
  const TraineeInd = await Trainee.findById(req.params.id);
 if(!TraineeInd){
    res.status(400);
    throw new Error("Doesn't exist");
  }
  
  res.send(TraineeInd);
});

const postTrainee = asyncHandler(async (req, res, next) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  const trainee = await Trainee.create({
    name,
    email,
    phone,
    admin_id: req.admin.id
  })
  res.json(trainee);
});

const deleteTrainee = asyncHandler(async (req, res, next) => {
  
  const TraineeInd = await Trainee.findById(req.params.id);
  if (!TraineeInd) {
      res.status(400);
      throw new Error("Doesn't exist");
  }
  if(TraineeInd.admin_id.toString() !== req.admin.id){
    res.status(400);
    throw new Error("Doesn't exist");
  }
  await Trainee.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: 'Trainee deleted', TraineeInd });
});

const UpdateTrainee = asyncHandler(async (req, res) => {
  const TraineeInd = await Trainee.findById(req.params.id);
 if(!TraineeInd){
    res.status(400);
    throw new Error("Doesn't exist");
  }
  if(TraineeInd.admin_id.toString() !== req.admin.id){
    res.status(401);
    throw new Error("Doesn't exist");
  }
  const updatedTrainee = await Trainee.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new : true}
  )
  res.status(200).json(updatedTrainee);
});

module.exports = {
  getTrainee,
  UpdateTrainee,
  deleteTrainee,
  getIndividualTrainee,
  postTrainee
};
