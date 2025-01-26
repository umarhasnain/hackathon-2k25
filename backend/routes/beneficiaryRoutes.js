import express from 'express';
import { addBeneficiary, generateNewToken, getAllBeneficiaries, getBeneficiaryByCNIC } from '../controllers/beneficiaryController.js';


const beneficiaryRoutes = express.Router();


beneficiaryRoutes.post("/add-beneficiary", addBeneficiary); // Add a new beneficiary
beneficiaryRoutes.get("/get-all-beneficiary", getAllBeneficiaries); // Get all beneficiaries
beneficiaryRoutes.get("/get-benificiary/:cnic", getBeneficiaryByCNIC); // Get a beneficiary by CNIC
beneficiaryRoutes.get("/generate-new-token", generateNewToken); // Generate new token for beneficiary


export default beneficiaryRoutes;