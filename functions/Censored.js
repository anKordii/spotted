const Slugify = require('./Slugify');

function Censored(text) {
    var regex = /nigger|nugger|pedał|spotted_kotleciarnia_opole|czarnuch|killjews|sex|vagina|whore|hopeyoudie/gi;
    
    var str = Slugify(text);

    str = str.replace(regex,"***");

    return str;
}
module.exports = Censored;