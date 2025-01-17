import User from "../models/UserModel.js";

export const searchContact = async (request, response, next) => {
  try {
    const {searchTerm} = request.body;
    if(searchTerm === undefined || searchTerm === null) {
        return response.status(400).send("Search term is required.")
    }

    const sanitizedSearchTerm = searchTerm.replace(
        /[.*+?${}()|[\]\\]/g,
        "\\$&"
    )

    const regex = new RegExp(sanitizedSearchTerm, "i");
    const contacts = await User.find({
        $and: [
            {_id: {$ne: request.userId}},
            {
                $or: [{firstName: regex}, {lastName: regex}, {email: regex}],
            },
        ],
    })
    return response.status(200).json({contacts})

    return response.status(200).send("Logout successfully.");
  } catch (error) {
    console.log({ error });
    return response.status(500).send("Internal server Error: " + error.message);
  }
};
