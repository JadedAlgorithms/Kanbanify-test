const {
  getCardFromDB,
  addCardToDB,
  deleteCardFromDB,
  updateCardFromDB,
} = require("../db/cardDB");

class CardController {
  getCard = async (req, res) => {
    const cardId = req.params.cardId;
    const card = await getCardFromDB(cardId);
    res.status(200).json({ message: "Card fetched successfully", card });
  };

  createCard = async (req, res) => {
    try{
    const { title, description, typeId } = req.body;
    const projectId = req.params.projectId;
    const card = await addCardToDB(title, description, typeId, projectId);
    res.status(200).json({ message: "Card created successfully", card });
  } catch(error) {res.status(500).json({error: `Error creating card: ${error.message}`})};
  deleteCard = async (req, res) => {
    try{
    const cardId = req.params.cardId;
    const card = await deleteCardFromDB(cardId);
    res.status(200).json({ message: "Card deleted successfully", card });
    }catch(error) {res.status(500).json({error: `Error deleting card: ${error.message}`})};

  updateCard = async (req, res) => {
    try{
    const cardId = req.params.cardId;
    const { title, description, typeId } = req.body;
    const card = await updateCardFromDB(cardId, title, description, typeId);
    res.status(200).json({ message: "Card updated successfully", card });
  } catch(error) {res.status(500).json({error: `Error updating card: ${error.message}`})};
  }
}

module.exports = new CardController();
