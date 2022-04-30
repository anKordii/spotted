function Slugify(text) {
    var str = text
    str = str.replace(/^\s+|\s+$/g, ''); // trim

    // remove accents, swap ñ for n, etc
    var from = "ćłóźżąśęńãàáäâáº½èéëêìíïîõòóöôùúüûñç";
    var to   = "clozzasenaaaaaeeeeeiiiiooooouuuunc";
    for (var i=0, l=from.length ; i<l ; i++) {
         str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.toString();

    return str;
}
module.exports = Slugify;