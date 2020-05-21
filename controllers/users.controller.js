let users = [
  {
    id: '1',
    name: 'Marry',
  },
  {
    id: '2',
    name: 'Jerry',
  },
];

const getAllUsers = async (req, res) => {
  res.status(200).send(users);
};

module.exports = {
  getAllUsers,
};
