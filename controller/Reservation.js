import Reservation from '../model/Reservation.js';

const reservationController = {
  createReservation: async (req, res) => {
    try {
      const { dateReservation, dateLivraison, commentaire, lieuReservation, etatReservation } = req.body;

      if (!dateReservation || !dateLivraison || !lieuReservation || !etatReservation) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Récupérer l'ID de l'utilisateur connecté depuis la session ou le JWT
      //const userId = req.user.id;  

      const reservation = new Reservation({
        dateReservation,
        dateLivraison,
        commentaire,
        lieuReservation,
        etatReservation,
        //userId,  // Ajouter l'ID de l'utilisateur à la réservation
      });

      await reservation.save();

      res.status(201).json({ success: true, reservation });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getAllReservations: async (req, res) => {
    try {
      const reservations = await Reservation.find();

      res.status(200).json({ success: true, reservations });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  getReservationById: async (req, res) => {
    try {
      const reservationId = req.params.reservationId;

      const reservation = await Reservation.findOne({ _id: reservationId, userId: req.user.id });

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
  },

  updateReservation: async (req, res) => {
    try {
      const reservationId = req.params.reservationId;
      const updatedData = req.body;

      const userId = req.user.id;  // Assurez-vous que cette information est disponible dans votre middleware d'authentification

      const reservation = await Reservation.findOneAndUpdate(
        { _id: reservationId, userId: userId },
        updatedData,
        { new: true }
      );

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
  },

  deleteReservation: async (req, res) => {
    try {
      const reservationId = req.params.reservationId;

      const result = await Reservation.findOneAndDelete({ _id: reservationId, userId: req.user.id });

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
  },
};

export default reservationController;
