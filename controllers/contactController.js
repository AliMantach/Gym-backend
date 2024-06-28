const asyncHandler = require("express-async-handler");
const Contact = require("../");


const getContact = asyncHandler(async (req, res, next) => {
  const contacts = await Contact.find({user_id: req.user.id});
  res.status(200).json(contacts );
});

const getIndividualContact = asyncHandler(async (req, res, next) => {
  const contactInd = await Contact.findById(req.params.id);
 if(!contactInd){
    res.status(400);
    throw new Error("Doesn't exist");
  }
  
  res.send(contactInd);
});

const postContact = asyncHandler(async (req, res, next) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id
  })
  res.json(contact);
});

const deleteContact = asyncHandler(async (req, res, next) => {
  
  const contactInd = await Contact.findById(req.params.id);
  if (!contactInd) {
      res.status(400);
      throw new Error("Doesn't exist");
  }
  if(contactInd.user_id.toString() !== req.user.id){
    res.status(400);
    throw new Error("Doesn't exist");
  }
  await Contact.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: 'Contact deleted', contactInd });
});

const UpdateContact = asyncHandler(async (req, res) => {
  const contactInd = await Contact.findById(req.params.id);
 if(!contactInd){
    res.status(400);
    throw new Error("Doesn't exist");
  }
  if(contactInd.user_id.toString() !== req.user.id){
    res.status(401);
    throw new Error("Doesn't exist");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new : true}
  )
  res.status(200).json(updatedContact);
});

module.exports = {
  getContact,
  UpdateContact,
  deleteContact,
  getIndividualContact,
  postContact,
};
