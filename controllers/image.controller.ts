import express from 'express';
import multer from 'multer';
import { MongooseService } from '../services/mongoose';

const upload = multer({ dest: 'uploads/' });

export class ImageController {
    private static instance: ImageController;
    public static getInstance(): ImageController {
        if (!this.instance) {
            this.instance = new ImageController();
        }
        return this.instance;
    }
    async uploadImage(req: express.Request, res: express.Response): Promise<void> {
        const mongooseService = await MongooseService.getInstance();
        const imageService = mongooseService.imageService;
        const { fidelityNFTId, matchNFTId } = req.body;
        if ((!fidelityNFTId && !matchNFTId) || (fidelityNFTId && matchNFTId)) {
            res.status(400).json({ error: "You must provide exactly one of fidelityNFTId or matchNFTId." });
            return;
        }
        try {
        const image = await imageService.uploadImage(req.file!, { fidelityNFTId, matchNFTId });
        const imageUrl = `${req.protocol}://${req.get("host")}/image/${image._id}`;
        if (fidelityNFTId) {
            await mongooseService.fidelityNFTService.updateMediaUrl(fidelityNFTId, imageUrl);
        } else if (matchNFTId) {
            await mongooseService.matchNFTService.updateMediaUrl(matchNFTId, imageUrl);
        }
        res.status(201).json({ imageId: image._id });
        } catch (err) {
        console.error('Image upload failed:', err);
        res.status(500).json({ error: 'Image upload failed' });
        }
    }
    async getImageById(req: express.Request, res: express.Response): Promise<void> {
        const { id } = req.params;
        const mongooseService = await MongooseService.getInstance();
        const imageService = mongooseService.imageService;
        try {
            const image = await imageService.getImageById(id);
            if (!image) {
                res.status(404).json({ error: "Image not found" });
                return;
            }
            res.json(image);
        } catch (error) {
            console.error("Error fetching image:", error);
            res.status(500).json({ error: "Failed to fetch image" });
        }
    }

    buildRouter(): express.Router {
        const router = express.Router();
        router.post('/upload', upload.single('file'), this.uploadImage.bind(this));
        router.get('/:id', express.json(), this.getImageById.bind(this));
        return router;
    }
}