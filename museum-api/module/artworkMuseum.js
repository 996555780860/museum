const ArtworkMuseumKNMII = require('../models/artwork/artworkMuseumKNMII');
const format = require('date-format') ;

const getById = async (id) => {
    return await ArtworkMuseumKNMII.findOne({_id: id}).populate({path: 'genre', select: 'name_ru name_kg name_eng'}).populate({path: 'author', select: 'name yearsOfLife'})
}

const getStyleOrMaterial = async (genre) => {
    let data = await ArtworkMuseumKNMII.find({genre: genre}).distinct('genre1')
    data.sort()
    let data_kg = await ArtworkMuseumKNMII.find({genre: genre}).distinct('genre1_kg')
    data_kg.sort()
    let data_eng = await ArtworkMuseumKNMII.find({genre: genre}).distinct('genre1_eng')
    data_eng.sort()
    return {ru: data, eng: data_eng, kg: data_kg}
}

const view = async (id) => {
    while(id.includes('"'))
        id = id.replace('"', '')
    let data = await ArtworkMuseumKNMII
        .findOne({_id: id})
    if(data.views==undefined||data.views=='')
        data.views=0
    data = JSON.stringify(parseInt(data.views)+1)
    await ArtworkMuseumKNMII.updateOne(
        {_id: id},
        {$set: {views: data}});
}

const getClient = async (search, sort, skip, genre) => {
    if(sort===''){
        return await ArtworkMuseumKNMII
            .find({genre: genre})
            .sort('-createdAt')
            .skip(parseInt(skip))
            .limit(30)
            .populate({path: 'genre', select: 'name_ru name_kg name_eng'})
            .populate({path: 'author', select: 'name yearsOfLife'})
    } else if(sort==='styleOrMaterial'){
        return await ArtworkMuseumKNMII
            .find({genre: genre, $or: [{genre1: search}, {genre1_kg: search}, {genre1_eng: search}]})
            .sort('-createdAt')
            .skip(parseInt(skip))
            .limit(30)
            .populate({path: 'genre', select: 'name_ru name_kg name_eng'})
            .populate({path: 'author', select: 'name yearsOfLife'})
    } else if(sort==='author'){
        return await ArtworkMuseumKNMII
            .find({genre: genre, author: search})
            .sort('-createdAt')
            .skip(parseInt(skip))
            .limit(30)
            .populate({path: 'genre', select: 'name_ru name_kg name_eng'})
            .populate({path: 'author', select: 'name yearsOfLife'})
    } else if(sort==='date'){
          return await ArtworkMuseumKNMII
            .find({genre: genre, date: { '$regex': search, '$options': 'i' } })
            .sort('-createdAt')
            .skip(parseInt(skip))
            .limit(30)
            .populate({path: 'genre', select: 'name_ru name_kg name_eng'})
            .populate({path: 'author', select: 'name yearsOfLife'})
    }
}

const getRandom = async (search, sort) => {
    if(sort==='')
        return await ArtworkMuseumKNMII.findRandom()
            .limit(4)
            .populate({path: 'genre', select: 'name_ru name_kg name_eng'})
            .populate({path: 'author', select: 'name yearsOfLife'})
    else if(sort==='author'){
        return await ArtworkMuseumKNMII.findRandom({author: search})
            .limit(4)
            .populate({path: 'genre', select: 'name_ru name_kg name_eng'})
            .populate({path: 'author', select: 'name yearsOfLife'})
    }
    else if(sort==='styleOrMaterial'){
        return await ArtworkMuseumKNMII.findRandom({$or: [{styleOrMaterial_ru: search}, {styleOrMaterial_kg: search}, {styleOrMaterial_eng: search}]})
            .limit(4)
            .populate({path: 'genre', select: 'name_ru name_kg name_eng'})
            .populate({path: 'author', select: 'name yearsOfLife'})
    }
    else if(sort==='date'){
        return await ArtworkMuseumKNMII.findRandom({date: {'$regex': search, '$options': 'i'}})
            .limit(4)
            .populate({path: 'genre', select: 'name_ru name_kg name_eng'})
            .populate({path: 'author', select: 'name yearsOfLife'})
    } else if(sort==='genre')
        return await ArtworkMuseumKNMII.findRandom({genre: search})
            .limit(4)
            .populate({path: 'genre', select: 'name_ru name_kg name_eng'})
            .populate({path: 'author', select: 'name yearsOfLife'})
}

const getArtworkMuseumKNMII = async (search, sort, skip) => {
    let findResult = [], data = [], count;
    const row = [
        'картина',
        'водяная марка',
        'имя',
        'материал/стиль',
        'описание',
        'ысым',
        'материалдык/стили',
        'баяндоо',
        'name',
        'material/style',
        'description',
        'размер',
        'период создания',
        'год исполнения',
        'просмотры',
        'автор',
        'тип',
        'жанр',
        'жанр_kg',
        'genre',
        'номер',
        'создан',
        '_id'
    ];
    if(sort == undefined||sort=='')
        sort = '-createdAt';
    else if(sort[0]=='картина'&&sort[1]=='descending')
        sort = '-image';
    else if(sort[0]=='картина'&&sort[1]=='ascending')
        sort = 'image';
    else if(sort[0]=='водяная марка'&&sort[1]=='descending')
        sort = '-image_whatermark';
    else if(sort[0]=='водяная марка'&&sort[1]=='ascending')
        sort = 'image_whatermark';
    else if(sort[0]=='имя'&&sort[1]=='descending')
        sort = '-name_ru';
    else if(sort[0]=='имя'&&sort[1]=='ascending')
        sort = 'name_ru';
    else if(sort[0]=='материал/стиль'&&sort[1]=='descending')
        sort = '-styleOrMaterial_ru';
    else if(sort[0]=='материал/стиль'&&sort[1]=='ascending')
        sort = 'styleOrMaterial_ru';
    else if(sort[0]=='ысым'&&sort[1]=='descending')
        sort = '-name_kg';
    else if(sort[0]=='ысым'&&sort[1]=='ascending')
        sort = 'name_kg';
    else if(sort[0]=='материалдык/стили'&&sort[1]=='descending')
        sort = '-styleOrMaterial_kg';
    else if(sort[0]=='материалдык/стили'&&sort[1]=='ascending')
        sort = 'styleOrMaterial_kg';
    else if(sort[0]=='name'&&sort[1]=='descending')
        sort = '-name_eng';
    else if(sort[0]=='name'&&sort[1]=='ascending')
        sort = 'name_eng';
    else if(sort[0]=='biography'&&sort[1]=='descending')
        sort = '-styleOrMaterial_eng';
    else if(sort[0]=='biography'&&sort[1]=='ascending')
        sort = 'styleOrMaterial_eng';
    else if(sort[0]=='размер'&&sort[1]=='descending')
        sort = '-size';
    else if(sort[0]=='размер'&&sort[1]=='ascending')
        sort = 'size';
    else if(sort[0]=='просмотры'&&sort[1]=='ascending')
        sort = 'views';
    else if(sort[0]=='просмотры'&&sort[1]=='descending')
        sort = '-views';
    else if(sort[0]=='год исполнения'&&sort[1]=='ascending')
        sort = 'date';
    else if(sort[0]=='год исполнения'&&sort[1]=='descending')
        sort = '-date';
    else if(sort[0]=='тип'&&sort[1]=='ascending')
        sort = 'genre';
    else if(sort[0]=='тип'&&sort[1]=='descending')
        sort = '-genre';
    else if(sort[0]=='автор'&&sort[1]=='ascending')
        sort = '';
    else if(sort[0]=='автор'&&sort[1]=='descending')
        sort = '-';
    else if(sort[0]=='создан'&&sort[1]=='descending')
        sort = '-createdAt';
    else if(sort[0]=='создан'&&sort[1]=='ascending')
        sort = 'createdAt';
    if(search == ''){
        count = await ArtworkMuseumKNMII.count();
        findResult = await ArtworkMuseumKNMII
            .find()
            .sort(sort)
            .skip(parseInt(skip))
            .limit(10)
            .populate({path: 'genre', select: 'name_ru name_kg name_eng'})
            .populate({path: 'author', select: 'name yearsOfLife'})
    } else {
        count = await ArtworkMuseumKNMII.count(
            {$or: [
                {in: {'$regex': search, '$options': 'i'}},
                {styleOrMaterial_ru: {'$regex': search, '$options': 'i'}},
                {styleOrMaterial_eng: {'$regex': search, '$options': 'i'}},
                {styleOrMaterial_kg: {'$regex': search, '$options': 'i'}},
                {name_ru: {'$regex': search, '$options': 'i'}},
                {name_eng: {'$regex': search, '$options': 'i'}},
                {name_kg: {'$regex': search, '$options': 'i'}},
                {preservation: {'$regex': search, '$options': 'i'}},
                {motion: {'$regex': search, '$options': 'i'}},
                {reproduced: {'$regex': search, '$options': 'i'}},
                {views: {'$regex': search, '$options': 'i'}}
            ]}
        );
        findResult = await ArtworkMuseumKNMII
            .find(
                {$or: [
                    {in: {'$regex': search, '$options': 'i'}},
                    {styleOrMaterial_ru: {'$regex': search, '$options': 'i'}},
                    {styleOrMaterial_eng: {'$regex': search, '$options': 'i'}},
                    {styleOrMaterial_kg: {'$regex': search, '$options': 'i'}},
                    {name_ru: {'$regex': search, '$options': 'i'}},
                    {name_eng: {'$regex': search, '$options': 'i'}},
                    {name_kg: {'$regex': search, '$options': 'i'}},
                    {preservation: {'$regex': search, '$options': 'i'}},
                    {motion: {'$regex': search, '$options': 'i'}},
                    {reproduced: {'$regex': search, '$options': 'i'}},
                    {views: {'$regex': search, '$options': 'i'}}
                ]}
            )
            .sort(sort)
            .skip(parseInt(skip))
            .limit(10)
            .populate({
                path: 'genre',
                select: 'name_ru',
                match: {name_ru: {'$regex': search, '$options': 'i'}}
            }).populate({
                path: 'author',
                select: 'name',
                match: {name_ru: {'$regex': search, '$options': 'i'}}
            });
    }
    for (let i=0; i<findResult.length; i++){
        let genre1 = ''
        if(findResult[i].genre1 != undefined)
            genre1 = findResult[i].genre1
        let genre1_kg = ''
        if(findResult[i].genre1_kg != undefined)
            genre1_kg = findResult[i].genre1_kg
        let genre1_eng = ''
        if(findResult[i].genre1_eng != undefined)
            genre1_eng = findResult[i].genre1_eng
        let author = ''
        if(findResult[i].author != undefined)
            author = findResult[i].author.name+'\n'+findResult[i].author._id
        let genre = ''
        if(findResult[i].genre != undefined)
            genre = findResult[i].genre.name_ru+'\n'+findResult[i].genre._id
        let in1 = ''
        if(findResult[i].in != undefined)
            in1 = findResult[i].in
        let year = ''
        if(findResult[i].year != undefined)
            year = findResult[i].year
        data.push([
            findResult[i].image,
            findResult[i].image_whatermark,
            findResult[i].name_ru,
            findResult[i].styleOrMaterial_ru,
            findResult[i].description_ru,
            findResult[i].name_kg,
            findResult[i].styleOrMaterial_kg,
            findResult[i].description_kg,
            findResult[i].name_eng,
            findResult[i].styleOrMaterial_eng,
            findResult[i].description_eng,
            findResult[i].size,
            findResult[i].date,
            year,
            findResult[i].views,
            author,
            genre,
            genre1,
            genre1_kg,
            genre1_eng, in1, format.asString('yyyy.dd.MM hh:mm', findResult[i].updatedAt), findResult[i]._id]);
    }
    return {data: data, count: count, row: row}
}

const addArtworkMuseumKNMII = async (object) => {
    try{
        let _object = new ArtworkMuseumKNMII(object);
        await ArtworkMuseumKNMII.create(_object);
    } catch(error) {
        console.error(error)
    }
}

const setArtworkMuseumKNMII = async (object, id) => {
    try{
        await ArtworkMuseumKNMII.updateOne({_id: id}, {$set: object});
    } catch(error) {
        console.error(error)
    }
}

const deleteArtworkMuseumKNMII = async (id) => {
    try{
        await ArtworkMuseumKNMII.deleteMany({_id: {$in: id}});
    } catch(error) {
        console.error(error)
    }
}

module.exports.getStyleOrMaterial = getStyleOrMaterial;
module.exports.view = view;
module.exports.getClient = getClient;
module.exports.getRandom = getRandom;
module.exports.deleteArtworkMuseumKNMII = deleteArtworkMuseumKNMII;
module.exports.getArtworkMuseumKNMII = getArtworkMuseumKNMII;
module.exports.setArtworkMuseumKNMII = setArtworkMuseumKNMII;
module.exports.addArtworkMuseumKNMII = addArtworkMuseumKNMII;
module.exports.getById = getById;
