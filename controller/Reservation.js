const Reservation = require("../model/Reservation");

// Créer une réservation d'article
exports.createReservation = async (req, res) => {
  try {
    const { dateReservation, dateLivraison, commentaire, lieuReservation, etatReservation } = req.body;

    if (!dateReservation || !dateLivraison || !lieuReservation || !etatReservation) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const reservation = new Reservation({
      dateReservation,
      dateLivraison,
      commentaire,
      lieuReservation,
      etatReservation,
    });

    await reservation.save();

    res.status(201).json({ success: true, reservation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Lire toutes les réservations d'articles
exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();

    res.status(200).json({ success: true, reservations });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Lire une réservation d'article par son ID
exports.getReservationById = async (req, res) => {
  try {
    const reservationId = req.params.reservationId;

    const reservation = await Reservation.findById(reservationId);

    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    res.status(200).json({ success: true, reservation });
  } catch (error) {
    console.error(error);
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid reservation ID' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Mettre à jour une réservation d'article
exports.updateReservation = async (req, res) => {
  try {
    const reservationId = req.params.reservationId;
    const updatedData = req.body;

    const reservation = await Reservation.findByIdAndUpdate(reservationId, updatedData, {
      new: true,
    });

    if (!reservation) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    res.status(200).json({ success: true, reservation });
  } catch (error) {
    console.error(error);
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid reservation ID' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Supprimer une réservation d'article
exports.deleteReservation = async (req, res) => {
  try {
    const reservationId = req.params.reservationId;

    const result = await Reservation.findByIdAndDelete(reservationId);

    if (!result) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    res.status(200).json({ success: true, message: 'Reservation deleted successfully' });
  } catch (error) {
    console.error(error);
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid reservation ID' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};
