const mongoose =require("mongoose");

const bookingSchema = new mongoose.Schema({
  movie: {
    type: mongoose.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  seatNumber: {
    type: Number,
    required: true,
    unique:true,
    min: 1, // Minimum value for seatNumber
    max: 200, // Maximum value for seatNumber
    validate: {
      validator: async function (value) {
        const existingBooking = await this.constructor.findOne({
          movie: this.movie,
          seatNumber: value,
        });

        return !existingBooking;
      },
      message: 'Seat is already booked for this movie.',
    },
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);