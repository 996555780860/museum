var mongoose = require('mongoose');

const AuthorArtworkMuseumKNMIISchema = mongoose.Schema({
    photos: {
        type: String,
        required: false
    },
    photos_thumbnail: {
        type: [String],
        required: false
    },
    yearsOfLife: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    biography_ru: {
        type: String,
        required: true
    },
    biography_kg: {
        type: String,
        required: true
    },
    biography_eng: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

var AuthorArtworkMuseumKNMII = mongoose.model('AuthorArtworkMuseumKNMII', AuthorArtworkMuseumKNMIISchema);

module.exports = AuthorArtworkMuseumKNMII;