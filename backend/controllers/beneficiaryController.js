import Beneficiary from "../models/beneficiaryModel.js";
  
// Add a new beneficiary
const addBeneficiary = async (req, res) => {
    try {
      const { cnic, name, phone, address, purpose } = req.body;
  
      // Check if the beneficiary already exists
      const existingBeneficiary = await Beneficiary.findOne({ cnic });
      if (existingBeneficiary) {
        return res.status(400).json({ message: "Beneficiary already exists!" });
      }
  
      // Get the current date
      const today = new Date().toISOString().split("T")[0];
  
      // Count tokens for the current date
      const todayTokenCount = await Beneficiary.countDocuments({
        createdAt: {
          $gte: new Date(today), // Start of the day
          $lt: new Date(new Date(today).setDate(new Date(today).getDate() + 1)), 
        },
      });
  
      // Assign the next token number
      const tokenNumber = todayTokenCount + 1;
  
      // Create a new beneficiary with the generated token
      const newBeneficiary = Beneficiary.create({
        cnic,
        name,
        phone,
        address,
        purpose,
        tokenNumber,
      })
  
      res.status(201).json({
        message: "Beneficiary added successfully",
        data: newBeneficiary,
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };

// Get all beneficiaries
const getAllBeneficiaries = async (req, res) => {
    try {
        const beneficiaries = await Beneficiary.find();
        res.status(200).send({status: 200 , data: beneficiaries});
    } catch (error) {
        res.status(500).send({ message: "Server error", error: error.message });
    }
};

// Get a single beneficiary by CNIC
const getBeneficiaryByCNIC = async (req, res) => {
    try {
        const { cnic } = req.params;

        const beneficiary = await Beneficiary.findOne({ cnic });
        if (!beneficiary) {
            return res.status(404).send({ message: "Beneficiary not found!" });
        }

        res.status(200).send({status: 200 , data: beneficiary});
    } catch (error) {
        res.status(500).send({ message: "Server error", error: error.message });
    }
};

const generateNewToken = async (req, res) => {
    try {
      const { cnic, name, phone, address, purpose } = req.body;
  
      const today = new Date().toISOString().split("T")[0];
  
      // Find or create a token record for today
      let tokenRecord = await Token.findOne({ date: today });
      if (!tokenRecord) {
        // Create a new record for today's token count
        tokenRecord = await Token.create({ date: today, lastToken: 1 });
      } else {
        // Increment the token for today
        tokenRecord.lastToken += 1;
        await tokenRecord.save();
      }
  
      // Check if beneficiary exists
      let beneficiary = await Beneficiary.findOne({ cnic });
  
      if (beneficiary) {
        // If beneficiary exists, log their new visit in the history
        beneficiary.history.push({
          department: "Reception", // Change based on the actual department
          action: "Token Generated",
          remarks: purpose,
          timestamp: new Date(),
        });
        await beneficiary.save();
      } else {
        // If beneficiary doesn't exist, create a new one
        beneficiary = new Beneficiary({
          cnic,
          name,
          phone,
          address,
          purpose,
          history: [
            {
              department: "Reception", // Change based on the actual department
              action: "Token Generated",
              remarks: purpose,
              timestamp: new Date(),
            },
          ],
        });
        await beneficiary.save();
      }
  
      res.status(201).send({
        message: "Token generated successfully",
        tokenNumber: tokenRecord.lastToken,
        beneficiary,
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  


export { addBeneficiary, getAllBeneficiaries, getBeneficiaryByCNIC , generateNewToken};