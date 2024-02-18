const mongoose = require("mongoose");
const Bookings = require("../models/Bookings");
const Movie = require("../models/Movie");
const User = require("../models/User");

exports.newBooking = async (req, res, next) => {
  const { movie, date, seatNumber, user } = req.body;

  const existingBooking = await Bookings.findOne({ movie, seatNumber });

    if (existingBooking) {
      return res.status(400).json({ message: 'Seat is already booked for this movie.' });
    }

  let existingMovie;
  let existingUser;
  try {
    existingMovie = await Movie.findById(movie);
    existingUser = await User.findById(user);
  } catch (err) {
    return console.log(err);
  }
  if (!existingMovie) {
    return res.status(404).json({ message: "Movie not found with given id" });
  }
  if (!existingUser) {
    return res.status(404).json({ message: "User not found with given ID " });
  }
  let booking;

  try {
    booking = new Bookings({
      movie,
      date: new Date(`${date}`),
      seatNumber,
      user,
    });
    existingUser.bookings.push(booking._id);
    existingMovie.bookings.push(booking._id);
    await existingUser.save();
    await existingMovie.save();
    await booking.save();
  } catch (err) {
    return console.log(err);
  }

  if (!booking) {
    return res.status(500).json({ message: "Unable to create a booking" });
  }

  return res.status(201).json({ booking });
};

exports.getBookingById = async (req, res, next) => {
  const id = req.params.id;
  let booking;
  try {
    booking = await Bookings.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!booking) {
    return res.status(500).json({ message: "Unexpected Error" });
  }
  return res.status(200).json({ booking });
};

exports.deleteBooking = async (req, res, next) => {
  const id = req.params.id;
  let booking;
  try {
    booking = await Bookings.findByIdAndRemove(id).populate("user movie");
    console.log(id);
    let index = booking.user.bookings.indexOf(id);
    if (index !== -1) {
      booking.user.bookings.splice(index, 1);
    }
    index = booking.movie.bookings.indexOf(id);
    if (index !== -1) {
      booking.movie.bookings.splice(index, 1);
    }

    await booking.movie.save();
    await booking.user.save();
  } catch (err) {
    return console.log(err);
  }
  if (!booking) {
    return res.status(500).json({ message: "Unable to Delete" });
  }
  return res.status(200).json({ message: "Successfully Deleted" });
};
