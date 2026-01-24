const mongoose = require('mongoose');
const { Schema } = mongoose;

const EventSchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: String,
  date: Date,
  location: String,
  isUpcoming: { type: Boolean, default: true },
  bannerUrl: String,
  speakers: [{ type: Schema.Types.ObjectId, ref: 'Speaker' }],
  sponsors: [{ type: Schema.Types.ObjectId, ref: 'Sponsor' }],
  organizers: [{ type: Schema.Types.ObjectId, ref: 'Organizer' }],
  coordinators: [{ type: Schema.Types.ObjectId, ref: 'FacultyCoordinator' }],
  media: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Media' }],
  price: { type: Number, default: 0 },    // store as number (e.g. 499, 0 for free)
  currency: { type: String, default: 'INR' }, // e.g. 'INR', 'USD'

  // Booking controls
  capacity: { type: Number, default: null },      // total ticket limit; null = unlimited
  bookingsOpen: { type: Boolean, default: true }, // admin can open/close bookings

}, { timestamps: true });

module.exports = mongoose.model('Event', EventSchema);
