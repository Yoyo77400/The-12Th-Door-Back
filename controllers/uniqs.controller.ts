router.post('/uniqs', async (req, res) => {
  const { uniqid, address } = req.body;
  if (!uniqid || !address) return res.status(400).json({ error: 'uniqid ou address manquant' });

  try {
    const exists = await Uniq.findOne({ uniqid });
    if (exists) {
      return res.status(409).json({ error: 'uniqid déjà présent' });
    }

    const newEntry = new Uniq({ uniqid, address });
    await newEntry.save();
    res.status(201).json({ message: 'uniqid inséré avec succès' });
  } catch (err) {
    res.status(500).json({ error: 'erreur serveur' });
  }
});
