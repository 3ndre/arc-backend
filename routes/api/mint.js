const express = require('express');
const router = express.Router();

var cloudinary = require('cloudinary').v2;

const Mint = require('../../models/Mint');
const User = require('../../models/User');
const authenticateToken = require('../../middleware/authenticateToken');


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});


//Getting all Mint by the user wallet
router.get("/", authenticateToken, async (req, res) => {

    const wallet = req.header('x-auth-wallet');

    try {

      var quickMints = await Mint.find({
        creator: wallet,
      });

      res.status(200).json(quickMints);
    } catch (err) {
      res.status(500).json(err);
    }
  });


//---------------------------------------------------------------------------------------------------------------------
//Creating a quick mint
router.post(
  '/mint', authenticateToken,
  async (req, res) => {

    const { name, description, contentImageUrl, external_url, creator, tokenID, contractAddress, amount, metadata, contractType, chains } = req.body;

    const opts = {
      overwrite: true,
      invalidate: true,
      resource_type: "auto",
    }

    try {

        let contentImageUpload = await cloudinary.uploader.upload(contentImageUrl, opts, (err, result) => {
          if(result && result.secure_url) {
            const cloudinaryUrl = result.secure_url;
            return cloudinaryUrl
          } else {
          console.log(err.message);
          return null
        }
        })

        let image = contentImageUpload.secure_url

        mintContent = new Mint({
          name,
          description,
          image,
          external_url,
          creator,
          tokenID,
          contractAddress,
          amount,
          metadata,
          contractType,
          chains
      });

      await mintContent.save();

      // Finding the user by creator wallet address and increasing tokenCount by 1
      const user = await User.findOne({ wallet: creator });
      if (user) {
        user.tokenCount += 1;
        await user.save();
      } else {
        // Handle case when user is not found
        console.log('User not found');
      }

      res.json(mintContent);

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Unable to create mint content!');
    }
  }
);



//---------------------------------------------------------------------------------------------------------------------

module.exports = router;
